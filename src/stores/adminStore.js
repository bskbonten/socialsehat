import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { initialWarnings } from '@/data/warnings'
import { getStorage, setStorage } from '@/utils/storage'
import { useAuthStore } from './authStore'
import { useReportStore } from './reportStore'
import { useNotificationStore } from './notificationStore'

export const useAdminStore = defineStore('admin', () => {
  const warnings = ref(getStorage('warnings', initialWarnings))

  if (!getStorage('warnings')) {
    setStorage('warnings', warnings.value)
  }

  const authStore = useAuthStore()
  const reportStore = useReportStore()

  // Peringatan dini yang aktif untuk ditampilkan di dashboard masyarakat
  const activeWarnings = computed(() => {
    return warnings.value.filter(w => w.active)
  })

  // Agregasi statistik admin
  const statistics = computed(() => {
    const totalUsers = authStore.users.length
    const totalReports = reportStore.reports.length
    const reportsProcessing = reportStore.reports.filter(r => r.status === 'Diproses' || r.status === 'Ditangani').length
    const reportsCompleted = reportStore.reports.filter(r => r.status === 'Selesai').length
    const reportsSent = reportStore.reports.filter(r => r.status === 'Dikirim').length

    // Breakdown kategori laporan
    const categoryCounts = {}
    reportStore.reports.forEach(r => {
      categoryCounts[r.category] = (categoryCounts[r.category] || 0) + 1
    })

    return {
      totalUsers,
      totalReports,
      reportsProcessing,
      reportsCompleted,
      reportsSent,
      categoryCounts
    }
  })

  /**
   * Menambah peringatan dini baru
   * @param {Object} data 
   */
  function addWarning(data) {
    const newWarning = {
      id: `warn-${Date.now().toString().slice(-4)}`,
      title: data.title.trim(),
      level: data.level || 'Warning', // 'Info' | 'Warning' | 'Critical'
      region: data.region.trim(),
      date: data.date || new Date().toISOString().split('T')[0],
      active: true,
      description: data.description.trim(),
      actionRequired: (data.actionRequired || '').trim() || 'Tetap waspada dan ikuti panduan kesehatan masyarakat.'
    }

    warnings.value.unshift(newWarning)
    setStorage('warnings', warnings.value)

    // Kirim notifikasi massal ke warga
    const notifStore = useNotificationStore()
    notifStore.addNotification({
      title: `Peringatan: ${newWarning.title}`,
      message: `Peringatan tingkat ${newWarning.level} untuk wilayah ${newWarning.region}. Klik untuk melihat detail.`,
      type: 'warning_kesehatan',
      targetId: newWarning.id,
      route: '/dashboard'
    })

    return newWarning
  }

  /**
   * Toggle status aktif warning
   * @param {string} id 
   */
  function toggleWarningActive(id) {
    const warn = warnings.value.find(w => w.id === id)
    if (warn) {
      warn.active = !warn.active
      setStorage('warnings', warnings.value)
    }
  }

  /**
   * Hapus warning
   * @param {string} id 
   */
  function deleteWarning(id) {
    warnings.value = warnings.value.filter(w => w.id !== id)
    setStorage('warnings', warnings.value)
  }

  return {
    warnings,
    activeWarnings,
    statistics,
    addWarning,
    toggleWarningActive,
    deleteWarning
  }
})
