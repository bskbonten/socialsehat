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
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  helper: {
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
  },
  suffix: {
    type: String,
    default: ''
  },
  min: {
    type: [String, Number],
    default: undefined
  },
  max: {
    type: [String, Number],
    default: undefined
  },
  step: {
    type: [String, Number],
    default: undefined
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="w-full flex flex-col gap-1.5">
    <label v-if="label" class="text-xs font-semibold text-slate-700 flex items-center justify-between">
      <span>
        {{ label }}
        <span v-if="required" class="text-rose-500 font-bold ml-0.5">*</span>
      </span>
      <span v-if="helper" class="text-slate-400 font-normal">{{ helper }}</span>
    </label>

    <div class="relative flex items-center">
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :min="min"
        :max="max"
        :step="step"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="[
          'w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl text-slate-800 placeholder-slate-400 transition-colors focus:outline-none focus:ring-2',
          error 
            ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200' 
            : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100',
          disabled ? 'bg-slate-50 text-slate-400 cursor-not-allowed' : '',
          suffix ? 'pr-12' : ''
        ]"
      />
      <div v-if="suffix" class="absolute right-3.5 text-xs font-medium text-slate-400 pointer-events-none select-none">
        {{ suffix }}
      </div>
    </div>

    <p v-if="error" class="text-xs text-rose-500 font-medium mt-0.5">
      {{ error }}
    </p>
  </div>
</template>
