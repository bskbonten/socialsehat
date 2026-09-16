<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNotificationStore } from '@/stores/notificationStore'
import { useToastStore } from '@/stores/toastStore'
import UserLayout from '@/layouts/UserLayout.vue'
import NotificationItem from '@/components/notifications/NotificationItem.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()
const notifStore = useNotificationStore()
const toastStore = useToastStore()

const filterUnreadOnly = ref(false)

const displayedNotifications = computed(() => {
  if (filterUnreadOnly.value) {
    return notifStore.userNotifications.filter(n => !n.isRead)
  }
  return notifStore.userNotifications
})

function handleItemClick(notif) {
  notifStore.markAsRead(notif.id)
  if (notif.route) {
    router.push(notif.route)
  }
}

function handleMarkAllRead() {
  notifStore.markAllAsRead()
  toastStore.showToast('Semua notifikasi telah ditandai dibaca.', 'info')
}
</script>

<template>
  <UserLayout>
    <div class="max-w-3xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">
              Pemberitahuan
            </h1>
            <span
              v-if="notifStore.unreadCount > 0"
              class="px-2 py-0.5 text-xs font-bold bg-rose-100 text-rose-700 rounded-full"
            >
              {{ notifStore.unreadCount }} baru
            </span>
          </div>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">
            Status laporan, peringatan lingkungan wilayah, dan pengingat pemantauan.
          </p>
        </div>

        <!-- Mark all read action button -->
        <BaseButton
          v-if="notifStore.unreadCount > 0"
          @click="handleMarkAllRead"
          variant="outline"
          size="sm"
          class="self-start sm:self-auto"
        >
          Tandai Semua Sudah Dibaca
        </BaseButton>
      </div>

      <!-- Filters Filter Toggle -->
      <div class="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          @click="filterUnreadOnly = false"
          type="button"
          :class="[
            'px-3 py-1.5 text-xs font-bold rounded-lg transition-colors',
            !filterUnreadOnly ? 'bg-emerald-100 text-emerald-800' : 'text-slate-500 hover:text-slate-800'
          ]"
        >
          Semua ({{ notifStore.userNotifications.length }})
        </button>
        <button
          @click="filterUnreadOnly = true"
          type="button"
          :class="[
            'px-3 py-1.5 text-xs font-bold rounded-lg transition-colors',
            filterUnreadOnly ? 'bg-emerald-100 text-emerald-800' : 'text-slate-500 hover:text-slate-800'
          ]"
        >
          Belum Dibaca ({{ notifStore.unreadCount }})
        </button>
      </div>

      <!-- Notification List -->
      <div v-if="displayedNotifications.length > 0" class="space-y-3">
        <NotificationItem
          v-for="notif in displayedNotifications"
          :key="notif.id"
          :notification="notif"
          @click-item="handleItemClick"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
        <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
        <p class="text-sm font-bold text-slate-800">Tidak ada notifikasi</p>
        <p class="text-xs text-slate-500 mt-1">Anda sudah melihat seluruh pemberitahuan terbaru.</p>
      </div>
    </div>
  </UserLayout>
</template>
