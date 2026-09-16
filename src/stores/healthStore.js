import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { initialHealthRecords } from '@/data/healthRecords'
import { getStorage, setStorage } from '@/utils/storage'
import { useAuthStore } from './authStore'

export const useHealthStore = defineStore('health', () => {
  const records = ref(getStorage('health_records', initialHealthRecords))

  if (!getStorage('health_records')) {
    setStorage('health_records', records.value)
  }

  const authStore = useAuthStore()

  // Records khusus untuk pengguna saat ini
  const userRecords = computed(() => {
    if (!authStore.currentUser) return []
    return records.value
      .filter(r => r.userId === authStore.currentUser.id)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  })

  // Data monitoring terbaru
  const latestRecord = computed(() => {
    if (userRecords.value.length === 0) {
      return {
        date: new Date().toISOString().split('T')[0],
        systolic: 120,
        diastolic: 80,
        weight: 60,
        temperature: 36.5,
        symptoms: ['Tidak ada'],
        notes: 'Belum ada data monitoring terbaru.',
        statusCategory: 'Normal'
      }
    }
    const rec = userRecords.value[0]
    return {
      ...rec,
      statusCategory: evaluateStatus(rec.systolic, rec.diastolic, rec.temperature)
    }
  })

  // Riwayat lengkap
  const healthHistory = computed(() => {
    return userRecords.value.map(rec => ({
      ...rec,
      statusCategory: evaluateStatus(rec.systolic, rec.diastolic, rec.temperature)
    }))
  })

  /**
   * Helper non-diagnostik untuk indikator parameter kesehatan
   * Catatan keselamatan medis: ini hanyalah kategori rentang parameter umum, bukan diagnosis medis
   */
  function evaluateStatus(systolic, diastolic, temp) {
    if (temp >= 38.0 || systolic >= 140 || diastolic >= 90) {
      return 'Perlu Perhatian'
    }
    if (temp >= 37.3 || systolic >= 130 || diastolic >= 85) {
      return 'Waspada'
    }
    return 'Normal'
  }

  /**
   * Menambahkan catatan monitoring kesehatan baru
   * @param {Object} newRecord 
   */
  function addHealthRecord(newRecord) {
    const currentUserId = authStore.currentUser?.id || 'user-001'
    
    const record = {
      id: `hr-${Date.now()}`,
      userId: currentUserId,
      date: newRecord.date || new Date().toISOString().split('T')[0],
      weight: parseFloat(newRecord.weight),
      temperature: parseFloat(newRecord.temperature),
      systolic: parseInt(newRecord.systolic, 10),
      diastolic: parseInt(newRecord.diastolic, 10),
      symptoms: Array.isArray(newRecord.symptoms) && newRecord.symptoms.length > 0 
        ? newRecord.symptoms 
        : ['Tidak ada'],
      notes: (newRecord.notes || '').trim(),
      createdAt: new Date().toISOString()
    }

    records.value.unshift(record)
    setStorage('health_records', records.value)
    return record
  }

  /**
   * Menghapus catatan monitoring
   * @param {string} id 
   */
  function deleteHealthRecord(id) {
    records.value = records.value.filter(r => r.id !== id)
    setStorage('health_records', records.value)
  }

  return {
    records,
    userRecords,
    latestRecord,
    healthHistory,
    addHealthRecord,
    deleteHealthRecord
  }
})
