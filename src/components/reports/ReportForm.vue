<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useReportStore } from '@/stores/reportStore'
import { useToastStore } from '@/stores/toastStore'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'

const router = useRouter()
const reportStore = useReportStore()
const toastStore = useToastStore()

const isSubmitting = ref(false)
const photoPreview = ref('')
const fileInput = ref(null)

const categories = [
  'Sampah',
  'Genangan Air',
  'Sanitasi',
  'Lingkungan',
  'Penyakit',
  'Kualitas Air',
  'Lainnya'
]

const form = reactive({
  title: '',
  category: '',
  location: '',
  description: '',
  photo: ''
})

const errors = reactive({
  title: '',
  category: '',
  location: '',
  description: '',
  photo: ''
})

// Mock presets for easy quick-fill testing in mobile/desktop
const quickTemplates = [
  {
    title: 'Genangan air pasca hujan di selokan RT',
    category: 'Genangan Air',
    location: 'Jl. Melati RT 03',
    description: 'Saluran air tersumbat sampah daun dan air tergenang berpotensi sarang nyamuk.'
  },
  {
    title: 'Tumpukan sampah belum diangkut',
    category: 'Sampah',
    location: 'Dekat Pos Ronda RW 01',
    description: 'Sampah warga menumpuk selama 3 hari dan mulai berbau tidak sedap.'
  }
]

function applyTemplate(tmpl) {
  form.title = tmpl.title
  form.category = tmpl.category
  form.location = tmpl.location
  form.description = tmpl.description
}

function handleFileChange(event) {
  const file = event.target.files[0]
  if (!file) return

  // Validasi ukuran < 3MB
  if (file.size > 3 * 1024 * 1024) {
    errors.photo = 'Ukuran foto maksimal 3MB.'
    return
  }

  // Validasi tipe file
  if (!file.type.startsWith('image/')) {
    errors.photo = 'Hanya file gambar (JPG, PNG, WebP) yang diperbolehkan.'
    return
  }

  errors.photo = ''
  const reader = new FileReader()
  reader.onload = (e) => {
    photoPreview.value = e.target.result
    form.photo = e.target.result
  }
  reader.readAsDataURL(file)
}

function removePhoto() {
  photoPreview.value = ''
  form.photo = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

function validate() {
  let valid = true
  errors.title = ''
  errors.category = ''
  errors.location = ''
  errors.description = ''
  errors.photo = ''

  if (!form.title.trim() || form.title.trim().length < 5) {
    errors.title = 'Judul laporan minimal 5 karakter.'
    valid = false
  }

  if (!form.category) {
    errors.category = 'Silakan pilih kategori laporan.'
    valid = false
  }

  if (!form.location.trim() || form.location.trim().length < 4) {
    errors.location = 'Lokasi laporan wajib diisi secara spesifik.'
    valid = false
  }

  if (!form.description.trim() || form.description.trim().length < 10) {
    errors.description = 'Deskripsikan masalah minimal 10 karakter.'
    valid = false
  }

  return valid
}

function handleSubmit() {
  if (!validate()) {
    toastStore.showToast('Silakan lengkapi formulir laporan.', 'error')
    return
  }

  isSubmitting.value = true

  try {
    const defaultSamplePhotos = [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&auto=format&fit=crop&q=80'
    ]

    const finalPhoto = form.photo || defaultSamplePhotos[Math.floor(Math.random() * defaultSamplePhotos.length)]

    const newReport = reportStore.addReport({
      title: form.title,
      category: form.category,
      location: form.location,
      description: form.description,
      photo: finalPhoto
    })

    toastStore.showToast('✅ Laporan berhasil dikirim! Menunggu proses petugas.', 'success')

    // Redirect langsung ke halaman detail laporan
    router.push(`/laporan/${newReport.id}`)
  } catch (error) {
    console.error(error)
    toastStore.showToast('Gagal mengirimkan laporan. Silakan coba lagi.', 'error')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <BaseCard padding="p-5 sm:p-7" class="border-slate-200/80">
    <!-- Quick templates -->
    <div class="mb-5 pb-4 border-b border-slate-100">
      <div class="flex items-center justify-between gap-2 mb-2">
        <span class="text-xs font-semibold text-slate-500">Contoh Cepat Masalah Sekitar:</span>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="(tmpl, idx) in quickTemplates"
          :key="idx"
          type="button"
          @click="applyTemplate(tmpl)"
          class="text-[11px] font-medium px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 rounded-lg transition-colors text-left"
        >
          + {{ tmpl.title }}
        </button>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Judul Laporan -->
      <BaseInput
        v-model="form.title"
        label="Judul Laporan"
        placeholder="Contoh: Saluran Air Meluap di Depan Pos RW 03"
        :error="errors.title"
        required
      />

      <!-- Kategori & Lokasi -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <BaseSelect
          v-model="form.category"
          label="Kategori Masalah"
          :options="categories"
          placeholder="Pilih Kategori..."
          :error="errors.category"
          required
        />

        <BaseInput
          v-model="form.location"
          label="Lokasi Kejadian"
          placeholder="Contoh: Jl. Melati RT 02 / RW 04"
          :error="errors.location"
          required
        />
      </div>

      <!-- Deskripsi -->
      <div>
        <label class="text-xs font-semibold text-slate-700 block mb-1.5">
          Deskripsi Masalah <span class="text-rose-500">*</span>
        </label>
        <textarea
          v-model="form.description"
          rows="3"
          placeholder="Jelaskan kondisi secara detail, sejak kapan masalah terjadi, dan dampaknya bagi warga sekitar..."
          class="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-colors"
          :class="errors.description ? 'border-rose-300' : 'border-slate-200'"
        ></textarea>
        <p v-if="errors.description" class="text-xs text-rose-500 mt-1 font-medium">
          {{ errors.description }}
        </p>
      </div>

      <!-- Upload Foto dengan Preview -->
      <div>
        <label class="text-xs font-semibold text-slate-700 block mb-1.5">
          Foto Bukti Masalah
        </label>

        <!-- Preview Area -->
        <div v-if="photoPreview" class="relative rounded-2xl overflow-hidden border border-slate-200 mb-3 max-h-60 bg-slate-100">
          <img :src="photoPreview" alt="Preview Foto" class="w-full h-56 object-cover" />
          <button
            @click="removePhoto"
            type="button"
            class="absolute top-3 right-3 p-1.5 bg-slate-900/70 hover:bg-slate-900 text-white rounded-xl text-xs flex items-center gap-1 shadow-md"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Hapus Foto
          </button>
        </div>

        <!-- Upload Dropzone / Trigger -->
        <div
          v-else
          @click="$refs.fileInput.click()"
          class="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer bg-slate-50/60 hover:bg-emerald-50/20 transition-all group"
        >
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleFileChange"
          />
          <div class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p class="text-xs font-semibold text-slate-700">Ambil Foto atau Pilih Gambar</p>
          <p class="text-[11px] text-slate-400 mt-0.5">PNG, JPG atau WebP (Maks. 3MB)</p>
          <p class="text-[10px] text-emerald-600 font-medium mt-1">Jika dilewati, sistem akan menggunakan ilustrasi foto simulasi otomatis.</p>
        </div>
        <p v-if="errors.photo" class="text-xs text-rose-500 mt-1 font-medium">
          {{ errors.photo }}
        </p>
      </div>

      <!-- Submit Button -->
      <div class="pt-2">
        <BaseButton
          type="submit"
          variant="primary"
          size="lg"
          :block="true"
          :loading="isSubmitting"
        >
          Kirim Laporan Masyarakat
        </BaseButton>
      </div>
    </form>
  </BaseCard>
</template>
