<script setup>
import { computed } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'

const props = defineProps({
  report: {
    type: Object,
    required: true
  }
})

const statusBadge = computed(() => {
  switch (props.report.status) {
    case 'Selesai':
      return { variant: 'success', text: 'Selesai' }
    case 'Ditangani':
      return { variant: 'sky', text: 'Ditangani' }
    case 'Diproses':
      return { variant: 'warning', text: 'Diproses' }
    case 'Dikirim':
    default:
      return { variant: 'neutral', text: 'Dikirim' }
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
  <router-link :to="`/laporan/${report.id}`" class="block group">
    <BaseCard padding="p-4 sm:p-5" :hover="true" class="border-slate-200/80 flex flex-col sm:flex-row gap-4">
      <!-- Thumbnail Photo -->
      <div class="sm:w-36 sm:h-28 h-40 w-full rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 relative">
        <img
          :src="report.photo"
          :alt="report.title"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div class="absolute top-2 left-2 sm:hidden">
          <BaseBadge :variant="statusBadge.variant" size="sm" :dot="true">
            {{ statusBadge.text }}
          </BaseBadge>
        </div>
      </div>

      <!-- Info Details -->
      <div class="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <!-- Categories & Status (Desktop view) -->
          <div class="flex items-center justify-between gap-2 mb-1.5">
            <span class="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
              {{ report.category }}
            </span>
            <div class="hidden sm:block">
              <BaseBadge :variant="statusBadge.variant" size="sm" :dot="true">
                {{ statusBadge.text }}
              </BaseBadge>
            </div>
          </div>

          <!-- Title -->
          <h4 class="font-bold text-slate-900 text-sm sm:text-base group-hover:text-emerald-700 transition-colors line-clamp-1">
            {{ report.title }}
          </h4>

          <!-- Description snippet -->
          <p class="text-xs text-slate-500 mt-1 line-clamp-2">
            {{ report.description }}
          </p>
        </div>

        <!-- Location & Date Footer -->
        <div class="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 text-[11px] text-slate-400">
          <div class="flex items-center gap-1.5 truncate max-w-[220px]">
            <svg class="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="truncate">{{ report.location }}</span>
          </div>
          <span class="flex-shrink-0">{{ formatDisplayDate(report.createdAt) }}</span>
        </div>
      </div>
    </BaseCard>
  </router-link>
</template>
