<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'neutral',
    validator: (v) => ['success', 'warning', 'danger', 'info', 'neutral', 'emerald', 'sky', 'purple'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (s) => ['sm', 'md'].includes(s)
  },
  dot: {
    type: Boolean,
    default: false
  }
})

const badgeClasses = computed(() => {
  switch (props.variant) {
    case 'success':
    case 'emerald':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
    case 'warning':
      return 'bg-amber-50 text-amber-700 border-amber-200/80'
    case 'danger':
      return 'bg-rose-50 text-rose-700 border-rose-200/80'
    case 'info':
    case 'sky':
      return 'bg-sky-50 text-sky-700 border-sky-200/80'
    case 'purple':
      return 'bg-purple-50 text-purple-700 border-purple-200/80'
    case 'neutral':
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200/70'
  }
})

const dotColor = computed(() => {
  switch (props.variant) {
    case 'success':
    case 'emerald':
      return 'bg-emerald-500'
    case 'warning':
      return 'bg-amber-500'
    case 'danger':
      return 'bg-rose-500'
    case 'info':
    case 'sky':
      return 'bg-sky-500'
    default:
      return 'bg-slate-400'
  }
})
</script>

<template>
  <span
    :class="[
      'inline-flex items-center font-medium border rounded-full transition-colors select-none',
      badgeClasses,
      size === 'sm' ? 'px-2 py-0.5 text-xs gap-1' : 'px-2.5 py-1 text-xs gap-1.5'
    ]"
  >
    <span v-if="dot" :class="['w-1.5 h-1.5 rounded-full', dotColor]"></span>
    <slot />
  </span>
</template>
