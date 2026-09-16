<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => [] // Array of string or { label, value }
  },
  placeholder: {
    type: String,
    default: 'Pilih opsi...'
  },
  error: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="w-full flex flex-col gap-1.5">
    <label v-if="label" class="text-xs font-semibold text-slate-700">
      {{ label }}
      <span v-if="required" class="text-rose-500 font-bold ml-0.5">*</span>
    </label>

    <div class="relative">
      <select
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        @change="$emit('update:modelValue', $event.target.value)"
        :class="[
          'w-full appearance-none px-3.5 py-2.5 pr-10 text-sm bg-white border rounded-xl text-slate-800 transition-colors focus:outline-none focus:ring-2 cursor-pointer',
          error 
            ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200' 
            : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100',
          disabled ? 'bg-slate-50 text-slate-400 cursor-not-allowed' : ''
        ]"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option
          v-for="(opt, idx) in options"
          :key="idx"
          :value="typeof opt === 'object' ? opt.value : opt"
        >
          {{ typeof opt === 'object' ? opt.label : opt }}
        </option>
      </select>
      <div class="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <p v-if="error" class="text-xs text-rose-500 font-medium mt-0.5">
      {{ error }}
    </p>
  </div>
</template>
