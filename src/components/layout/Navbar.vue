<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useNotificationStore } from '@/stores/notificationStore'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const notifStore = useNotificationStore()

const isProfileMenuOpen = ref(false)

function handleLogout() {
  authStore.logout()
  isProfileMenuOpen.value = false
  router.push('/login')
}
</script>

<template>
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Logo & Brand -->
      <router-link to="/" class="flex items-center gap-2.5 group">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <div>
          <span class="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
            SehatSosial
            <span v-if="authStore.isAdmin" class="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-sky-100 text-sky-700">Admin</span>
          </span>
          <p class="text-[11px] text-slate-500 leading-none hidden sm:block">Sehat Dimulai dari Kita.</p>
        </div>
      </router-link>

      <!-- Desktop Nav Links -->
      <nav v-if="authStore.isAuthenticated && !authStore.isAdmin" class="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
        <router-link
          to="/dashboard"
          class="px-3 py-2 rounded-xl transition-colors hover:text-emerald-700 hover:bg-emerald-50/60"
          :class="{ 'text-emerald-700 bg-emerald-50 font-semibold': route.path === '/dashboard' }"
        >
          Dashboard
        </router-link>
        <router-link
          to="/monitoring"
          class="px-3 py-2 rounded-xl transition-colors hover:text-emerald-700 hover:bg-emerald-50/60"
          :class="{ 'text-emerald-700 bg-emerald-50 font-semibold': route.path.startsWith('/monitoring') }"
        >
          Monitoring
        </router-link>
        <router-link
          to="/laporan"
          class="px-3 py-2 rounded-xl transition-colors hover:text-emerald-700 hover:bg-emerald-50/60"
          :class="{ 'text-emerald-700 bg-emerald-50 font-semibold': route.path.startsWith('/laporan') }"
        >
          Laporan
        </router-link>
        <router-link
          to="/peta"
          class="px-3 py-2 rounded-xl transition-colors hover:text-emerald-700 hover:bg-emerald-50/60"
          :class="{ 'text-emerald-700 bg-emerald-50 font-semibold': route.path === '/peta' }"
        >
          Peta
        </router-link>
        <router-link
          to="/edukasi"
          class="px-3 py-2 rounded-xl transition-colors hover:text-emerald-700 hover:bg-emerald-50/60"
          :class="{ 'text-emerald-700 bg-emerald-50 font-semibold': route.path.startsWith('/edukasi') }"
        >
          Edukasi
        </router-link>
        <router-link
          to="/forum"
          class="px-3 py-2 rounded-xl transition-colors hover:text-emerald-700 hover:bg-emerald-50/60"
          :class="{ 'text-emerald-700 bg-emerald-50 font-semibold': route.path.startsWith('/forum') }"
        >
          Forum
        </router-link>
      </nav>

      <!-- Desktop Admin Nav Links -->
      <nav v-else-if="authStore.isAdmin" class="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
        <router-link
          to="/admin/dashboard"
          class="px-3 py-2 rounded-xl transition-colors hover:text-sky-700 hover:bg-sky-50"
          :class="{ 'text-sky-700 bg-sky-50 font-semibold': route.path === '/admin/dashboard' }"
        >
          Dashboard Admin
        </router-link>
        <router-link
          to="/admin/laporan"
          class="px-3 py-2 rounded-xl transition-colors hover:text-sky-700 hover:bg-sky-50"
          :class="{ 'text-sky-700 bg-sky-50 font-semibold': route.path === '/admin/laporan' }"
        >
          Kelola Laporan
        </router-link>
        <router-link
          to="/admin/edukasi"
          class="px-3 py-2 rounded-xl transition-colors hover:text-sky-700 hover:bg-sky-50"
          :class="{ 'text-sky-700 bg-sky-50 font-semibold': route.path === '/admin/edukasi' }"
        >
          Kelola Edukasi
        </router-link>
        <router-link
          to="/admin/warning"
          class="px-3 py-2 rounded-xl transition-colors hover:text-sky-700 hover:bg-sky-50"
          :class="{ 'text-sky-700 bg-sky-50 font-semibold': route.path === '/admin/warning' }"
        >
          Early Warning
        </router-link>
      </nav>

      <!-- Right User / Notification Controls -->
      <div class="flex items-center gap-2">
        <template v-if="authStore.isAuthenticated">
          <!-- Notification Bell with Unread Badge -->
          <router-link
            to="/notifikasi"
            class="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Notifikasi"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span
              v-if="notifStore.unreadCount > 0"
              class="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold text-white bg-rose-500 rounded-full animate-pulse"
            >
              {{ notifStore.unreadCount > 9 ? '9+' : notifStore.unreadCount }}
            </span>
          </router-link>

          <!-- User Avatar Dropdown -->
          <div class="relative">
            <button
              @click="isProfileMenuOpen = !isProfileMenuOpen"
              class="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none"
              type="button"
            >
              <img
                :src="authStore.currentUser?.avatar"
                alt="Avatar"
                class="w-8 h-8 rounded-full object-cover border border-emerald-200"
              />
              <span class="text-xs font-semibold text-slate-700 hidden lg:block max-w-[120px] truncate">
                {{ authStore.currentUser?.name }}
              </span>
              <svg class="w-4 h-4 text-slate-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="isProfileMenuOpen"
              @click="isProfileMenuOpen = false"
              class="fixed inset-0 z-40"
            ></div>
            <div
              v-if="isProfileMenuOpen"
              class="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
            >
              <div class="px-4 py-2.5 border-b border-slate-100">
                <p class="text-xs font-bold text-slate-900 truncate">{{ authStore.currentUser?.name }}</p>
                <p class="text-[11px] text-slate-500 truncate">{{ authStore.currentUser?.email }}</p>
                <div class="mt-1">
                  <span class="text-[10px] font-medium px-2 py-0.5 rounded-full" :class="authStore.isAdmin ? 'bg-sky-100 text-sky-700' : 'bg-emerald-100 text-emerald-700'">
                    Role: {{ authStore.currentUser?.role }}
                  </span>
                </div>
              </div>

              <div class="py-1 text-xs text-slate-700">
                <router-link
                  v-if="!authStore.isAdmin"
                  to="/profil"
                  class="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors"
                  @click="isProfileMenuOpen = false"
                >
                  <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Kelola Profil
                </router-link>
                <router-link
                  v-if="!authStore.isAdmin"
                  to="/monitoring"
                  class="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors"
                  @click="isProfileMenuOpen = false"
                >
                  <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Riwayat Monitoring
                </router-link>
                <router-link
                  v-if="!authStore.isAdmin"
                  to="/laporan"
                  class="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors"
                  @click="isProfileMenuOpen = false"
                >
                  <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Laporan Saya
                </router-link>
              </div>

              <div class="pt-1 border-t border-slate-100">
                <button
                  @click="handleLogout"
                  class="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-medium transition-colors text-left"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Keluar (Logout)
                </button>
              </div>
            </div>
          </div>
        </template>

        <!-- If Not Logged In -->
        <template v-else>
          <router-link
            to="/login"
            class="text-xs font-semibold px-4 py-2 text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors"
          >
            Masuk
          </router-link>
          <router-link
            to="/register"
            class="text-xs font-semibold px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl transition-colors shadow-xs"
          >
            Daftar Warga
          </router-link>
        </template>
      </div>
    </div>
  </header>
</template>
