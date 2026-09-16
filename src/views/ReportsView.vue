<script setup>
import { ref, computed } from 'vue'
import { useReportStore } from '@/stores/reportStore'
import UserLayout from '@/layouts/UserLayout.vue'
import ReportCard from '@/components/reports/ReportCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'

const reportStore = useReportStore()

const activeScope = ref('my') // 'my' | 'all'
const selectedCategory = ref('Semua')
const selectedStatus = ref('Semua')

const categories = [
  'Semua',
  'Sampah',
  'Genangan Air',
  'Sanitasi',
  'Lingkungan',
  'Penyakit',
  'Kualitas Air',
  'Lainnya'
]

const statuses = ['Semua', 'Dikirim', 'Diproses', 'Ditangani', 'Selesai']

const filteredReports = computed(() => {
  const baseList = activeScope.value === 'my' ? reportStore.myReports : reportStore.allReports

  return baseList.filter(rep => {
    const matchCategory = selectedCategory.value === 'Semua' || rep.category === selectedCategory.value
    const matchStatus = selectedStatus.value === 'Semua' || rep.status === selectedStatus.value
    return matchCategory && matchStatus
  })
})
</script>

<template>
  <UserLayout>
    <div class="space-y-6">
      <!-- Header & Action -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">
            Laporan Masyarakat & Lingkungan
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">
            Laporkan kendala kebersihan, genangan air, atau sanitasi untuk ditindaklanjuti.
          </p>
        </div>

        <router-link to="/laporan/buat">
          <BaseButton variant="primary" size="md">
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
            </svg>
            + Buat Laporan Baru
          </BaseButton>
        </router-link>
      </div>

      <!-- Scope Switcher & Filters -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Scope toggle: Laporan Saya vs Seluruh Laporan -->
        <div class="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
          <button
            @click="activeScope = 'my'"
            type="button"
            :class="[
              'px-4 py-2 text-xs font-bold rounded-lg transition-all flex-1 sm:flex-initial text-center',
              activeScope === 'my' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            ]"
          >
            Laporan Saya ({{ reportStore.myReports.length }})
          </button>
          <button
            @click="activeScope = 'all'"
            type="button"
            :class="[
              'px-4 py-2 text-xs font-bold rounded-lg transition-all flex-1 sm:flex-initial text-center',
              activeScope === 'all' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            ]"
          >
            Semua Laporan Warga ({{ reportStore.allReports.length }})
          </button>
        </div>

        <!-- Category & Status Dropdown Filters -->
        <div class="flex items-center gap-3 w-full md:w-auto">
          <div class="w-1/2 md:w-44">
            <BaseSelect
              v-model="selectedCategory"
              :options="categories"
              placeholder="Filter Kategori"
            />
          </div>
          <div class="w-1/2 md:w-40">
            <BaseSelect
              v-model="selectedStatus"
              :options="statuses"
              placeholder="Filter Status"
            />
          </div>
        </div>
      </div>

      <!-- Reports List Grid -->
      <div v-if="filteredReports.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ReportCard
          v-for="rep in filteredReports"
          :key="rep.id"
          :report="rep"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-14 bg-white rounded-3xl border border-slate-200/80 p-6">
        <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 class="font-bold text-slate-800 text-sm">Tidak ada laporan yang cocok</h3>
        <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Belum ada data laporan untuk kriteria filter ini. Mulai buat laporan jika ada masalah lingkungan di sekitar Anda.
        </p>
        <div class="mt-4">
          <router-link to="/laporan/buat">
            <BaseButton variant="primary" size="sm">
              + Buat Laporan Sekarang
            </BaseButton>
          </router-link>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
