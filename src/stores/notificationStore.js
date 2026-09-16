import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { initialNotifications } from '@/data/notifications'
import { getStorage, setStorage } from '@/utils/storage'
import { useAuthStore } from './authStore'

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref(getStorage('notifications', initialNotifications))

  if (!getStorage('notifications')) {
    setStorage('notifications', notifications.value)
  }

  const authStore = useAuthStore()

  // Notifikasi untuk pengguna yang sedang login (atau notifikasi umum jika targetnya matching)
  const userNotifications = computed(() => {
    const currentUserId = authStore.currentUser?.id
    return notifications.value
      .filter(n => !n.userId || n.userId === currentUserId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  })

  // Jumlah yang belum dibaca
  const unreadCount = computed(() => {
    return userNotifications.value.filter(n => !n.isRead).length
  })

  /**
   * Tandai 1 notifikasi sebagai sudah dibaca
   * @param {string} id 
   */
  function markAsRead(id) {
    const notif = notifications.value.find(n => n.id === id)
    if (notif && !notif.isRead) {
      notif.isRead = true
      setStorage('notifications', notifications.value)
    }
  }

  /**
   * Tandai semua notifikasi pengguna sebagai sudah dibaca
   */
  function markAllAsRead() {
    const currentUserId = authStore.currentUser?.id
    notifications.value.forEach(n => {
      if (!n.userId || n.userId === currentUserId) {
        n.isRead = true
      }
    })
    setStorage('notifications', notifications.value)
  }

  /**
   * Tambah notifikasi baru ke daftar
   * @param {Object} notif 
   */
  function addNotification(notif) {
    const newNotif = {
      id: `notif-${Date.now().toString().slice(-4)}`,
      userId: notif.userId || authStore.currentUser?.id,
      title: notif.title,
      message: notif.message,
      type: notif.type || 'info_lingkungan',
      targetId: notif.targetId || null,
      route: notif.route || '/notifikasi',
      isRead: false,
      createdAt: new Date().toISOString()
    }

    notifications.value.unshift(newNotif)
    setStorage('notifications', notifications.value)
    return newNotif
  }

  return {
    notifications,
    userNotifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification
  }
})
