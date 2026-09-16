<script setup>
import Navbar from '@/components/layout/Navbar.vue'
import BottomNav from '@/components/layout/BottomNav.vue'
import Toast from '@/components/ui/Toast.vue'
import { useAdminStore } from '@/stores/adminStore'
import { useRouter } from 'vue-router'

const adminStore = useAdminStore()
const router = useRouter()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
    <!-- Navbar -->
    <Navbar />

    <!-- Top Alert Banner if there are active Critical or Warning alerts -->
    <div
      v-if="adminStore.activeWarnings.length > 0 && adminStore.activeWarnings[0].level === 'Critical'"
      class="bg-rose-600 text-white text-xs px-4 py-2 text-center flex items-center justify-center gap-2 font-medium"
    >
      <span class="px-1.5 py-0.5 rounded bg-white/20 uppercase font-bold text-[10px]">Peringatan Kritis</span>
      <span class="truncate max-w-xl">{{ adminStore.activeWarnings[0].title }} — {{ adminStore.activeWarnings[0].region }}</span>
      <button
        @click="router.push('/dashboard')"
        class="underline font-bold hover:text-rose-100 ml-1"
        type="button"
      >
        Lihat Info
      </button>
    </div>

    <!-- Main Container -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12">
      <slot />
    </main>

    <!-- Mobile Bottom Navigation -->
    <BottomNav />

    <!-- Toast Component -->
    <Toast />
  </div>
</template>
