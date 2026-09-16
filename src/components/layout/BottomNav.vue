<script setup>
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const route = useRoute()
const authStore = useAuthStore()
</script>

<template>
  <!-- Only shown on mobile (< md) and when user is logged in -->
  <nav
    v-if="authStore.isAuthenticated"
    class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-2 py-1.5 shadow-lg"
  >
    <!-- Masyarakat Navigation -->
    <div v-if="!authStore.isAdmin" class="grid grid-cols-5 items-center text-center">
      <!-- Dashboard -->
      <router-link
        to="/dashboard"
        class="flex flex-col items-center justify-center py-1 rounded-xl transition-colors"
        :class="route.path === '/dashboard' ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-800'"
      >
        <svg class="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span class="text-[10px] tracking-tight">Beranda</span>
      </router-link>

      <!-- Monitoring -->
      <router-link
        to="/monitoring"
        class="flex flex-col items-center justify-center py-1 rounded-xl transition-colors"
        :class="route.path.startsWith('/monitoring') ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-800'"
      >
        <svg class="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <span class="text-[10px] tracking-tight">Pantau</span>
      </router-link>

      <!-- Lapor (Center highlighted button) -->
      <router-link
        to="/laporan/buat"
        class="flex flex-col items-center justify-center -mt-4"
      >
        <div class="w-11 h-11 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 active:scale-95 transition-transform">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <span class="text-[10px] font-semibold text-emerald-700 mt-0.5">Lapor</span>
      </router-link>

      <!-- Peta -->
      <router-link
        to="/peta"
        class="flex flex-col items-center justify-center py-1 rounded-xl transition-colors"
        :class="route.path === '/peta' ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-800'"
      >
        <svg class="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <span class="text-[10px] tracking-tight">Peta</span>
      </router-link>

      <!-- Profil -->
      <router-link
        to="/profil"
        class="flex flex-col items-center justify-center py-1 rounded-xl transition-colors"
        :class="route.path === '/profil' ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-800'"
      >
        <svg class="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span class="text-[10px] tracking-tight">Profil</span>
      </router-link>
    </div>

    <!-- Admin Navigation on Mobile -->
    <div v-else class="grid grid-cols-4 items-center text-center">
      <router-link
        to="/admin/dashboard"
        class="flex flex-col items-center justify-center py-1 rounded-xl transition-colors"
        :class="route.path === '/admin/dashboard' ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-800'"
      >
        <svg class="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span class="text-[10px]">Dashboard</span>
      </router-link>

      <router-link
        to="/admin/laporan"
        class="flex flex-col items-center justify-center py-1 rounded-xl transition-colors"
        :class="route.path === '/admin/laporan' ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-800'"
      >
        <svg class="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span class="text-[10px]">Laporan</span>
      </router-link>

      <router-link
        to="/admin/edukasi"
        class="flex flex-col items-center justify-center py-1 rounded-xl transition-colors"
        :class="route.path === '/admin/edukasi' ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-800'"
      >
        <svg class="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span class="text-[10px]">Edukasi</span>
      </router-link>

      <router-link
        to="/admin/warning"
        class="flex flex-col items-center justify-center py-1 rounded-xl transition-colors"
        :class="route.path === '/admin/warning' ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-800'"
      >
        <svg class="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span class="text-[10px]">Warning</span>
      </router-link>
    </div>
  </nav>
</template>
