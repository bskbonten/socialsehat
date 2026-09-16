<script setup>
import { ref, reactive } from 'vue'
import { useEducationStore } from '@/stores/educationStore'
import { useToastStore } from '@/stores/toastStore'
import AdminLayout from '@/layouts/AdminLayout.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'

const educationStore = useEducationStore()
const toastStore = useToastStore()

const showModal = ref(false)
const isEditing = ref(false)
const editingId = ref(null)

const categories = [
  'Gaya Hidup',
  'Nutrisi',
  'Penyakit',
  'Kebersihan',
  'Kesehatan Mental',
  'Pertolongan Pertama'
]

const form = reactive({
  title: '',
  category: 'Gaya Hidup',
  summary: '',
  content: '',
  image: '',
  publishedDate: new Date().toISOString().split('T')[0]
})

const errors = reactive({
  title: '',
  summary: '',
  content: ''
})

function openAddModal() {
  isEditing.value = false
  editingId.value = null
  form.title = ''
  form.category = 'Gaya Hidup'
  form.summary = ''
  form.content = ''
  form.image = 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=80'
  form.publishedDate = new Date().toISOString().split('T')[0]
  errors.title = ''
  errors.summary = ''
  errors.content = ''
  showModal.value = true
}

function openEditModal(art) {
  isEditing.value = true
  editingId.value = art.id
  form.title = art.title
  form.category = art.category
  form.summary = art.summary
  form.content = art.content
  form.image = art.image
  form.publishedDate = art.publishedDate
  errors.title = ''
  errors.summary = ''
  errors.content = ''
  showModal.value = true
}

function handleSaveArticle() {
  errors.title = ''
  errors.summary = ''
  errors.content = ''
  let valid = true

  if (!form.title.trim()) {
    errors.title = 'Judul artikel wajib diisi.'
    valid = false
  }

  if (!form.summary.trim()) {
    errors.summary = 'Ringkasan artikel wajib diisi.'
    valid = false
  }

  if (!form.content.trim()) {
    errors.content = 'Isi artikel tidak boleh kosong.'
    valid = false
  }

  if (!valid) return

  if (isEditing.value) {
    educationStore.updateArticle(editingId.value, {
      title: form.title,
      category: form.category,
      summary: form.summary,
      content: form.content,
      image: form.image,
      publishedDate: form.publishedDate
    })
    toastStore.showToast('✅ Artikel berhasil diperbarui.', 'success')
  } else {
    educationStore.addArticle({
      title: form.title,
      category: form.category,
      summary: form.summary,
      content: form.content,
      image: form.image,
      publishedDate: form.publishedDate
    })
    toastStore.showToast('✅ Artikel baru berhasil ditambahkan.', 'success')
  }

  showModal.value = false
}

function handleDeleteArticle(id, title) {
  if (confirm(`Apakah Anda yakin ingin menghapus artikel "${title}"?`)) {
    educationStore.deleteArticle(id)
    toastStore.showToast('Artikel telah dihapus.', 'info')
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
            Kelola Artikel Edukasi Kesehatan
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">
            Tambah, sunting, dan publikasikan materi literasi kesehatan masyarakat.
          </p>
        </div>

        <BaseButton @click="openAddModal" variant="secondary" size="md">
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
          </svg>
          + Tambah Artikel Baru
        </BaseButton>
      </div>

      <!-- Articles Table Card -->
      <BaseCard padding="p-0" class="border-slate-200/80 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-600">
            <thead class="bg-slate-50 text-slate-700 uppercase text-[10px] font-bold border-b border-slate-100">
              <tr>
                <th class="px-5 py-3.5">Artikel</th>
                <th class="px-4 py-3.5">Kategori</th>
                <th class="px-4 py-3.5">Tanggal Terbit</th>
                <th class="px-4 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr
                v-for="art in educationStore.articles"
                :key="art.id"
                class="hover:bg-slate-50/70 transition-colors"
              >
                <td class="px-5 py-3.5 flex items-center gap-3">
                  <img
                    :src="art.image"
                    :alt="art.title"
                    class="w-12 h-12 rounded-xl object-cover flex-shrink-0 bg-slate-100"
                  />
                  <div class="min-w-0 max-w-md">
                    <p class="font-bold text-slate-900 truncate">{{ art.title }}</p>
                    <p class="text-[11px] text-slate-400 truncate mt-0.5">{{ art.summary }}</p>
                  </div>
                </td>
                <td class="px-4 py-3.5 whitespace-nowrap">
                  <span class="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold text-[10px]">
                    {{ art.category }}
                  </span>
                </td>
                <td class="px-4 py-3.5 whitespace-nowrap text-slate-500">
                  {{ art.publishedDate }}
                </td>
                <td class="px-4 py-3.5 text-right whitespace-nowrap space-x-2">
                  <button
                    @click="openEditModal(art)"
                    class="text-sky-600 hover:text-sky-800 font-bold p-1 rounded hover:bg-sky-50 transition-colors"
                    type="button"
                  >
                    Edit
                  </button>
                  <button
                    @click="handleDeleteArticle(art.id, art.title)"
                    class="text-rose-600 hover:text-rose-800 font-bold p-1 rounded hover:bg-rose-50 transition-colors"
                    type="button"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </BaseCard>

      <!-- Add / Edit Modal -->
      <BaseModal
        :show="showModal"
        :title="isEditing ? 'Sunting Artikel Edukasi' : 'Tambah Artikel Edukasi Baru'"
        @close="showModal = false"
      >
        <form @submit.prevent="handleSaveArticle" class="space-y-4">
          <BaseInput
            v-model="form.title"
            label="Judul Artikel"
            placeholder="Contoh: Mengenal Pola Hidup Sehat Lansia"
            :error="errors.title"
            required
          />

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BaseSelect
              v-model="form.category"
              label="Kategori"
              :options="categories"
              required
            />

            <BaseInput
              v-model="form.publishedDate"
              type="date"
              label="Tanggal Publikasi"
              required
            />
          </div>

          <BaseInput
            v-model="form.image"
            label="URL Gambar Sampul"
            placeholder="https://images.unsplash.com/..."
          />

          <div>
            <label class="text-xs font-semibold text-slate-700 block mb-1.5">
              Ringkasan Singkat <span class="text-rose-500">*</span>
            </label>
            <textarea
              v-model="form.summary"
              rows="2"
              placeholder="Tuliskan intisari artikel yang menarik..."
              class="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-colors"
            ></textarea>
            <p v-if="errors.summary" class="text-xs text-rose-500 mt-0.5">
              {{ errors.summary }}
            </p>
          </div>

          <div>
            <label class="text-xs font-semibold text-slate-700 block mb-1.5">
              Isi Lengkap Artikel <span class="text-rose-500">*</span>
            </label>
            <textarea
              v-model="form.content"
              rows="6"
              placeholder="Gunakan paragraf yang rapi dan informatif..."
              class="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-colors"
            ></textarea>
            <p v-if="errors.content" class="text-xs text-rose-500 mt-0.5">
              {{ errors.content }}
            </p>
          </div>
        </form>

        <template #footer>
          <BaseButton @click="showModal = false" variant="ghost" size="md">
            Batal
          </BaseButton>
          <BaseButton @click="handleSaveArticle" variant="secondary" size="md">
            {{ isEditing ? 'Simpan Perubahan' : 'Terbitkan Artikel' }}
          </BaseButton>
        </template>
      </BaseModal>
    </div>
  </AdminLayout>
</template>
