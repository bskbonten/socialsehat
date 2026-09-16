<script setup>
import Navbar from '@/components/layout/Navbar.vue'
import Toast from '@/components/ui/Toast.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-800">
    <Navbar />
    
    <main class="flex-1 flex flex-col">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-slate-100 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span class="font-bold text-slate-800 text-sm">SehatSosial</span>
          <span>&mdash; “Sehat Dimulai dari Kita.”</span>
        </div>
        <p>© 2026 SehatSosial. Platform Digital Kesehatan Masyarakat Terpadu.</p>
      </div>
    </footer>

    <Toast />
  </div>
</template>
