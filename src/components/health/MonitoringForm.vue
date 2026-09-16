<script setup>
import { reactive, ref } from 'vue'
import { useHealthStore } from '@/stores/healthStore'
import { useToastStore } from '@/stores/toastStore'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'

const emit = defineEmits(['saved'])

const healthStore = useHealthStore()
const toastStore = useToastStore()

const isSubmitting = ref(false)

const form = reactive({
  date: new Date().toISOString().split('T')[0],
  weight: '',
  temperature: '',
  systolic: '',
  diastolic: '',
  symptoms: ['Tidak ada'],
  notes: ''
})

const errors = reactive({
  date: '',
  weight: '',
  temperature: '',
  systolic: '',
  diastolic: '',
  symptoms: ''
})

const availableSymptoms = [
  'Tidak ada',
  'Batuk',
  'Demam',
  'Pusing',
  'Sesak'
]

function toggleSymptom(symptom) {
  if (symptom === 'Tidak ada') {
    form.symptoms = ['Tidak ada']
    return
  }

  // Jika memilih gejala lain, hapus 'Tidak ada'
  const indexNone = form.symptoms.indexOf('Tidak ada')
  if (indexNone !== -1) {
    form.symptoms.splice(indexNone, 1)
  }

  const index = form.symptoms.indexOf(symptom)
  if (index === -1) {
    form.symptoms.push(symptom)
  } else {
    form.symptoms.splice(index, 1)
    if (form.symptoms.length === 0) {
      form.symptoms = ['Tidak ada']
    }
  }
}

function validate() {
  let valid = true
  errors.date = ''
  errors.weight = ''
  errors.temperature = ''
  errors.systolic = ''
  errors.diastolic = ''

  if (!form.date) {
    errors.date = 'Tanggal pencatatan wajib diisi.'
    valid = false
  }

  const weightNum = parseFloat(form.weight)
  if (!form.weight || isNaN(weightNum) || weightNum < 20 || weightNum > 300) {
    errors.weight = 'Berat badan harus angka valid antara 20 - 300 kg.'
    valid = false
  }

  const tempNum = parseFloat(form.temperature)
  if (!form.temperature || isNaN(tempNum) || tempNum < 34 || tempNum > 43) {
    errors.temperature = 'Suhu tubuh harus antara 34.0°C - 43.0°C.'
    valid = false
  }

  const sysNum = parseInt(form.systolic, 10)
  if (!form.systolic || isNaN(sysNum) || sysNum < 60 || sysNum > 250) {
    errors.systolic = 'Sistolik harus antara 60 - 250 mmHg.'
    valid = false
  }

  const diaNum = parseInt(form.diastolic, 10)
  if (!form.diastolic || isNaN(diaNum) || diaNum < 40 || diaNum > 150) {
    errors.diastolic = 'Diastolik harus antara 40 - 150 mmHg.'
    valid = false
  }

  return valid
}

function handleSubmit() {
  if (!validate()) {
    toastStore.showToast('Mohon periksa kembali isian formulir Anda.', 'error')
    return
  }

  isSubmitting.value = true

  try {
    healthStore.addHealthRecord({
      date: form.date,
      weight: form.weight,
      temperature: form.temperature,
      systolic: form.systolic,
      diastolic: form.diastolic,
      symptoms: [...form.symptoms],
      notes: form.notes
    })

    toastStore.showToast('✅ Monitoring kesehatan berhasil disimpan.', 'success')

    // Reset form to defaults
    form.weight = ''
    form.temperature = ''
    form.systolic = ''
    form.diastolic = ''
    form.symptoms = ['Tidak ada']
    form.notes = ''
    form.date = new Date().toISOString().split('T')[0]

    emit('saved')
  } catch (err) {
    console.error(err)
    toastStore.showToast('Terjadi kesalahan saat menyimpan data.', 'error')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <BaseCard padding="p-5 sm:p-6" class="border-slate-200/80">
    <div class="mb-5 border-b border-slate-100 pb-3">
      <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
        Formulir Pemantauan Kesehatan
      </h3>
      <p class="text-xs text-slate-500 mt-1">
        Catat data kondisi tubuh Anda secara berkala untuk pemantauan mandiri.
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Tanggal -->
      <BaseInput
        v-model="form.date"
        type="date"
        label="Tanggal Pemantauan"
        :error="errors.date"
        required
      />

      <!-- Grid: Berat Badan & Suhu Tubuh -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <BaseInput
          v-model="form.weight"
          type="number"
          step="0.1"
          placeholder="Contoh: 60.5"
          label="Berat Badan"
          suffix="kg"
          :error="errors.weight"
          required
        />

        <BaseInput
          v-model="form.temperature"
          type="number"
          step="0.1"
          placeholder="Contoh: 36.7"
          label="Suhu Tubuh"
          suffix="°C"
          :error="errors.temperature"
          required
        />
      </div>

      <!-- Grid: Tekanan Darah (Sistolik & Diastolik) -->
      <div>
        <label class="text-xs font-semibold text-slate-700 block mb-1.5">
          Tekanan Darah (Tensi) <span class="text-rose-500">*</span>
        </label>
        <div class="grid grid-cols-2 gap-3">
          <BaseInput
            v-model="form.systolic"
            type="number"
            placeholder="Sistolik (120)"
            suffix="mmHg"
            :error="errors.systolic"
            required
          />
          <BaseInput
            v-model="form.diastolic"
            type="number"
            placeholder="Diastolik (80)"
            suffix="mmHg"
            :error="errors.diastolic"
            required
          />
        </div>
      </div>

      <!-- Gejala Checkboxes -->
      <div class="pt-1">
        <label class="text-xs font-semibold text-slate-700 block mb-2">
          Keluhan / Gejala yang Dirasakan
        </label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="sym in availableSymptoms"
            :key="sym"
            type="button"
            @click="toggleSymptom(sym)"
            :class="[
              'px-3 py-1.5 text-xs font-medium rounded-xl border transition-all select-none',
              form.symptoms.includes(sym)
                ? (sym === 'Tidak ada' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-amber-50 text-amber-800 border-amber-300')
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            ]"
          >
            {{ sym }}
          </button>
        </div>
      </div>

      <!-- Catatan Tambahan -->
      <div>
        <label class="text-xs font-semibold text-slate-700 block mb-1.5">
          Catatan Tambahan (Opsional)
        </label>
        <textarea
          v-model="form.notes"
          rows="2"
          placeholder="Aktivitas fisik hari ini, obat yang sedang dikonsumsi, atau kondisi umum..."
          class="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-colors"
        ></textarea>
      </div>

      <!-- Medical Disclaimer Reminder -->
      <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 flex items-start gap-2">
        <svg class="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Data ini digunakan untuk pencatatan mandiri. Apabila Anda mengalami keluhan atau demam berlanjut, harap berkonsultasi langsung ke fasilitas pelayanan kesehatan.</span>
      </div>

      <!-- Submit Button -->
      <BaseButton
        type="submit"
        variant="primary"
        size="lg"
        :block="true"
        :loading="isSubmitting"
      >
        Simpan Monitoring
      </BaseButton>
    </form>
  </BaseCard>
</template>
