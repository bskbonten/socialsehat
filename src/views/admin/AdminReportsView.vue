<script setup>
import { ref, reactive, computed } from 'vue'
import { useReportStore } from '@/stores/reportStore'
import { useToastStore } from '@/stores/toastStore'
import AdminLayout from '@/layouts/AdminLayout.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'

const reportStore = useReportStore()
const toastStore = useToastStore()

const selectedCategory = ref('Semua')
const selectedStatus = ref('Semua')

const categories = [
  'Semua',
  'Sampah',
  'Genangan Air',
  'Sanitasi',
  'Lingkungan',
  'Penyakit',
  'Kualitas Air',
  'Lainnya'
]

const statuses = ['Semua', 'Dikirim', 'Diproses', 'Ditangani', 'Selesai']
const updateStatusOptions = ['Dikirim', 'Diproses', 'Ditangani', 'Selesai']

// Modal state
const showProcessModal = ref(false)
const activeReport = ref(null)

const processForm = reactive({
  status: 'Diproses',
  officerNotes: ''
})

const filteredReports = computed(() => {
  return reportStore.allReports.filter(rep => {
    const matchCategory = selectedCategory.value === 'Semua' || rep.category === selectedCategory.value
    const matchStatus = selectedStatus.value === 'Semua' || rep.status === selectedStatus.value
    return matchCategory && matchStatus
  })
})

function openProcessModal(rep) {
  activeReport.value = rep
  processForm.status = rep.status
  processForm.officerNotes = rep.officerNotes || ''
  showProcessModal.value = true
}

function handleUpdateReport() {
  if (!activeReport.value) return

  reportStore.updateReportStatus(
    activeReport.value.id,
    processForm.status,
    processForm.officerNotes
  )

  toastStore.showToast(`✅ Status laporan berhasil diubah ke "${processForm.status}".`, 'success')
  showProcessModal.value = false
}

function formatDisplayDate(dateStr) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">
            Manajemen Laporan Warga
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">
            Verifikasi, tangani, dan perbarui status laporan masalah lingkungan masyarakat.
          </p>
        </div>

        <span class="text-xs text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
          Total Pengaduan: <strong>{{ reportStore.allReports.length }}</strong>
        </span>
      </div>

      <!-- Filters Toolbar -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3 w-full sm:w-auto">
          <div class="w-1/2 sm:w-48">
            <BaseSelect
              v-model="selectedCategory"
              :options="categories"
              placeholder="Filter Kategori"
            />
          </div>
          <div class="w-1/2 sm:w-44">
            <BaseSelect
              v-model="selectedStatus"
              :options="statuses"
              placeholder="Filter Status"
            />
          </div>
        </div>

        <div class="text-xs text-slate-400">
          Menampilkan {{ filteredReports.length }} data laporan
        </div>
      </div>

      <!-- Reports Table & Cards -->
      <BaseCard padding="p-0" class="border-slate-200/80 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-600">
            <thead class="bg-slate-50 text-slate-700 uppercase text-[10px] font-bold border-b border-slate-100">
              <tr>
                <th class="px-5 py-3.5">ID / Tanggal</th>
                <th class="px-4 py-3.5">Judul & Pelapor</th>
                <th class="px-4 py-3.5">Kategori</th>
                <th class="px-4 py-3.5">Lokasi</th>
                <th class="px-4 py-3.5">Status</th>
                <th class="px-4 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr
                v-for="rep in filteredReports"
                :key="rep.id"
                class="hover:bg-slate-50/70 transition-colors"
              >
                <td class="px-5 py-3.5 whitespace-nowrap">
                  <span class="font-mono font-bold text-slate-800">{{ rep.id }}</span>
                  <span class="block text-[10px] text-slate-400 mt-0.5">{{ formatDisplayDate(rep.createdAt) }}</span>
                </td>
                <td class="px-4 py-3.5 max-w-xs">
                  <p class="font-bold text-slate-900 truncate">{{ rep.title }}</p>
                  <p class="text-[11px] text-slate-400 truncate">Oleh: {{ rep.userName }}</p>
                </td>
                <td class="px-4 py-3.5 whitespace-nowrap">
                  <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[10px]">
                    {{ rep.category }}
                  </span>
                </td>
                <td class="px-4 py-3.5 text-slate-600 max-w-xs truncate">
                  {{ rep.location }}
                </td>
                <td class="px-4 py-3.5 whitespace-nowrap">
                  <BaseBadge
                    :variant="rep.status === 'Selesai' ? 'success' : rep.status === 'Ditangani' ? 'sky' : rep.status === 'Diproses' ? 'warning' : 'neutral'"
                    size="sm"
                    :dot="true"
                  >
                    {{ rep.status }}
                  </BaseBadge>
                </td>
                <td class="px-4 py-3.5 text-right whitespace-nowrap">
                  <BaseButton
                    @click="openProcessModal(rep)"
                    variant="outline"
                    size="sm"
                  >
                    Proses Laporan
                  </BaseButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="filteredReports.length === 0" class="p-8 text-center text-xs text-slate-400">
          Tidak ada laporan yang sesuai dengan filter yang dipilih.
        </div>
      </BaseCard>

      <!-- Modal Proses & Update Status Laporan -->
      <BaseModal
        :show="showProcessModal"
        title="Proses Status & Tindak Lanjut Laporan"
        @close="showProcessModal = false"
      >
        <div v-if="activeReport" class="space-y-4">
          <!-- Summary info -->
          <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
            <p class="text-[11px] font-mono text-slate-400">{{ activeReport.id }} • {{ activeReport.category }}</p>
            <h4 class="font-bold text-slate-900 text-sm">{{ activeReport.title }}</h4>
            <p class="text-slate-600 leading-relaxed">{{ activeReport.description }}</p>
            <p class="text-slate-400 text-[11px] pt-1">📍 Lokasi: {{ activeReport.location }}</p>
          </div>

          <!-- Select Status -->
          <BaseSelect
            v-model="processForm.status"
            label="Ubah Status Penanganan"
            :options="updateStatusOptions"
            required
          />

          <!-- Officer Notes -->
          <div>
            <label class="text-xs font-semibold text-slate-700 block mb-1.5">
              Catatan Petugas untuk Warga
            </label>
            <textarea
              v-model="processForm.officerNotes"
              rows="3"
              placeholder="Tuliskan tindakan yang telah dilakukan (contoh: Tim PPSU telah membersihkan saluran air dan memasang larvasida)..."
              class="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-colors"
            ></textarea>
            <p class="text-[11px] text-slate-400 mt-1">
              *Catatan ini akan langsung terlihat oleh warga pada halaman detail laporan.
            </p>
          </div>
        </div>

        <template #footer>
          <BaseButton @click="showProcessModal = false" variant="ghost" size="md">
            Batal
          </BaseButton>
          <BaseButton @click="handleUpdateReport" variant="secondary" size="md">
            Simpan Perubahan Status
          </BaseButton>
        </template>
      </BaseModal>
    </div>
  </AdminLayout>
</template>
