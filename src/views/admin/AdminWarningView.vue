<script setup>
import { ref, reactive } from 'vue'
import { useAdminStore } from '@/stores/adminStore'
import { useToastStore } from '@/stores/toastStore'
import AdminLayout from '@/layouts/AdminLayout.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'

const adminStore = useAdminStore()
const toastStore = useToastStore()

const showModal = ref(false)

const levels = ['Info', 'Warning', 'Critical']

const form = reactive({
  title: '',
  level: 'Warning',
  region: '',
  date: new Date().toISOString().split('T')[0],
  description: '',
  actionRequired: ''
})

const errors = reactive({
  title: '',
  region: '',
  description: ''
})

function openCreateModal() {
  form.title = ''
  form.level = 'Warning'
  form.region = 'Kelurahan Sejahtera'
  form.date = new Date().toISOString().split('T')[0]
  form.description = ''
  form.actionRequired = 'Warga diimbau waspada dan menjaga kebersihan penampungan air.'
  errors.title = ''
  errors.region = ''
  errors.description = ''
  showModal.value = true
}

function handleCreateWarning() {
  errors.title = ''
  errors.region = ''
  errors.description = ''
  let valid = true

  if (!form.title.trim()) {
    errors.title = 'Judul peringatan wajib diisi.'
    valid = false
  }

  if (!form.region.trim()) {
    errors.region = 'Wilayah sasaran wajib diisi.'
    valid = false
  }

  if (!form.description.trim()) {
    errors.description = 'Deskripsi peringatan wajib diisi.'
    valid = false
  }

  if (!valid) return

  adminStore.addWarning({
    title: form.title,
    level: form.level,
    region: form.region,
    date: form.date,
    description: form.description,
    actionRequired: form.actionRequired
  })

  toastStore.showToast('✅ Early Warning berhasil diterbitkan dan disiarkan ke dashboard warga.', 'success')
  showModal.value = false
}

function handleToggleActive(id) {
  adminStore.toggleWarningActive(id)
  toastStore.showToast('Status aktif peringatan berhasil diperbarui.', 'info')
}

function handleDeleteWarning(id, title) {
  if (confirm(`Apakah Anda yakin ingin menghapus peringatan "${title}"?`)) {
    adminStore.deleteWarning(id)
    toastStore.showToast('Peringatan telah dihapus.', 'info')
  }
}
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">
            Sistem Peringatan Dini (Early Warning)
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">
            Siarkan peringatan potensi DBD, polusi debu, atau genangan air ke seluruh dashboard warga.
          </p>
        </div>

        <BaseButton @click="openCreateModal" variant="secondary" size="md">
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
          </svg>
          + Buat Early Warning Baru
        </BaseButton>
      </div>

      <!-- Info Banner -->
      <div class="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <span class="text-lg">📢</span>
        <div>
          <p class="font-bold">Mekanisme Early Warning:</p>
          <p class="mt-0.5 text-amber-800">
            Setiap peringatan dengan status <strong>Aktif</strong> akan otomatis ditampilkan pada kartu peringatan utama di dashboard masyarakat serta memicu notifikasi peringatan kesehatan.
          </p>
        </div>
      </div>

      <!-- Warnings List Cards -->
      <div class="space-y-4">
        <BaseCard
          v-for="warn in adminStore.warnings"
          :key="warn.id"
          padding="p-5 sm:p-6"
          :class="[
            'border-2 transition-all',
            warn.active ? 'border-slate-200 shadow-sm' : 'border-slate-100 opacity-60 bg-slate-50'
          ]"
        >
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2.5 flex-wrap">
              <BaseBadge
                :variant="warn.level === 'Critical' ? 'danger' : warn.level === 'Warning' ? 'warning' : 'info'"
                size="md"
              >
                {{ warn.level }}
              </BaseBadge>
              <span class="text-xs font-bold text-slate-800">
                Wilayah: {{ warn.region }}
              </span>
              <span class="text-[11px] text-slate-400">
                • {{ warn.date }}
              </span>
            </div>

            <div class="flex items-center gap-2">
              <button
                @click="handleToggleActive(warn.id)"
                type="button"
                :class="[
                  'px-3 py-1 rounded-xl text-xs font-bold transition-colors border',
                  warn.active
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                    : 'bg-slate-200 text-slate-600 border-slate-300 hover:bg-slate-300'
                ]"
              >
                {{ warn.active ? '● Sedang Aktif' : 'Non-aktif' }}
              </button>
              <button
                @click="handleDeleteWarning(warn.id, warn.title)"
                class="text-rose-600 hover:text-rose-800 text-xs font-bold p-1 hover:bg-rose-50 rounded"
                type="button"
              >
                Hapus
              </button>
            </div>
          </div>

          <div class="mt-3">
            <h3 class="font-bold text-slate-900 text-base">
              {{ warn.title }}
            </h3>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">
              {{ warn.description }}
            </p>

            <div v-if="warn.actionRequired" class="mt-3 p-2.5 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-100 flex items-center gap-2">
              <span class="font-bold text-emerald-700 flex-shrink-0">Imbauan:</span>
              <span>{{ warn.actionRequired }}</span>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Modal Create Warning -->
      <BaseModal
        :show="showModal"
        title="Terbitkan Peringatan Dini (Early Warning)"
        @close="showModal = false"
      >
        <form @submit.prevent="handleCreateWarning" class="space-y-4">
          <BaseInput
            v-model="form.title"
            label="Judul Peringatan"
            placeholder="Contoh: Peningkatan Risiko Genangan & Potensi DBD"
            :error="errors.title"
            required
          />

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BaseSelect
              v-model="form.level"
              label="Tingkat Peringatan"
              :options="levels"
              required
            />

            <BaseInput
              v-model="form.date"
              type="date"
              label="Tanggal Efektif"
              required
            />
          </div>

          <BaseInput
            v-model="form.region"
            label="Wilayah Terdampak"
            placeholder="Contoh: Kelurahan Sejahtera (RW 02 & RW 04)"
            :error="errors.region"
            required
          />

          <div>
            <label class="text-xs font-semibold text-slate-700 block mb-1.5">
              Deskripsi Situasi Lapangan <span class="text-rose-500">*</span>
            </label>
            <textarea
              v-model="form.description"
              rows="3"
              placeholder="Jelaskan temuan petugas atau indikator bahaya..."
              class="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-colors"
            ></textarea>
            <p v-if="errors.description" class="text-xs text-rose-500 mt-0.5">
              {{ errors.description }}
            </p>
          </div>

          <BaseInput
            v-model="form.actionRequired"
            label="Imbauan Tindakan Mandiri Warga"
            placeholder="Contoh: Periksa bak mandi dan lakukan PSN 3M Plus serentak."
          />
        </form>

        <template #footer>
          <BaseButton @click="showModal = false" variant="ghost" size="md">
            Batal
          </BaseButton>
          <BaseButton @click="handleCreateWarning" variant="secondary" size="md">
            Terbitkan Peringatan
          </BaseButton>
        </template>
      </BaseModal>
    </div>
  </AdminLayout>
</template>
