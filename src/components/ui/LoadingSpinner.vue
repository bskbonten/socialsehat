<script setup>
defineProps({
  text: {
    type: String,
    default: 'Memuat data...'
  },
  size: {
    type: String,
    default: 'md'
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
    <div
      :class="[
        'animate-spin rounded-full border-solid border-slate-200 border-t-emerald-600',
        size === 'sm' ? 'w-6 h-6 border-2' : size === 'lg' ? 'w-12 h-12 border-4' : 'w-8 h-8 border-3'
      ]"
    ></div>
    <p v-if="text" class="mt-3 text-xs font-medium text-slate-500">
      {{ text }}
    </p>
  </div>
</template>
