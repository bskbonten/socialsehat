<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (t) => ['info', 'warning', 'danger', 'success'].includes(t)
  },
  title: {
    type: String,
    default: ''
  },
  dismissible: {
    type: Boolean,
    default: false
  }
})

defineEmits(['dismiss'])

const alertClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
    case 'warning':
      return 'bg-amber-50/80 border-amber-200 text-amber-900'
    case 'danger':
      return 'bg-rose-50/80 border-rose-200 text-rose-900'
    case 'info':
    default:
      return 'bg-sky-50/80 border-sky-200 text-sky-900'
  }
})

const iconColor = computed(() => {
  switch (props.type) {
    case 'success':
      return 'text-emerald-600'
    case 'warning':
      return 'text-amber-600'
    case 'danger':
      return 'text-rose-600'
    case 'info':
    default:
      return 'text-sky-600'
  }
})
</script>

<template>
  <div
    :class="[
      'flex items-start gap-3 p-4 rounded-2xl border text-sm',
      alertClasses
    ]"
    role="alert"
  >
    <!-- Icon -->
    <div :class="['flex-shrink-0 mt-0.5', iconColor]">
      <!-- Warning icon -->
      <svg v-if="type === 'warning'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <!-- Danger icon -->
      <svg v-else-if="type === 'danger'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <!-- Success icon -->
      <svg v-else-if="type === 'success'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <!-- Info icon -->
      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <h4 v-if="title" class="font-semibold mb-0.5 text-sm">
        {{ title }}
      </h4>
      <div class="text-xs leading-relaxed opacity-95">
        <slot />
      </div>
    </div>

    <!-- Dismiss Button -->
    <button
      v-if="dismissible"
      @click="$emit('dismiss')"
      type="button"
      class="text-slate-400 hover:text-slate-600 p-1 -mr-1 -mt-1 rounded-lg"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
