<script setup>
import UserLayout from '@/layouts/UserLayout.vue'
import ReportForm from '@/components/reports/ReportForm.vue'
</script>

<template>
  <UserLayout>
    <div class="max-w-3xl mx-auto space-y-6">
      <!-- Back Navigation & Title -->
      <div>
        <router-link to="/laporan" class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors mb-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Daftar Laporan
        </router-link>
        <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">
          Buat Laporan Kesehatan & Lingkungan
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">
          Laporkan masalah lingkungan di sekitarmu agar dapat segera diverifikasi dan ditangani petugas.
        </p>
      </div>

      <!-- Main Form -->
      <ReportForm />
    </div>
  </UserLayout>
</template>
