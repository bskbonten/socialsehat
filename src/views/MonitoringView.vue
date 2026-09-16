<script setup>
import { ref } from 'vue'
import { useHealthStore } from '@/stores/healthStore'
import { useToastStore } from '@/stores/toastStore'
import UserLayout from '@/layouts/UserLayout.vue'
import MonitoringForm from '@/components/health/MonitoringForm.vue'
import HealthHistory from '@/components/health/HealthHistory.vue'

const healthStore = useHealthStore()
const toastStore = useToastStore()

const activeTab = ref('form') // 'form' | 'history'

function handleDeleteRecord(id) {
  if (confirm('Apakah Anda yakin ingin menghapus catatan monitoring ini?')) {
    healthStore.deleteHealthRecord(id)
    toastStore.showToast('Catatan monitoring berhasil dihapus.', 'info')
  }
}

function handleRecordSaved() {
  activeTab.value = 'history'
}
</script>

<template>
  <UserLayout>
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">
            Monitoring Kesehatan Pribadi
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">
            Pantau dan catat tensi, berat badan, serta suhu tubuh secara teratur.
          </p>
        </div>

        <!-- Tab Switcher -->
        <div class="flex items-center gap-1.5 bg-slate-200/80 p-1.5 rounded-2xl self-start sm:self-auto">
          <button
            @click="activeTab = 'form'"
            type="button"
            :class="[
              'px-4 py-2 text-xs font-bold rounded-xl transition-all',
              activeTab === 'form' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            ]"
          >
            + Catat Baru
          </button>
          <button
            @click="activeTab = 'history'"
            type="button"
            :class="[
              'px-4 py-2 text-xs font-bold rounded-xl transition-all',
              activeTab === 'history' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            ]"
          >
            Riwayat & Grafik ({{ healthStore.healthHistory.length }})
          </button>
        </div>
      </div>

      <!-- Tab 1: Form Input -->
      <div v-show="activeTab === 'form'" class="space-y-6">
        <MonitoringForm @saved="handleRecordSaved" />
      </div>

      <!-- Tab 2: Riwayat & Grafik -->
      <div v-show="activeTab === 'history'" class="space-y-6">
        <HealthHistory
          :records="healthStore.healthHistory"
          @delete-record="handleDeleteRecord"
        />
      </div>
    </div>
  </UserLayout>
</template>
