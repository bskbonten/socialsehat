<script setup>
import Navbar from '@/components/layout/Navbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import BottomNav from '@/components/layout/BottomNav.vue'
import Toast from '@/components/ui/Toast.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Admin Shell with Sidebar -->
    <div class="flex-1 flex max-w-7xl w-full mx-auto">
      <Sidebar />

      <main class="flex-1 p-4 sm:p-6 lg:p-8 pb-24 md:pb-12 min-w-0 overflow-hidden">
        <slot />
      </main>
    </div>

    <!-- Mobile Bottom Navigation -->
    <BottomNav />

    <!-- Toast Component -->
    <Toast />
  </div>
</template>
