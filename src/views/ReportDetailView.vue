<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useReportStore } from '@/stores/reportStore'
import UserLayout from '@/layouts/UserLayout.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import ReportStatusTimeline from '@/components/reports/ReportStatusTimeline.vue'

const route = useRoute()
const router = useRouter()
const reportStore = useReportStore()

const report = computed(() => {
  return reportStore.getReportById(route.params.id)
})

const statusBadge = computed(() => {
  if (!report.value) return { variant: 'neutral', text: 'Dikirim' }
  switch (report.value.status) {
    case 'Selesai':
      return { variant: 'success', text: 'Selesai' }
    case 'Ditangani':
      return { variant: 'sky', text: 'Ditangani' }
    case 'Diproses':
      return { variant: 'warning', text: 'Diproses' }
    case 'Dikirim':
    default:
      return { variant: 'neutral', text: 'Dikirim' }
  }
})

function formatDateTime(isoStr) {
  if (!isoStr) return '-'
  return new Date(isoStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <UserLayout>
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Top Navigation -->
      <button
        @click="router.back()"
        class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
        type="button"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali
      </button>

      <!-- Not Found State -->
      <div v-if="!report" class="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
        <p class="text-sm font-bold text-slate-800">Laporan tidak ditemukan</p>
        <p class="text-xs text-slate-500 mt-1">Laporan dengan ID tersebut tidak tersedia atau telah dihapus.</p>
        <router-link to="/laporan" class="mt-4 inline-block text-xs font-bold text-emerald-600 hover:underline">
          Lihat Semua Laporan
        </router-link>
      </div>

      <!-- Main Detail View -->
      <template v-else>
        <!-- Status Tracker Header Card -->
        <BaseCard padding="p-5 sm:p-6" class="border-slate-200/80">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span class="text-[11px] font-mono text-slate-400">ID Laporan: {{ report.id }}</span>
              <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                {{ report.title }}
              </h1>
            </div>
            <div class="flex items-center gap-2">
              <BaseBadge :variant="statusBadge.variant" size="md" :dot="true">
                Status: {{ statusBadge.text }}
              </BaseBadge>
            </div>
          </div>

          <!-- Timeline Component -->
          <div class="mt-4">
            <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Perkembangan Penanganan
            </h4>
            <ReportStatusTimeline
              :current-status="report.status"
              :timeline="report.timeline"
            />
          </div>
        </BaseCard>

        <!-- Information Details & Media Grid -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <!-- Left Column: Content & Officer Notes (col-span-7) -->
          <div class="md:col-span-7 space-y-6">
            <BaseCard padding="p-5 sm:p-6" class="border-slate-200/80 space-y-4">
              <h3 class="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Rincian Laporan
              </h3>

              <div class="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span class="text-slate-400 block mb-0.5">Kategori Masalah</span>
                  <span class="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                    {{ report.category }}
                  </span>
                </div>
                <div>
                  <span class="text-slate-400 block mb-0.5">Waktu Lapor</span>
                  <span class="font-semibold text-slate-800">
                    {{ formatDateTime(report.createdAt) }}
                  </span>
                </div>
              </div>

              <div>
                <span class="text-xs text-slate-400 block mb-1">Lokasi Kejadian</span>
                <p class="text-xs sm:text-sm font-semibold text-slate-800 flex items-start gap-1.5">
                  <svg class="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{{ report.location }}</span>
                </p>
              </div>

              <div>
                <span class="text-xs text-slate-400 block mb-1">Deskripsi Masalah</span>
                <p class="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {{ report.description }}
                </p>
              </div>

              <!-- Catatan Petugas / Tindak Lanjut -->
              <div class="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-1.5">
                <div class="flex items-center gap-2 text-sky-800 font-bold text-xs">
                  <svg class="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>Catatan Petugas Wilayah:</span>
                </div>
                <p class="text-xs text-slate-700 leading-relaxed">
                  {{ report.officerNotes || 'Belum ada catatan penanganan dari petugas.' }}
                </p>
                <p class="text-[10px] text-slate-400 pt-1">
                  Pembaruan Terakhir: {{ formatDateTime(report.updatedAt) }}
                </p>
              </div>
            </BaseCard>
          </div>

          <!-- Right Column: Foto Bukti & Pelapor (col-span-5) -->
          <div class="md:col-span-5 space-y-6">
            <BaseCard padding="p-4" class="border-slate-200/80 space-y-3">
              <h3 class="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Foto Bukti Masalah
              </h3>
              <div class="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 max-h-72">
                <img
                  :src="report.photo"
                  :alt="report.title"
                  class="w-full h-full object-cover"
                />
              </div>
            </BaseCard>

            <BaseCard padding="p-4" class="border-slate-200/80 space-y-2 text-xs">
              <span class="text-slate-400 block font-medium">Data Pelapor:</span>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  {{ report.userName.charAt(0) }}
                </div>
                <div>
                  <p class="font-bold text-slate-800">{{ report.userName }}</p>
                  <p class="text-[11px] text-slate-400">Warga Terverifikasi</p>
                </div>
              </div>
            </BaseCard>
          </div>
        </div>
      </template>
    </div>
  </UserLayout>
</template>
