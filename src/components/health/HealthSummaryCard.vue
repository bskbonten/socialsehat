<script setup>
import { computed } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'

const props = defineProps({
  latestRecord: {
    type: Object,
    required: true
  }
})

const statusBadgeVariant = computed(() => {
  switch (props.latestRecord?.statusCategory) {
    case 'Normal':
      return 'success'
    case 'Waspada':
      return 'warning'
    case 'Perlu Perhatian':
      return 'danger'
    default:
      return 'neutral'
  }
})
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
    <!-- Tekanan Darah -->
    <BaseCard padding="p-4" class="relative overflow-hidden border-slate-200/60">
      <div class="flex items-center justify-between text-slate-500 mb-2">
        <span class="text-xs font-semibold">Tekanan Darah</span>
        <div class="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
      </div>
      <div class="flex items-baseline gap-1">
        <span class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {{ latestRecord?.systolic || 120 }}/{{ latestRecord?.diastolic || 80 }}
        </span>
        <span class="text-[11px] font-medium text-slate-500">mmHg</span>
      </div>
      <p class="text-[11px] text-slate-400 mt-1 truncate">Sistolik / Diastolik</p>
    </BaseCard>

    <!-- Berat Badan -->
    <BaseCard padding="p-4" class="relative overflow-hidden border-slate-200/60">
      <div class="flex items-center justify-between text-slate-500 mb-2">
        <span class="text-xs font-semibold">Berat Badan</span>
        <div class="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        </div>
      </div>
      <div class="flex items-baseline gap-1">
        <span class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {{ latestRecord?.weight || 60 }}
        </span>
        <span class="text-[11px] font-medium text-slate-500">kg</span>
      </div>
      <p class="text-[11px] text-slate-400 mt-1 truncate">Massa tubuh terkini</p>
    </BaseCard>

    <!-- Suhu Tubuh -->
    <BaseCard padding="p-4" class="relative overflow-hidden border-slate-200/60">
      <div class="flex items-center justify-between text-slate-500 mb-2">
        <span class="text-xs font-semibold">Suhu Tubuh</span>
        <div class="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10" />
          </svg>
        </div>
      </div>
      <div class="flex items-baseline gap-1">
        <span class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {{ latestRecord?.temperature || 36.7 }}
        </span>
        <span class="text-[11px] font-medium text-slate-500">°C</span>
      </div>
      <p class="text-[11px] text-slate-400 mt-1 truncate">Termometer digital</p>
    </BaseCard>

    <!-- Status Umum -->
    <BaseCard padding="p-4" class="relative overflow-hidden border-slate-200/60">
      <div class="flex items-center justify-between text-slate-500 mb-2">
        <span class="text-xs font-semibold">Status Pantauan</span>
        <div class="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <div class="flex items-center mt-1">
        <BaseBadge :variant="statusBadgeVariant" size="md" :dot="true">
          {{ latestRecord?.statusCategory || 'Normal' }}
        </BaseBadge>
      </div>
      <p class="text-[10px] text-slate-400 mt-2 truncate">Berdasarkan data mandiri</p>
    </BaseCard>
  </div>
</template>
