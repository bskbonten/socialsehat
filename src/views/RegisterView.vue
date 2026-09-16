<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useToastStore } from '@/stores/toastStore'
import PublicLayout from '@/layouts/PublicLayout.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'

const router = useRouter()
const authStore = useAuthStore()
const toastStore = useToastStore()

const isSubmitting = ref(false)

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const form = reactive({
  name: '',
  email: '',
  password: '',
  phone: '',
  address: '',
  bloodType: 'O+'
})

const errors = reactive({
  name: '',
  email: '',
  password: '',
  phone: '',
  address: '',
  general: ''
})

function validate() {
  let valid = true
  errors.name = ''
  errors.email = ''
  errors.password = ''
  errors.phone = ''
  errors.address = ''
  errors.general = ''

  if (!form.name.trim() || form.name.trim().length < 3) {
    errors.name = 'Nama lengkap minimal 3 karakter.'
    valid = false
  }

  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Format email tidak valid.'
    valid = false
  }

  if (!form.password || form.password.length < 6) {
    errors.password = 'Kata sandi minimal 6 karakter.'
    valid = false
  }

  if (!form.phone.trim() || form.phone.trim().length < 9) {
    errors.phone = 'Nomor telepon minimal 9 digit.'
    valid = false
  }

  if (!form.address.trim()) {
    errors.address = 'Alamat atau kelurahan wajib diisi.'
    valid = false
  }

  return valid
}

function handleRegister() {
  if (!validate()) return

  isSubmitting.value = true

  setTimeout(() => {
    const res = authStore.register({
      name: form.name,
      email: form.email,
      password: form.password,
      phone: form.phone,
      address: form.address,
      bloodType: form.bloodType
    })

    isSubmitting.value = false

    if (res.success) {
      toastStore.showToast(res.message, 'success')
      router.push('/dashboard')
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
      <div class="w-full max-w-lg space-y-6">
        <!-- Header -->
        <div class="text-center">
          <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">
            Daftar Akun Masyarakat
          </h2>
          <p class="text-xs text-slate-500 mt-1">
            Bergabung bersama ribuan warga dalam menjaga kesehatan lingkungan kita.
          </p>
        </div>

        <BaseCard padding="p-6 sm:p-7" class="border-slate-200/80">
          <div v-if="errors.general" class="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {{ errors.general }}
          </div>

          <form @submit.prevent="handleRegister" class="space-y-4">
            <BaseInput
              v-model="form.name"
              label="Nama Lengkap"
              placeholder="Contoh: Siti Rahmawati"
              :error="errors.name"
              required
            />

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <BaseInput
                v-model="form.email"
                type="email"
                label="Email"
                placeholder="nama@email.com"
                :error="errors.email"
                required
              />

              <BaseInput
                v-model="form.phone"
                type="tel"
                label="Nomor Telepon/WA"
                placeholder="0812-xxxx-xxxx"
                :error="errors.phone"
                required
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <BaseInput
                v-model="form.password"
                type="password"
                label="Kata Sandi"
                placeholder="Minimal 6 karakter"
                :error="errors.password"
                required
              />

              <BaseSelect
                v-model="form.bloodType"
                label="Golongan Darah"
                :options="bloodTypes"
                placeholder="Pilih Golongan Darah"
              />
            </div>

            <BaseInput
              v-model="form.address"
              label="Alamat Tempat Tinggal / Kelurahan"
              placeholder="Contoh: Jl. Melati No. 12, Kel. Sejahtera"
              :error="errors.address"
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
                Daftar Sebagai Masyarakat
              </BaseButton>
            </div>
          </form>

          <div class="mt-6 text-center text-xs text-slate-500">
            Sudah memiliki akun?
            <router-link to="/login" class="text-emerald-600 font-bold hover:underline ml-1">
              Masuk di sini
            </router-link>
          </div>
        </BaseCard>
      </div>
    </div>
  </PublicLayout>
</template>
