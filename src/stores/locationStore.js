import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { initialLocations } from '@/data/locations'
import { getStorage, setStorage } from '@/utils/storage'
import { useReportStore } from './reportStore'

export const useLocationStore = defineStore('location', () => {
  const locations = ref(getStorage('locations', initialLocations))

  if (!getStorage('locations')) {
    setStorage('locations', locations.value)
  }

  const reportStore = useReportStore()

  // Kategori yang tersedia
  const categories = ['Semua', 'Puskesmas', 'Rumah Sakit', 'Apotek', 'Posyandu', 'Laporan masyarakat']

  // Sinkronkan laporan masyarakat yang baru dibuat ke dalam titik lokasi bila belum ada
  const allMapLocations = computed(() => {
    const list = [...locations.value]

    // Tambahkan titik dari reports yang dibuat secara dinamis
    reportStore.reports.forEach((rep, idx) => {
      const exists = list.some(l => l.id === `map-${rep.id}`)
      if (!exists) {
        list.push({
          id: `map-${rep.id}`,
          name: `Laporan: ${rep.title}`,
          category: 'Laporan masyarakat',
          address: rep.location,
          phone: '-',
          operatingHours: `Status: ${rep.status}`,
          services: [`Kategori: ${rep.category}`, `Pelapor: ${rep.userName}`],
          coordinates: {
            x: ((idx * 17 + 25) % 80) + 10,
            y: ((idx * 23 + 30) % 75) + 12
          },
          description: rep.description,
          reportId: rep.id
        })
      }
    })

    return list
  })

  const healthFacilities = computed(() => {
    return allMapLocations.value.filter(l => l.category !== 'Laporan masyarakat')
  })

  const communityReports = computed(() => {
    return allMapLocations.value.filter(l => l.category === 'Laporan masyarakat')
  })

  return {
    locations,
    categories,
    allMapLocations,
    healthFacilities,
    communityReports
  }
})
