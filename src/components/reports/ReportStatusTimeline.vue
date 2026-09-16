<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentStatus: {
    type: String,
    required: true
  },
  timeline: {
    type: Array,
    default: () => []
  }
})

const steps = [
  { key: 'Dikirim', label: 'Dikirim', desc: 'Laporan diterima sistem' },
  { key: 'Diproses', label: 'Diproses', desc: 'Diverifikasi petugas wilayah' },
  { key: 'Ditangani', label: 'Ditangani', desc: 'Tindakan lapangan dilakukan' },
  { key: 'Selesai', label: 'Selesai', desc: 'Masalah tuntas terselesaikan' }
]

const currentStepIndex = computed(() => {
  const index = steps.findIndex(s => s.key === props.currentStatus)
  return index !== -1 ? index : 0
})

function formatDateTime(isoStr) {
  if (!isoStr) return ''
  const d = new Date(isoStr)
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getStepTimelineEntry(stepKey) {
  return props.timeline.find(t => t.status === stepKey)
}
</script>

<template>
  <div class="py-3">
    <!-- Horizontal Step Progress (Desktop & Tablet) -->
    <div class="hidden sm:block">
      <div class="relative flex items-center justify-between">
        <!-- Background Track Line -->
        <div class="absolute left-6 right-6 top-4 h-1 bg-slate-200 -z-0"></div>
        <!-- Active Progress Line -->
        <div
          class="absolute left-6 top-4 h-1 bg-emerald-500 -z-0 transition-all duration-500"
          :style="{ width: `${(currentStepIndex / (steps.length - 1)) * 88}%` }"
        ></div>

        <!-- Step Markers -->
        <div
          v-for="(step, idx) in steps"
          :key="step.key"
          class="relative z-10 flex flex-col items-center text-center"
        >
          <!-- Circle Marker -->
          <div
            :class="[
              'w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 shadow-xs',
              idx <= currentStepIndex
                ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                : 'bg-white text-slate-400 border-2 border-slate-300'
            ]"
          >
            <svg v-if="idx < currentStepIndex" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
            <span v-else>{{ idx + 1 }}</span>
          </div>

          <!-- Label -->
          <span
            :class="[
              'mt-2 text-xs font-bold transition-colors',
              idx <= currentStepIndex ? 'text-emerald-800' : 'text-slate-400'
            ]"
          >
            {{ step.label }}
          </span>

          <!-- Timestamp if available -->
          <span
            v-if="getStepTimelineEntry(step.key)"
            class="text-[10px] text-slate-400 mt-0.5"
          >
            {{ formatDateTime(getStepTimelineEntry(step.key)?.date) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Vertical Timeline (Mobile 360px - 414px) -->
    <div class="sm:hidden space-y-4">
      <div
        v-for="(step, idx) in steps"
        :key="step.key"
        class="flex items-start gap-3 relative"
      >
        <!-- Vertical connector line -->
        <div
          v-if="idx < steps.length - 1"
          :class="[
            'absolute left-3.5 top-7 bottom-0 w-0.5 -mb-4',
            idx < currentStepIndex ? 'bg-emerald-500' : 'bg-slate-200'
          ]"
        ></div>

        <!-- Indicator dot -->
        <div
          :class="[
            'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 z-10',
            idx <= currentStepIndex
              ? 'bg-emerald-600 text-white ring-2 ring-emerald-100'
              : 'bg-white text-slate-400 border border-slate-300'
          ]"
        >
          <svg v-if="idx < currentStepIndex" class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
          <span v-else>{{ idx + 1 }}</span>
        </div>

        <!-- Step content -->
        <div class="flex-1 min-w-0 pt-0.5">
          <div class="flex items-center justify-between">
            <span
              :class="[
                'text-xs font-bold',
                idx <= currentStepIndex ? 'text-slate-900' : 'text-slate-400'
              ]"
            >
              {{ step.label }}
            </span>
            <span
              v-if="getStepTimelineEntry(step.key)"
              class="text-[10px] text-slate-400 font-medium"
            >
              {{ formatDateTime(getStepTimelineEntry(step.key)?.date) }}
            </span>
          </div>
          <p class="text-[11px] text-slate-500 mt-0.5">
            {{ getStepTimelineEntry(step.key)?.note || step.desc }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
