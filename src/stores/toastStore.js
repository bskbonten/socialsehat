import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref([])

  /**
   * Menampilkan toast notification
   * @param {string} message 
   * @param {'success'|'error'|'warning'|'info'} type 
   * @param {number} duration ms
   */
  function showToast(message, type = 'success', duration = 3500) {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
    const toast = { id, message, type }
    toasts.value.push(toast)

    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  function removeToast(id) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return {
    toasts,
    showToast,
    removeToast
  }
})
