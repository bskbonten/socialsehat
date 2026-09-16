<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useHealthStore } from '@/stores/healthStore'
import { useAdminStore } from '@/stores/adminStore'
import { useEducationStore } from '@/stores/educationStore'
import UserLayout from '@/layouts/UserLayout.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import HealthSummaryCard from '@/components/health/HealthSummaryCard.vue'
import ArticleCard from '@/components/education/ArticleCard.vue'

const router = useRouter()
const authStore = useAuthStore()
const healthStore = useHealthStore()
const adminStore = useAdminStore()
const educationStore = useEducationStore()

const greetingTime = computed(() => {
  const hour = new Date().getHours()
  if (hour < 11) return 'Selamat pagi'
  if (hour < 15) return 'Selamat siang'
  if (hour < 18) return 'Selamat sore'
  return 'Selamat malam'
})

// Peringatan aktif utama
const primaryWarning = computed(() => {
  return adminStore.activeWarnings.length > 0 ? adminStore.activeWarnings[0] : null
})

// 3 catatan monitoring terbaru
const recentRecords = computed(() => {
  return healthStore.healthHistory.slice(0, 3)
})

// 3 artikel edukasi terbaru
const featuredArticles = computed(() => {
  return educationStore.sortedArticles.slice(0, 3)
})

function formatDisplayDate(dateStr) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<template>
  <UserLayout>
    <div class="space-y-8">
      <!-- Top Welcome Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {{ greetingTime }}, {{ authStore.currentUser?.name?.split(' ')[0] || 'Warga' }} 👋
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">
            Pantau kesehatanmu hari ini dan rawat lingkungan sekitar.
          </p>
        </div>

        <div class="flex items-center gap-2 self-start sm:self-auto">
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            Wilayah: Kel. Sejahtera
          </span>
        </div>
      </div>

      <!-- HEALTH SUMMARY CARDS (4 KARTU METRIK MANDIRI) -->
      <section>
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Ringkasan Kesehatan Terakhir
          </h2>
          <span class="text-[11px] text-slate-400">
            Terakhir dicatat: {{ formatDisplayDate(healthStore.latestRecord?.date) }}
          </span>
        </div>

        <HealthSummaryCard :latest-record="healthStore.latestRecord" />
      </section>

      <!-- QUICK ACTIONS -->
      <section>
        <h2 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
          Aksi Cepat
        </h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <!-- + Monitoring -->
          <router-link
            to="/monitoring"
            class="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-500 hover:shadow-card transition-all flex flex-col items-center text-center group"
          >
            <div class="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span class="text-xs font-bold text-slate-800 group-hover:text-emerald-700">Catat Monitoring</span>
            <span class="text-[10px] text-slate-400 mt-0.5">Tensi, suhu & berat</span>
          </router-link>

          <!-- + Buat Laporan -->
          <router-link
            to="/laporan/buat"
            class="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-sky-500 hover:shadow-card transition-all flex flex-col items-center text-center group"
          >
            <div class="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <span class="text-xs font-bold text-slate-800 group-hover:text-sky-700">Buat Laporan</span>
            <span class="text-[10px] text-slate-400 mt-0.5">Sampah & genangan</span>
          </router-link>

          <!-- Edukasi -->
          <router-link
            to="/edukasi"
            class="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-500 hover:shadow-card transition-all flex flex-col items-center text-center group"
          >
            <div class="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span class="text-xs font-bold text-slate-800 group-hover:text-amber-700">Baca Edukasi</span>
            <span class="text-[10px] text-slate-400 mt-0.5">Tips hidup sehat</span>
          </router-link>

          <!-- Peta Kesehatan -->
          <router-link
            to="/peta"
            class="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-500 hover:shadow-card transition-all flex flex-col items-center text-center group"
          >
            <div class="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <span class="text-xs font-bold text-slate-800 group-hover:text-purple-700">Peta Faskes</span>
            <span class="text-[10px] text-slate-400 mt-0.5">Posyandu & laporan</span>
          </router-link>
        </div>
      </section>

      <!-- EARLY WARNING DASHBOARD CARD -->
      <section v-if="primaryWarning">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Early Warning Lingkungan & Kesehatan
          </h2>
          <span class="text-[11px] text-slate-400">{{ formatDisplayDate(primaryWarning.date) }}</span>
        </div>

        <BaseCard
          padding="p-5 sm:p-6"
          :class="[
            'border-2 transition-all',
            primaryWarning.level === 'Critical' ? 'border-rose-200 bg-rose-50/40' :
            primaryWarning.level === 'Warning' ? 'border-amber-200 bg-amber-50/40' :
            'border-sky-200 bg-sky-50/40'
          ]"
        >
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="flex items-start gap-3.5">
              <!-- Warning badge icon -->
              <div
                :class="[
                  'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold',
                  primaryWarning.level === 'Critical' ? 'bg-rose-600' :
                  primaryWarning.level === 'Warning' ? 'bg-amber-500' :
                  'bg-sky-600'
                ]"
              >
                ⚠️
              </div>

              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <BaseBadge
                    :variant="primaryWarning.level === 'Critical' ? 'danger' : primaryWarning.level === 'Warning' ? 'warning' : 'info'"
                    size="sm"
                  >
                    Tingkat: {{ primaryWarning.level }}
                  </BaseBadge>
                  <span class="text-xs font-bold text-slate-700">
                    {{ primaryWarning.region }}
                  </span>
                </div>

                <h3 class="font-extrabold text-slate-900 text-sm sm:text-base mt-1.5">
                  {{ primaryWarning.title }}
                </h3>

                <p class="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  {{ primaryWarning.description }}
                </p>

                <div class="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  <span class="text-emerald-600 font-bold">Imbauan Warga:</span>
                  <span>{{ primaryWarning.actionRequired }}</span>
                </div>
              </div>
            </div>

            <div class="self-end sm:self-center flex-shrink-0">
              <router-link
                to="/peta"
                class="text-xs font-bold px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl shadow-xs transition-colors block"
              >
                Lihat di Peta →
              </router-link>
            </div>
          </div>
        </BaseCard>
      </section>

      <!-- TWO COLUMNS: RECENT MONITORING & COMMUNITY REPORTS -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- Recent Monitoring (col-span-6) -->
        <div class="lg:col-span-6 space-y-3">
          <div class="flex items-center justify-between">
            <h2 class="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Monitoring Terkini
            </h2>
            <router-link to="/monitoring" class="text-xs font-bold text-emerald-600 hover:text-emerald-700">
              Lihat Semua →
            </router-link>
          </div>

          <BaseCard padding="p-0" class="divide-y divide-slate-100 border-slate-200/80 overflow-hidden">
            <div
              v-for="rec in recentRecords"
              :key="rec.id"
              class="p-4 hover:bg-slate-50/60 transition-colors flex items-center justify-between"
            >
              <div>
                <span class="text-xs font-bold text-slate-900">{{ formatDisplayDate(rec.date) }}</span>
                <div class="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span>Suhu: <strong class="text-slate-800">{{ rec.temperature }}°C</strong></span>
                  <span>Tensi: <strong class="text-slate-800">{{ rec.systolic }}/{{ rec.diastolic }}</strong></span>
                  <span>Berat: <strong class="text-slate-800">{{ rec.weight }} kg</strong></span>
                </div>
              </div>

              <BaseBadge
                :variant="rec.statusCategory === 'Normal' ? 'success' : 'warning'"
                size="sm"
                :dot="true"
              >
                {{ rec.statusCategory }}
              </BaseBadge>
            </div>

            <div v-if="recentRecords.length === 0" class="p-6 text-center text-xs text-slate-400">
              Belum ada data monitoring. Klik "Catat Monitoring" untuk menambahkan.
            </div>
          </BaseCard>
        </div>

        <!-- Community Reports Quick Status (col-span-6) -->
        <div class="lg:col-span-6 space-y-3">
          <div class="flex items-center justify-between">
            <h2 class="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Laporan Lingkungan Terkini
            </h2>
            <router-link to="/laporan" class="text-xs font-bold text-emerald-600 hover:text-emerald-700">
              Lihat Semua →
            </router-link>
          </div>

          <BaseCard padding="p-4" class="border-slate-200/80 space-y-3">
            <p class="text-xs text-slate-500">
              Peduli pada kebersihan selokan, genangan jentik, dan penumpukan sampah demi kenyamanan bersama.
            </p>
            <div class="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
              <div>
                <p class="text-xs font-bold text-slate-800">Menemukan Masalah di Sekitarmu?</p>
                <p class="text-[11px] text-slate-400 mt-0.5">Petugas kelurahan siap menindaklanjuti laporan Anda.</p>
              </div>
              <router-link
                to="/laporan/buat"
                class="px-3.5 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-colors flex-shrink-0"
              >
                + Laporkan
              </router-link>
            </div>
          </BaseCard>
        </div>
      </section>

      <!-- HEALTH EDUCATION ARTICLES -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Edukasi Kesehatan Pilihan
            </h2>
            <p class="text-xs text-slate-500 mt-0.5">Informasi preventif untuk gaya hidup sehat keluarga.</p>
          </div>
          <router-link to="/edukasi" class="text-xs font-bold text-emerald-600 hover:text-emerald-700">
            Jelajahi Artikel →
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ArticleCard
            v-for="art in featuredArticles"
            :key="art.id"
            :article="art"
          />
        </div>
      </section>
    </div>
  </UserLayout>
</template>
