import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { initialUsers } from '@/data/users'
import { getStorage, setStorage, removeStorage } from '@/utils/storage'

export const useAuthStore = defineStore('auth', () => {
  // Load initial users from storage or fallback
  const users = ref(getStorage('users', initialUsers))
  
  // Current active user
  const currentUser = ref(getStorage('current_user', initialUsers[0])) // Default to user-001 for easy preview, or null if logged out

  const isAuthenticated = computed(() => !!currentUser.value)
  const isAdmin = computed(() => currentUser.value?.role === 'admin')
  const isMasyarakat = computed(() => currentUser.value?.role === 'masyarakat')

  // Simpan data user ke storage bila belum ada
  if (!getStorage('users')) {
    setStorage('users', users.value)
  }

  /**
   * Login pengguna berdasarkan email dan password
   * @param {string} email 
   * @param {string} password 
   */
  function login(email, password) {
    const trimmedEmail = (email || '').trim().toLowerCase()
    const user = users.value.find(u => u.email.toLowerCase() === trimmedEmail && u.password === password)

    if (!user) {
      return {
        success: false,
        message: 'Email atau kata sandi tidak cocok. Silakan coba lagi.'
      }
    }

    currentUser.value = { ...user }
    setStorage('current_user', currentUser.value)

    return {
      success: true,
      user: currentUser.value,
      message: `Selamat datang kembali, ${user.name}!`
    }
  }

  /**
   * Registrasi masyarakat baru
   * @param {Object} userData 
   */
  function register(userData) {
    const emailExists = users.value.some(u => u.email.toLowerCase() === userData.email.trim().toLowerCase())
    if (emailExists) {
      return {
        success: false,
        message: 'Email sudah terdaftar. Silakan gunakan email lain atau langsung masuk.'
      }
    }

    const newUser = {
      id: `user-${Date.now().toString().slice(-4)}`,
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      password: userData.password,
      role: 'masyarakat',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      phone: userData.phone || '0812-0000-0000',
      address: userData.address || 'Kota Jakarta',
      joinedDate: new Date().toISOString().split('T')[0],
      bloodType: userData.bloodType || 'O+',
      birthDate: userData.birthDate || '2000-01-01'
    }

    users.value.push(newUser)
    setStorage('users', users.value)

    currentUser.value = { ...newUser }
    setStorage('current_user', currentUser.value)

    return {
      success: true,
      user: newUser,
      message: 'Pendaftaran berhasil! Selamat datang di SehatSosial.'
    }
  }

  /**
   * Logout pengguna
   */
  function logout() {
    currentUser.value = null
    removeStorage('current_user')
  }

  /**
   * Update profil pengguna yang sedang aktif
   * @param {Object} updatedFields 
   */
  function updateProfile(updatedFields) {
    if (!currentUser.value) return false

    const index = users.value.findIndex(u => u.id === currentUser.value.id)
    if (index !== -1) {
      users.value[index] = {
        ...users.value[index],
        ...updatedFields
      }
      setStorage('users', users.value)
    }

    currentUser.value = {
      ...currentUser.value,
      ...updatedFields
    }
    setStorage('current_user', currentUser.value)

    return true
  }

  return {
    users,
    currentUser,
    isAuthenticated,
    isAdmin,
    isMasyarakat,
    login,
    register,
    logout,
    updateProfile
  }
})
