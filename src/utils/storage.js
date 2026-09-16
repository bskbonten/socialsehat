/**
 * Utility helper untuk manajemen LocalStorage secara aman
 * Mencegah crash aplikasi apabila terjadi syntax error atau storage penuh
 */

const APP_PREFIX = 'sehatsosial_'

/**
 * Mengambil data dari localStorage dengan key tertentu
 * @param {string} key 
 * @param {any} fallback 
 * @returns {any}
 */
export function getStorage(key, fallback = null) {
  try {
    const raw = localStorage.getItem(APP_PREFIX + key)
    if (raw === null || raw === undefined) {
      return fallback
    }
    return JSON.parse(raw)
  } catch (error) {
    console.warn(`[Storage] Gagal membaca key "${key}":`, error)
    return fallback
  }
}

/**
 * Menyimpan data ke localStorage
 * @param {string} key 
 * @param {any} value 
 * @returns {boolean}
 */
export function setStorage(key, value) {
  try {
    localStorage.setItem(APP_PREFIX + key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`[Storage] Gagal menyimpan key "${key}":`, error)
    return false
  }
}

/**
 * Menghapus data dari localStorage
 * @param {string} key 
 */
export function removeStorage(key) {
  try {
    localStorage.removeItem(APP_PREFIX + key)
    return true
  } catch (error) {
    console.error(`[Storage] Gagal menghapus key "${key}":`, error)
    return false
  }
}

/**
 * Membersihkan semua data aplikasi dari localStorage
 */
export function clearAppStorage() {
  try {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(APP_PREFIX)) {
        localStorage.removeItem(key)
      }
    })
    return true
  } catch (error) {
    console.error('[Storage] Gagal membersihkan storage:', error)
    return false
  }
}
