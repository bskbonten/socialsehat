<script setup>
import BaseCard from '@/components/ui/BaseCard.vue'

defineProps({
  article: {
    type: Object,
    required: true
  }
})

function formatDisplayDate(dateStr) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<template>
  <router-link :to="`/edukasi/${article.id}`" class="block group h-full">
    <BaseCard padding="p-0" :hover="true" class="border-slate-200/80 overflow-hidden flex flex-col h-full">
      <!-- Article Cover Image -->
      <div class="h-44 w-full bg-slate-100 relative overflow-hidden flex-shrink-0">
        <img
          :src="article.image"
          :alt="article.title"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div class="absolute top-3 left-3">
          <span class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-white/90 text-emerald-800 backdrop-blur-xs shadow-xs">
            {{ article.category }}
          </span>
        </div>
      </div>

      <!-- Content Area -->
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <!-- Title -->
          <h3 class="font-bold text-slate-900 text-sm sm:text-base group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
            {{ article.title }}
          </h3>

          <!-- Summary -->
          <p class="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
            {{ article.summary }}
          </p>
        </div>

        <!-- Meta Footer & Action -->
        <div class="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <div class="flex items-center gap-2">
            <span>{{ formatDisplayDate(article.publishedDate) }}</span>
            <span>•</span>
            <span>{{ article.readTime || '3 min' }}</span>
          </div>
          <span class="text-emerald-600 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            Baca
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </BaseCard>
  </router-link>
</template>
