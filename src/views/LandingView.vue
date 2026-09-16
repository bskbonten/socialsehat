<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import PublicLayout from '@/layouts/PublicLayout.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'

const router = useRouter()
const authStore = useAuthStore()

function handleGetStarted() {
  if (authStore.isAuthenticated) {
    router.push(authStore.isAdmin ? '/admin/dashboard' : '/dashboard')
  } else {
    router.push('/register')
  }
}

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <PublicLayout>
    <!-- HERO SECTION -->
    <section class="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-emerald-50/70 via-slate-50 to-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- Text column -->
          <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Platform Digital Kesehatan Masyarakat Terpadu
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Sehat Dimulai <br class="hidden sm:inline" />
              <span class="text-emerald-600 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
                dari Kita.
              </span>
            </h1>

            <p class="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Pantau kesehatan diri, peduli lingkungan sekitar, dan bersama membangun komunitas masyarakat yang tanggap, sehat, dan berdaya.
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <BaseButton
                @click="handleGetStarted"
                variant="primary"
                size="lg"
                class="shadow-lg shadow-emerald-600/20 w-full sm:w-auto"
              >
                Mulai Sekarang
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </BaseButton>

              <BaseButton
                @click="scrollToSection('fitur')"
                variant="outline"
                size="lg"
                class="w-full sm:w-auto"
              >
                Pelajari SehatSosial
              </BaseButton>
            </div>

            <!-- Trust / Highlights badge -->
            <div class="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Pemantauan Mandiri</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Respons Cepat Wilayah</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Edukasi Preventif</span>
              </div>
            </div>
          </div>

          <!-- Hero Visual Column -->
          <div class="lg:col-span-5 relative flex justify-center">
            <div class="relative w-full max-w-md">
              <!-- Decorative blur circles -->
              <div class="absolute -top-6 -left-6 w-56 h-56 bg-emerald-200/50 rounded-full blur-2xl -z-10"></div>
              <div class="absolute -bottom-6 -right-6 w-56 h-56 bg-sky-200/50 rounded-full blur-2xl -z-10"></div>

              <!-- Main Hero Mockup Card -->
              <div class="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div class="flex items-center gap-2.5">
                    <div class="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                      SS
                    </div>
                    <div>
                      <h4 class="text-xs font-bold text-slate-800">Kondisi Wilayah Terpantau</h4>
                      <p class="text-[10px] text-slate-400">Kelurahan Sejahtera & Sekitarnya</p>
                    </div>
                  </div>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">Aktif</span>
                </div>

                <!-- Floating stat cards inside hero -->
                <div class="grid grid-cols-2 gap-3">
                  <div class="bg-slate-50 p-3 rounded-2xl">
                    <p class="text-[10px] text-slate-400">Monitoring Tubuh</p>
                    <p class="text-sm font-bold text-slate-800 mt-0.5">120/80 mmHg</p>
                    <span class="text-[9px] text-emerald-600 font-semibold">● Kondisi Terjaga</span>
                  </div>
                  <div class="bg-slate-50 p-3 rounded-2xl">
                    <p class="text-[10px] text-slate-400">Laporan Lingkungan</p>
                    <p class="text-sm font-bold text-slate-800 mt-0.5">10 Masalah</p>
                    <span class="text-[9px] text-sky-600 font-semibold">● 70% Tertangani</span>
                  </div>
                </div>

                <!-- Interactive notice box -->
                <div class="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-100 flex items-start gap-3">
                  <div class="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 text-xs">
                    ✓
                  </div>
                  <div>
                    <h5 class="text-xs font-bold text-emerald-900">Gerakan PSN 3M Serentak</h5>
                    <p class="text-[11px] text-emerald-800/80 mt-0.5">Warga RW 02 bergotong royong membersihkan saluran air hari ini.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FITUR SECTION (4 KARTU) -->
    <section id="fitur" class="py-16 bg-white border-y border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider">Fitur Utama</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Solusi Menyeluruh untuk Kesehatan Kita
          </h2>
          <p class="text-xs sm:text-sm text-slate-500 mt-2">
            Membangun hubungan erat antara pemantauan pribadi dan kesadaran lingkungan bersama.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- 1. Monitoring Kesehatan -->
          <BaseCard padding="p-6" :hover="true" class="border-slate-100 group">
            <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-2">Monitoring Kesehatan</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              Catat kondisi kesehatanmu secara berkala seperti tekanan darah, suhu, dan keluhan harian.
            </p>
          </BaseCard>

          <!-- 2. Lapor Masalah -->
          <BaseCard padding="p-6" :hover="true" class="border-slate-100 group">
            <div class="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-2">Lapor Masalah</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              Laporkan masalah kesehatan atau lingkungan di sekitar seperti sampah liar dan genangan air.
            </p>
          </BaseCard>

          <!-- 3. Edukasi -->
          <BaseCard padding="p-6" :hover="true" class="border-slate-100 group">
            <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-2">Edukasi</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              Temukan informasi kesehatan yang sederhana, berbasis bukti, dan mudah dipahami keluarga.
            </p>
          </BaseCard>

          <!-- 4. Pantau Lingkungan -->
          <BaseCard padding="p-6" :hover="true" class="border-slate-100 group">
            <div class="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-2">Pantau Lingkungan</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              Lihat informasi faskes terdekat, posyandu, dan laporan masyarakat di wilayah sekitarmu.
            </p>
          </BaseCard>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS SECTION -->
    <section class="py-16 lg:py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-14">
          <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider">Alur Kerja</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Bagaimana SehatSosial Bekerja?
          </h2>
          <p class="text-xs sm:text-sm text-slate-500 mt-2">
            Empat langkah sederhana untuk menciptakan lingkungan yang sehat dan tanggap.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <!-- Step 1 -->
          <div class="relative flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-soft">
            <div class="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-extrabold text-base mb-4 shadow-md shadow-emerald-600/20">
              1
            </div>
            <h3 class="font-bold text-slate-800 text-sm mb-1.5">Pantau</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              Pantau kondisi tubuh mandiri secara teratur dan kenali sinyal kesehatanmu sejak dini.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="relative flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-soft">
            <div class="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-extrabold text-base mb-4 shadow-md shadow-emerald-600/20">
              2
            </div>
            <h3 class="font-bold text-slate-800 text-sm mb-1.5">Laporkan</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              Laporkan keluhan lingkungan seperti genangan air atau sampah liar dengan foto lokasi.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="relative flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-soft">
            <div class="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-extrabold text-base mb-4 shadow-md shadow-emerald-600/20">
              3
            </div>
            <h3 class="font-bold text-slate-800 text-sm mb-1.5">Dapatkan Informasi</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              Peroleh peringatan dini (*early warning*), status laporan, dan edukasi kesehatan relevan.
            </p>
          </div>

          <!-- Step 4 -->
          <div class="relative flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-soft">
            <div class="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-extrabold text-base mb-4 shadow-md shadow-emerald-600/20">
              4
            </div>
            <h3 class="font-bold text-slate-800 text-sm mb-1.5">Bersama Menjaga</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              Bersinergi bersama petugas dan warga untuk menciptakan wilayah yang bersih dan sehat.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CALL TO ACTION -->
    <section class="py-14 bg-emerald-700 text-white text-center">
      <div class="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Siap Membangun Masyarakat yang Lebih Sehat?
        </h2>
        <p class="text-xs sm:text-sm text-emerald-100 mt-2 max-w-xl mx-auto">
          Mulai langkah kecilmu hari ini dengan mencatat kesehatan dan peduli pada kondisi lingkungan sekitar.
        </p>
        <div class="mt-6 flex justify-center gap-3">
          <BaseButton
            @click="handleGetStarted"
            variant="outline"
            size="lg"
            class="bg-white text-emerald-800 hover:bg-emerald-50 border-white font-bold"
          >
            Gabung Bersama Warga
          </BaseButton>
        </div>
      </div>
    </section>
  </PublicLayout>
</template>
