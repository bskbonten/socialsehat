<script setup>
import { computed } from 'vue'

const props = defineProps({
  notification: {
    type: Object,
    required: true
  }
})

defineEmits(['click-item'])

const typeConfig = computed(() => {
  switch (props.notification.type) {
    case 'status_laporan':
      return {
        bgColor: 'bg-sky-100 text-sky-700',
        icon: 'report'
      }
    case 'warning_kesehatan':
      return {
        bgColor: 'bg-amber-100 text-amber-700',
        icon: 'warning'
      }
    case 'reminder_monitoring':
      return {
        bgColor: 'bg-emerald-100 text-emerald-700',
        icon: 'heart'
      }
    case 'artikel_baru':
      return {
        bgColor: 'bg-purple-100 text-purple-700',
        icon: 'book'
      }
    case 'info_lingkungan':
    default:
      return {
        bgColor: 'bg-slate-100 text-slate-700',
        icon: 'info'
      }
  }
})

function formatTimeAgo(isoStr) {
  if (!isoStr) return ''
  const date = new Date(isoStr)
  const diffHours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60))
  if (diffHours < 1) return 'Baru saja'
  if (diffHours < 24) return `${diffHours} jam lalu`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays === 1) return 'Kemarin'
  return `${diffDays} hari lalu`
}
</script>

<template>
  <div
    @click="$emit('click-item', notification)"
    :class="[
      'flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer',
      notification.isRead
        ? 'bg-white border-slate-100 opacity-80 hover:opacity-100 hover:bg-slate-50/70'
        : 'bg-emerald-50/30 border-emerald-100 hover:bg-emerald-50/60 shadow-xs'
    ]"
  >
    <!-- Icon Avatar -->
    <div :class="['w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5', typeConfig.bgColor]">
      <!-- Report icon -->
      <svg v-if="typeConfig.icon === 'report'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <!-- Warning icon -->
      <svg v-else-if="typeConfig.icon === 'warning'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <!-- Heart icon -->
      <svg v-else-if="typeConfig.icon === 'heart'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <!-- Book icon -->
      <svg v-else-if="typeConfig.icon === 'book'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
      <!-- Info default -->
      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>

    <!-- Notification Details -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between gap-2">
        <h4 class="text-xs sm:text-sm font-bold text-slate-900 truncate">
          {{ notification.title }}
        </h4>
        <span class="text-[10px] text-slate-400 whitespace-nowrap flex-shrink-0">
          {{ formatTimeAgo(notification.createdAt) }}
        </span>
      </div>

      <p class="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
        {{ notification.message }}
      </p>
    </div>

    <!-- Unread Dot -->
    <div v-if="!notification.isRead" class="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0 self-center"></div>
  </div>
</template>
