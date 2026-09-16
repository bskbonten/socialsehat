<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useToastStore } from '@/stores/toastStore'
import PublicLayout from '@/layouts/PublicLayout.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'

const router = useRouter()
const authStore = useAuthStore()
const toastStore = useToastStore()

const isSubmitting = ref(false)
const form = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: '',
  general: ''
})

function fillDemoAccount(role) {
  if (role === 'masyarakat') {
    form.email = 'user@sehatsosial.test'
    form.password = 'user123'
  } else {
    form.email = 'admin@sehatsosial.test'
    form.password = 'admin123'
  }
  errors.email = ''
  errors.password = ''
  errors.general = ''
}

function validate() {
  let valid = true
  errors.email = ''
  errors.password = ''
  errors.general = ''

  if (!form.email.trim()) {
    errors.email = 'Email wajib diisi.'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Format email tidak valid.'
    valid = false
  }

  if (!form.password) {
    errors.password = 'Kata sandi wajib diisi.'
    valid = false
  }

  return valid
}

function handleLogin() {
  if (!validate()) return

  isSubmitting.value = true

  setTimeout(() => {
    const res = authStore.login(form.email, form.password)
    isSubmitting.value = false

    if (res.success) {
      toastStore.showToast(res.message, 'success')
      if (res.user.role === 'admin') {
        router.push('/admin/dashboard')
      } else {
        router.push('/dashboard')
      }
    } else {
      errors.general = res.message
      toastStore.showToast(res.message, 'error')
    }
  }, 250)
}
</script>

<template>
  <PublicLayout>
    <div class="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
      <div class="w-full max-w-md space-y-6">
        <!-- Brand Header -->
        <div class="text-center">
          <div class="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/20 mb-3">
            <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">
            Masuk ke SehatSosial
          </h2>
          <p class="text-xs text-slate-500 mt-1">
            Pantau kesehatanmu, peduli lingkunganmu.
          </p>
        </div>

        <!-- Demo Account Quick Selector Card -->
        <BaseCard padding="p-4" class="border-emerald-100 bg-emerald-50/50">
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              Pilih Akun Demo (1-Klik):
            </span>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <button
              @click="fillDemoAccount('masyarakat')"
              type="button"
              class="p-2.5 rounded-xl bg-white border border-emerald-200/80 hover:border-emerald-400 text-left transition-all hover:shadow-xs group"
            >
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-800 group-hover:text-emerald-700">Masyarakat</span>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">Warga</span>
              </div>
              <p class="text-[10px] text-slate-400 mt-0.5 font-mono truncate">user@sehatsosial.test</p>
            </button>

            <button
              @click="fillDemoAccount('admin')"
              type="button"
              class="p-2.5 rounded-xl bg-white border border-sky-200/80 hover:border-sky-400 text-left transition-all hover:shadow-xs group"
            >
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-800 group-hover:text-sky-700">Admin</span>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-sky-100 text-sky-800">Petugas</span>
              </div>
              <p class="text-[10px] text-slate-400 mt-0.5 font-mono truncate">admin@sehatsosial.test</p>
            </button>
          </div>
          <p class="text-[10px] text-slate-400 text-center mt-2">
            *Demo MVP: Password masing-masing adalah <code class="bg-white px-1 rounded text-slate-600">user123</code> / <code class="bg-white px-1 rounded text-slate-600">admin123</code>.
          </p>
        </BaseCard>

        <!-- Login Form Card -->
        <BaseCard padding="p-6 sm:p-7" class="border-slate-200/80">
          <div v-if="errors.general" class="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {{ errors.general }}
          </div>

          <form @submit.prevent="handleLogin" class="space-y-4">
            <BaseInput
              v-model="form.email"
              type="email"
              label="Alamat Email"
              placeholder="nama@email.com"
              :error="errors.email"
              required
            />

            <BaseInput
              v-model="form.password"
              type="password"
              label="Kata Sandi"
              placeholder="••••••••"
              :error="errors.password"
              required
            />

            <div class="pt-2">
              <BaseButton
                type="submit"
                variant="primary"
                size="lg"
                :block="true"
                :loading="isSubmitting"
              >
                Masuk
              </BaseButton>
            </div>
          </form>

          <div class="mt-6 text-center text-xs text-slate-500">
            Belum memiliki akun warga?
            <router-link to="/register" class="text-emerald-600 font-bold hover:underline ml-1">
              Daftar Sekarang
            </router-link>
          </div>
        </BaseCard>
      </div>
    </div>
  </PublicLayout>
</template>
