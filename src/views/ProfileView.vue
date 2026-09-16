<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useHealthStore } from '@/stores/healthStore'
import { useReportStore } from '@/stores/reportStore'
import { useToastStore } from '@/stores/toastStore'
import UserLayout from '@/layouts/UserLayout.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'

const router = useRouter()
const authStore = useAuthStore()
const healthStore = useHealthStore()
const reportStore = useReportStore()
const toastStore = useToastStore()

const showEditModal = ref(false)
const showSettingsModal = ref(false)

const editForm = reactive({
  name: '',
  phone: '',
  address: '',
  bloodType: 'O+'
})

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

function openEditModal() {
  const u = authStore.currentUser
  editForm.name = u?.name || ''
  editForm.phone = u?.phone || ''
  editForm.address = u?.address || ''
  editForm.bloodType = u?.bloodType || 'O+'
  showEditModal.value = true
}

function handleSaveProfile() {
  if (!editForm.name.trim()) {
    toastStore.showToast('Nama tidak boleh kosong.', 'error')
    return
  }

  authStore.updateProfile({
    name: editForm.name.trim(),
    phone: editForm.phone.trim(),
    address: editForm.address.trim(),
    bloodType: editForm.bloodType
  })

  toastStore.showToast('✅ Data profil berhasil diperbarui.', 'success')
  showEditModal.value = false
}

function handleLogout() {
  authStore.logout()
  toastStore.showToast('Anda telah keluar dari akun.', 'info')
  router.push('/login')
}

// Helper untuk kemudahan pengujian: Ganti akun langsung
function switchRoleDemo(role) {
  if (role === 'admin') {
    authStore.login('admin@sehatsosial.test', 'admin123')
    router.push('/admin/dashboard')
  } else {
    authStore.login('user@sehatsosial.test', 'user123')
    router.push('/dashboard')
  }
}

function formatDisplayDate(dateStr) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<template>
  <UserLayout>
    <div class="max-w-3xl mx-auto space-y-6">
      <!-- Profile Header Card -->
      <BaseCard padding="p-6 sm:p-7" class="border-slate-200/80">
        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <div class="relative">
            <img
              :src="authStore.currentUser?.avatar"
              alt="Profile"
              class="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-emerald-100 shadow-sm"
            />
            <span class="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white"></span>
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight truncate">
                  {{ authStore.currentUser?.name }}
                </h1>
                <p class="text-xs text-slate-500 mt-0.5">{{ authStore.currentUser?.email }}</p>
              </div>

              <BaseButton @click="openEditModal" variant="outline" size="sm">
                <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit Profil
              </BaseButton>
            </div>

            <!-- Profile Badges & Meta -->
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mt-4 text-xs">
              <span class="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200/70">
                Warga Terverifikasi
              </span>
              <span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                Gol. Darah: <strong>{{ authStore.currentUser?.bloodType || 'O+' }}</strong>
              </span>
              <span class="text-slate-400">
                Bergabung sejak {{ formatDisplayDate(authStore.currentUser?.joinedDate) }}
              </span>
            </div>

            <!-- Address snippet -->
            <div class="mt-3 text-xs text-slate-600 flex items-center justify-center sm:justify-start gap-1.5">
              <svg class="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{{ authStore.currentUser?.address || 'Jakarta Selatan' }}</span>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Stats Summary -->
      <div class="grid grid-cols-2 gap-4">
        <BaseCard padding="p-4" class="border-slate-200/80 text-center">
          <p class="text-xs text-slate-400">Monitoring Kesehatan</p>
          <p class="text-xl font-bold text-slate-900 mt-0.5">{{ healthStore.userRecords.length }} Kali</p>
          <router-link to="/monitoring" class="text-[11px] text-emerald-600 font-bold hover:underline mt-1 block">
            Buka Riwayat →
          </router-link>
        </BaseCard>

        <BaseCard padding="p-4" class="border-slate-200/80 text-center">
          <p class="text-xs text-slate-400">Laporan Masyarakat</p>
          <p class="text-xl font-bold text-slate-900 mt-0.5">{{ reportStore.myReports.length }} Laporan</p>
          <router-link to="/laporan" class="text-[11px] text-sky-600 font-bold hover:underline mt-1 block">
            Buka Laporan →
          </router-link>
        </BaseCard>
      </div>

      <!-- Main Menu Navigation List -->
      <BaseCard padding="p-2" class="border-slate-200/80 divide-y divide-slate-100">
        <!-- Riwayat Monitoring -->
        <router-link to="/monitoring" class="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors rounded-xl group">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p class="text-xs font-bold text-slate-800 group-hover:text-emerald-700">Riwayat Monitoring</p>
              <p class="text-[11px] text-slate-400">Catatan tekanan darah, suhu, dan grafik tren</p>
            </div>
          </div>
          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>

        <!-- Riwayat Laporan -->
        <router-link to="/laporan" class="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors rounded-xl group">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p class="text-xs font-bold text-slate-800 group-hover:text-sky-700">Riwayat Laporan Masyarakat</p>
              <p class="text-[11px] text-slate-400">Status perkembangan penanganan kendala lingkungan</p>
            </div>
          </div>
          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>

        <!-- Pengaturan Aplikasi -->
        <button
          @click="showSettingsModal = true"
          type="button"
          class="w-full flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors rounded-xl group text-left"
        >
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p class="text-xs font-bold text-slate-800 group-hover:text-amber-700">Pengaturan Akun & Notifikasi</p>
              <p class="text-[11px] text-slate-400">Preferensi notifikasi dan informasi aplikasi</p>
            </div>
          </div>
          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Switch Role Helper (For Easy Testing) -->
        <div class="p-3.5 bg-slate-50/70 rounded-xl flex items-center justify-between">
          <div>
            <p class="text-xs font-bold text-slate-700">Ganti Akun Demo Pengujian:</p>
            <p class="text-[10px] text-slate-400">Mudah berpindah role tanpa input manual</p>
          </div>
          <div class="flex gap-2">
            <button
              @click="switchRoleDemo('admin')"
              type="button"
              class="px-3 py-1.5 text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors"
            >
              Mode Admin
            </button>
            <button
              @click="switchRoleDemo('masyarakat')"
              type="button"
              class="px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
            >
              Mode Warga
            </button>
          </div>
        </div>

        <!-- Logout Button -->
        <div class="p-3.5">
          <button
            @click="handleLogout"
            type="button"
            class="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-xs transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Keluar dari Akun (Logout)
          </button>
        </div>
      </BaseCard>

      <!-- Edit Profile Modal -->
      <BaseModal
        :show="showEditModal"
        title="Ubah Data Profil"
        @close="showEditModal = false"
      >
        <form @submit.prevent="handleSaveProfile" class="space-y-4">
          <BaseInput
            v-model="editForm.name"
            label="Nama Lengkap"
            required
          />

          <BaseInput
            v-model="editForm.phone"
            label="Nomor Telepon/WA"
            required
          />

          <BaseSelect
            v-model="editForm.bloodType"
            label="Golongan Darah"
            :options="bloodTypes"
          />

          <BaseInput
            v-model="editForm.address"
            label="Alamat Tempat Tinggal"
            required
          />
        </form>

        <template #footer>
          <BaseButton @click="showEditModal = false" variant="ghost" size="md">
            Batal
          </BaseButton>
          <BaseButton @click="handleSaveProfile" variant="primary" size="md">
            Simpan Perubahan
          </BaseButton>
        </template>
      </BaseModal>

      <!-- Settings Modal -->
      <BaseModal
        :show="showSettingsModal"
        title="Pengaturan Aplikasi"
        @close="showSettingsModal = false"
      >
        <div class="space-y-4 text-xs">
          <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div>
              <p class="font-bold text-slate-800">Notifikasi Early Warning Wilayah</p>
              <p class="text-[11px] text-slate-400">Terima pemberitahuan risiko lingkungan dan DBD</p>
            </div>
            <input type="checkbox" checked class="accent-emerald-600 w-4 h-4 cursor-pointer" />
          </div>

          <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div>
              <p class="font-bold text-slate-800">Pengingat Monitoring Rutin</p>
              <p class="text-[11px] text-slate-400">Kirim pengingat setiap 2 hari</p>
            </div>
            <input type="checkbox" checked class="accent-emerald-600 w-4 h-4 cursor-pointer" />
          </div>

          <div class="p-3 rounded-xl border border-slate-200 text-slate-500">
            <p class="font-bold text-slate-800 mb-1">Tentang SehatSosial</p>
            <p>Versi: 1.0.0 (MVP Release)</p>
            <p class="mt-1">Penyimpanan: Web LocalStorage Terenkapsulasi</p>
          </div>
        </div>

        <template #footer>
          <BaseButton @click="showSettingsModal = false" variant="primary" size="md">
            Tutup
          </BaseButton>
        </template>
      </BaseModal>
    </div>
  </UserLayout>
</template>
