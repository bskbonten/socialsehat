<script setup>
import { computed } from 'vue'
import { useAdminStore } from '@/stores/adminStore'
import { useReportStore } from '@/stores/reportStore'
import { useAuthStore } from '@/stores/authStore'
import AdminLayout from '@/layouts/AdminLayout.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'

const adminStore = useAdminStore()
const reportStore = useReportStore()
const authStore = useAuthStore()

const stats = computed(() => adminStore.statistics)

const recentReports = computed(() => {
  return reportStore.allReports.slice(0, 5)
})

function formatDisplayDate(dateStr) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Admin Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">
              Dashboard Administrasi
            </h1>
            <span class="px-2.5 py-0.5 text-xs font-bold bg-sky-100 text-sky-800 rounded-md">
              Posko Terpadu
            </span>
          </div>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">
            Pantauan statistik penanganan laporan warga dan status kesiapsiagaan wilayah.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <router-link
            to="/admin/warning"
            class="px-3.5 py-2 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>⚠️</span>
            Buat Early Warning
          </router-link>
          <router-link
            to="/admin/laporan"
            class="px-3.5 py-2 text-xs font-bold rounded-xl bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition-colors"
          >
            Kelola Laporan
          </router-link>
        </div>
      </div>

      <!-- 4 STATISTIK UTAMA -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Total Pengguna -->
        <BaseCard padding="p-5" class="border-slate-200/80">
          <div class="flex items-center justify-between text-slate-400 mb-2">
            <span class="text-xs font-semibold text-slate-600">Total Pengguna</span>
            <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <p class="text-2xl sm:text-3xl font-extrabold text-slate-900">{{ stats.totalUsers }}</p>
          <p class="text-[11px] text-emerald-600 font-medium mt-1">● Terdaftar aktif</p>
        </BaseCard>

        <!-- Total Laporan Masuk -->
        <BaseCard padding="p-5" class="border-slate-200/80">
          <div class="flex items-center justify-between text-slate-400 mb-2">
            <span class="text-xs font-semibold text-slate-600">Total Laporan</span>
            <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <p class="text-2xl sm:text-3xl font-extrabold text-slate-900">{{ stats.totalReports }}</p>
          <p class="text-[11px] text-slate-400 mt-1">Keseluruhan keluhan</p>
        </BaseCard>

        <!-- Laporan Diproses / Ditangani -->
        <BaseCard padding="p-5" class="border-slate-200/80">
          <div class="flex items-center justify-between text-slate-400 mb-2">
            <span class="text-xs font-semibold text-slate-600">Sedang Diproses</span>
            <div class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p class="text-2xl sm:text-3xl font-extrabold text-slate-900">{{ stats.reportsProcessing }}</p>
          <p class="text-[11px] text-amber-600 font-medium mt-1">● Dalam penanganan tim</p>
        </BaseCard>

        <!-- Laporan Selesai -->
        <BaseCard padding="p-5" class="border-slate-200/80">
          <div class="flex items-center justify-between text-slate-400 mb-2">
            <span class="text-xs font-semibold text-slate-600">Tuntas Selesai</span>
            <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <p class="text-2xl sm:text-3xl font-extrabold text-slate-900">{{ stats.reportsCompleted }}</p>
          <p class="text-[11px] text-emerald-600 font-medium mt-1">● Masalah diselesaikan</p>
        </BaseCard>
      </div>

      <!-- GRAFIK & DISTRIBUSI KATEGORI -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Breakdown Kategori Laporan (col-span-7) -->
        <div class="lg:col-span-7">
          <BaseCard padding="p-5 sm:p-6" class="border-slate-200/80 space-y-4">
            <div>
              <h3 class="text-sm font-bold text-slate-900">
                Distribusi Laporan per Kategori Masalah
              </h3>
              <p class="text-xs text-slate-500 mt-0.5">
                Proporsi pengaduan lingkungan dan potensi penyakit di lapangan.
              </p>
            </div>

            <!-- Bar Visualizations -->
            <div class="space-y-3 pt-2">
              <div
                v-for="(count, cat) in stats.categoryCounts"
                :key="cat"
                class="space-y-1"
              >
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold text-slate-700">{{ cat }}</span>
                  <span class="font-semibold text-slate-500">{{ count }} laporan</span>
                </div>
                <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all duration-500"
                    :class="[
                      cat === 'Sampah' ? 'bg-amber-500' :
                      cat === 'Genangan Air' ? 'bg-sky-500' :
                      cat === 'Sanitasi' ? 'bg-emerald-500' :
                      cat === 'Penyakit' ? 'bg-rose-500' : 'bg-purple-500'
                    ]"
                    :style="{ width: `${(count / stats.totalReports) * 100}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Status Overview Card (col-span-5) -->
        <div class="lg:col-span-5">
          <BaseCard padding="p-5 sm:p-6" class="border-slate-200/80 space-y-4">
            <div>
              <h3 class="text-sm font-bold text-slate-900">
                Status Operasional Laporan
              </h3>
              <p class="text-xs text-slate-500 mt-0.5">
                Alur tindak lanjut pengaduan warga.
              </p>
            </div>

            <div class="space-y-3 pt-2 text-xs">
              <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                  <span class="font-medium text-slate-700">Dikirim (Menunggu Tindakan)</span>
                </div>
                <span class="font-bold text-slate-900">{{ stats.reportsSent }}</span>
              </div>

              <div class="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-100">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span class="font-medium text-amber-900">Diproses / Verifikasi Lapangan</span>
                </div>
                <span class="font-bold text-amber-900">{{ stats.reportsProcessing }}</span>
              </div>

              <div class="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span class="font-medium text-emerald-900">Telah Selesai Ditangani</span>
                </div>
                <span class="font-bold text-emerald-900">{{ stats.reportsCompleted }}</span>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>

      <!-- AKTIVITAS LAPORAN WARGA TERBARU -->
      <BaseCard padding="p-0" class="border-slate-200/80 overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 class="text-sm font-bold text-slate-900">
              Pengaduan Masyarakat Terkini
            </h3>
            <p class="text-xs text-slate-400 mt-0.5">Laporan terbaru yang masuk ke meja petugas</p>
          </div>
          <router-link to="/admin/laporan" class="text-xs font-bold text-sky-600 hover:text-sky-700">
            Buka Semua Laporan →
          </router-link>
        </div>

        <div class="divide-y divide-slate-100 text-xs">
          <div
            v-for="rep in recentReports"
            :key="rep.id"
            class="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="font-bold text-slate-900">{{ rep.title }}</span>
                <span class="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                  {{ rep.category }}
                </span>
              </div>
              <p class="text-[11px] text-slate-400">
                Pelapor: <strong class="text-slate-600">{{ rep.userName }}</strong> • Lokasi: {{ rep.location }} • {{ formatDisplayDate(rep.createdAt) }}
              </p>
            </div>

            <div class="flex items-center gap-2 self-start sm:self-auto">
              <BaseBadge
                :variant="rep.status === 'Selesai' ? 'success' : rep.status === 'Diproses' ? 'warning' : 'neutral'"
                size="sm"
                :dot="true"
              >
                {{ rep.status }}
              </BaseBadge>
              <router-link
                to="/admin/laporan"
                class="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 transition-colors"
              >
                Proses
              </router-link>
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
  </AdminLayout>
</template>
