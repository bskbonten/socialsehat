<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'outline', 'danger', 'ghost'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (s) => ['sm', 'md', 'lg'].includes(s)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  },
  block: {
    type: Boolean,
    default: false
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow active:bg-emerald-800 focus:ring-emerald-500'
    case 'secondary':
      return 'bg-sky-600 hover:bg-sky-700 text-white shadow-sm hover:shadow active:bg-sky-800 focus:ring-sky-500'
    case 'outline':
      return 'border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 focus:ring-slate-400'
    case 'danger':
      return 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm hover:shadow active:bg-rose-800 focus:ring-rose-500'
    case 'ghost':
      return 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 focus:ring-slate-300'
    default:
      return 'bg-emerald-600 text-white'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-1.5 text-xs rounded-lg gap-1.5'
    case 'lg':
      return 'px-6 py-3 text-base rounded-xl gap-2.5 font-semibold'
    default:
      return 'px-4 py-2.5 text-sm rounded-xl gap-2 font-medium'
  }
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 select-none',
      variantClasses,
      sizeClasses,
      block ? 'w-full' : '',
      disabled || loading ? 'opacity-60 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
    ]"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <slot />
  </button>
</template>
