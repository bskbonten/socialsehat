import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { initialReports } from '@/data/reports'
import { getStorage, setStorage } from '@/utils/storage'
import { useAuthStore } from './authStore'
import { useNotificationStore } from './notificationStore'

export const useReportStore = defineStore('report', () => {
  const reports = ref(getStorage('reports', initialReports))

  if (!getStorage('reports')) {
    setStorage('reports', reports.value)
  }

  const authStore = useAuthStore()

  // Laporan milik user yang sedang login
  const myReports = computed(() => {
    if (!authStore.currentUser) return []
    return reports.value
      .filter(r => r.userId === authStore.currentUser.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  })

  // Semua laporan (diurutkan terbaru)
  const allReports = computed(() => {
    return [...reports.value].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  })

  /**
   * Mengambil laporan berdasarkan ID
   * @param {string} id 
   */
  function getReportById(id) {
    return reports.value.find(r => r.id === id)
  }

  /**
   * Menambahkan laporan baru dari masyarakat
   * @param {Object} data 
   */
  function addReport(data) {
    const user = authStore.currentUser
    const reportId = `lap-${Date.now().toString().slice(-4)}`
    const now = new Date().toISOString()

    const newReport = {
      id: reportId,
      userId: user?.id || 'user-001',
      userName: user?.name || 'Warga Masyarakat',
      title: data.title.trim(),
      category: data.category,
      location: data.location.trim(),
      coordinates: data.coordinates || { lat: -6.2300, lng: 106.8280 },
      description: data.description.trim(),
      photo: data.photo || 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?w=600&auto=format&fit=crop&q=80',
      status: 'Dikirim',
      createdAt: now,
      updatedAt: now,
      officerNotes: 'Laporan telah berhasil diterima oleh sistem dan sedang menunggu peninjauan oleh petugas wilayah.',
      timeline: [
        {
          status: 'Dikirim',
          date: now,
          note: 'Laporan berhasil dibuat dan dikirimkan oleh warga.'
        }
      ]
    }

    reports.value.unshift(newReport)
    setStorage('reports', reports.value)

    // Buat notifikasi otomatis
    const notifStore = useNotificationStore()
    notifStore.addNotification({
      userId: user?.id || 'user-001',
      title: 'Laporan Berhasil Dibuat',
      message: `Laporan "${newReport.title}" telah diterima dengan nomor ID: ${reportId}.`,
      type: 'status_laporan',
      targetId: reportId,
      route: `/laporan/${reportId}`
    })

    return newReport
  }

  /**
   * Memperbarui status laporan oleh Admin atau Petugas
   * @param {string} reportId 
   * @param {string} newStatus 'Dikirim' | 'Diproses' | 'Ditangani' | 'Selesai'
   * @param {string} officerNotes 
   */
  function updateReportStatus(reportId, newStatus, officerNotes = '') {
    const report = reports.value.find(r => r.id === reportId)
    if (!report) return false

    const now = new Date().toISOString()
    report.status = newStatus
    report.updatedAt = now
    
    if (officerNotes) {
      report.officerNotes = officerNotes.trim()
    }

    if (!Array.isArray(report.timeline)) {
      report.timeline = []
    }

    report.timeline.push({
      status: newStatus,
      date: now,
      note: officerNotes.trim() || `Status laporan diubah menjadi ${newStatus}.`
    })

    setStorage('reports', reports.value)

    // Kirim notifikasi ke pembuat laporan
    const notifStore = useNotificationStore()
    notifStore.addNotification({
      userId: report.userId,
      title: `Status Laporan: ${newStatus}`,
      message: `Laporan Anda "${report.title}" telah diperbarui menjadi status "${newStatus}".`,
      type: 'status_laporan',
      targetId: report.id,
      route: `/laporan/${report.id}`
    })

    return true
  }

  return {
    reports,
    myReports,
    allReports,
    getReportById,
    addReport,
    updateReportStatus
  }
})
