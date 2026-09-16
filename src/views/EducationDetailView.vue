<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEducationStore } from '@/stores/educationStore'
import UserLayout from '@/layouts/UserLayout.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'

const route = useRoute()
const router = useRouter()
const educationStore = useEducationStore()

const article = computed(() => {
  return educationStore.getArticleById(route.params.id)
})

const relatedArticles = computed(() => {
  if (!article.value) return []
  return educationStore.sortedArticles
    .filter(a => a.id !== article.value.id && a.category === article.value.category)
    .slice(0, 2)
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
    <div class="max-w-3xl mx-auto space-y-6">
      <!-- Back Button -->
      <button
        @click="router.back()"
        class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
        type="button"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Edukasi
      </button>

      <!-- Not found -->
      <div v-if="!article" class="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
        <p class="text-sm font-bold text-slate-800">Artikel tidak ditemukan</p>
        <router-link to="/edukasi" class="text-xs font-bold text-emerald-600 hover:underline mt-2 inline-block">
          Kembali ke Daftar Edukasi
        </router-link>
      </div>

      <!-- Article Content -->
      <article v-else class="space-y-6">
        <BaseCard padding="p-6 sm:p-8" class="border-slate-200/80 space-y-6">
          <!-- Category & Read time -->
          <div class="flex items-center justify-between gap-2">
            <BaseBadge variant="emerald" size="md">
              {{ article.category }}
            </BaseBadge>
            <span class="text-xs text-slate-400">
              Waktu baca: {{ article.readTime || '3 menit' }}
            </span>
          </div>

          <!-- Title -->
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {{ article.title }}
          </h1>

          <!-- Author and date metadata -->
          <div class="flex items-center gap-3 pb-4 border-b border-slate-100 text-xs text-slate-500">
            <div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
              {{ article.author?.charAt(0) || 'T' }}
            </div>
            <div>
              <p class="font-bold text-slate-800">{{ article.author || 'Tim Edukasi SehatSosial' }}</p>
              <p class="text-[11px] text-slate-400">{{ formatDisplayDate(article.publishedDate) }}</p>
            </div>
          </div>

          <!-- Featured Image -->
          <div class="rounded-2xl overflow-hidden bg-slate-100 h-64 sm:h-80 w-full">
            <img
              :src="article.image"
              :alt="article.title"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Summary callout -->
          <div class="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs sm:text-sm text-emerald-900 font-medium leading-relaxed italic">
            “{{ article.summary }}”
          </div>

          <!-- Body Text (Safe line break rendering, avoiding v-html for security) -->
          <div class="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-normal">
            {{ article.content }}
          </div>

          <!-- Medical Disclaimer Box -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 space-y-1">
            <div class="flex items-center gap-1.5 font-bold text-slate-700">
              <svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Disclaimer Medis Resmi:</span>
            </div>
            <p>
              Artikel SehatSosial disusun untuk tujuan edukasi dan peningkatan kesadaran hidup bersih sehat masyarakat. Informasi ini bukan diagnosis medis maupun anjuran resep obat. Apabila Anda atau anggota keluarga merasakan keluhan kesehatan yang berlanjut, harap segera berkonsultasi langsung ke Puskesmas, dokter, atau rumah sakit terdekat.
            </p>
          </div>
        </BaseCard>

        <!-- Related Articles -->
        <div v-if="relatedArticles.length > 0" class="space-y-3">
          <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Artikel Terkait Lainnya
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <router-link
              v-for="rel in relatedArticles"
              :key="rel.id"
              :to="`/edukasi/${rel.id}`"
              class="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-500 hover:shadow-card transition-all block group"
            >
              <span class="text-[10px] font-bold text-emerald-700 uppercase">{{ rel.category }}</span>
              <h4 class="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-emerald-700 transition-colors mt-1 line-clamp-2">
                {{ rel.title }}
              </h4>
            </router-link>
          </div>
        </div>
      </article>
    </div>
  </UserLayout>
</template>
