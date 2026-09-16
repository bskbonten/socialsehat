<script setup>
defineProps({
  hover: {
    type: Boolean,
    default: false
  },
  padding: {
    type: String,
    default: 'p-5',
    validator: (p) => ['p-0', 'p-3', 'p-4', 'p-5', 'p-6', 'p-8'].includes(p)
  },
  border: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div
    :class="[
      'bg-white rounded-2xl transition-all duration-200 shadow-soft',
      border ? 'border border-slate-100/80' : '',
      hover ? 'hover:shadow-card hover:-translate-y-0.5' : '',
      padding
    ]"
  >
    <slot />
  </div>
</template>
