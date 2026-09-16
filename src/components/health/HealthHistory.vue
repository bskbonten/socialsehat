<script setup>
import { ref, computed } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'

const props = defineProps({
  records: {
    type: Array,
    default: () => []
  }
})

defineEmits(['delete-record'])

const activeMetric = ref('weight') // 'weight' | 'temperature' | 'bp'

// Data untuk visual chart SVG (diurutkan dari lama ke baru agar garis chart maju dari kiri ke kanan)
const chronologicalRecords = computed(() => {
  return [...props.records].reverse()
})

// Generator koordinat SVG polyline yang bersih dan responsif
const chartData = computed(() => {
  const data = chronologicalRecords.value
  if (data.length < 2) return null

  const width = 500
  const height = 140
  const padding = 20

  let values = []
  let label = ''
  let unit = ''

  if (activeMetric.value === 'weight') {
    values = data.map(d => d.weight)
    label = 'Berat Badan'
    unit = 'kg'
  } else if (activeMetric.value === 'temperature') {
    values = data.map(d => d.temperature)
    label = 'Suhu Tubuh'
    unit = '°C'
  } else {
    values = data.map(d => d.systolic)
    label = 'Tekanan Sistolik'
    unit = 'mmHg'
  }

  const minVal = Math.min(...values)
  const maxVal = Math.max(...values)
  const range = (maxVal - minVal) === 0 ? 1 : (maxVal - minVal)

  const points = values.map((val, idx) => {
    const x = padding + (idx / (values.length - 1)) * (width - padding * 2)
    const y = height - padding - ((val - minVal) / range) * (height - padding * 2)
    return { x, y, val, date: data[idx].date }
  })

  const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ')

  // Area polygon di bawah garis untuk efek gradient fill
  const areaPoints = `${padding},${height} ${polylinePoints} ${width - padding},${height}`

  return {
    width,
    height,
    points,
    polylinePoints,
    areaPoints,
    minVal,
    maxVal,
    label,
    unit
  }
})

function formatDisplayDate(dateStr) {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Visualisasi Grafik Interaktif Sederhana -->
    <BaseCard v-if="records.length >= 2 && chartData" padding="p-5 sm:p-6" class="border-slate-200/80">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 class="text-sm font-bold text-slate-900">
            Grafik Perkembangan {{ chartData.label }}
          </h3>
          <p class="text-xs text-slate-500">
            Tren perubahan data pribadi berdasarkan riwayat monitoring.
          </p>
        </div>

        <!-- Metric Toggle Buttons -->
        <div class="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            @click="activeMetric = 'weight'"
            type="button"
            :class="[
              'px-3 py-1 text-xs font-semibold rounded-lg transition-all',
              activeMetric === 'weight' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            ]"
          >
            Berat Badan
          </button>
          <button
            @click="activeMetric = 'temperature'"
            type="button"
            :class="[
              'px-3 py-1 text-xs font-semibold rounded-lg transition-all',
              activeMetric === 'temperature' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            ]"
          >
            Suhu (°C)
          </button>
          <button
            @click="activeMetric = 'bp'"
            type="button"
            :class="[
              'px-3 py-1 text-xs font-semibold rounded-lg transition-all',
              activeMetric === 'bp' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            ]"
          >
            Tensi Sistolik
          </button>
        </div>
      </div>

      <!-- SVG Chart Canvas -->
      <div class="w-full overflow-x-auto">
        <div class="min-w-[340px]">
          <svg
            :viewBox="`0 0 ${chartData.width} ${chartData.height}`"
            class="w-full h-36 overflow-visible"
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#10b981" stop-opacity="0.25" />
                <stop offset="100%" stop-color="#10b981" stop-opacity="0.0" />
              </linearGradient>
            </defs>

            <!-- Grid Lines -->
            <line x1="20" y1="20" x2="480" y2="20" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="4" />
            <line x1="20" y1="70" x2="480" y2="70" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="4" />
            <line x1="20" y1="120" x2="480" y2="120" stroke="#f1f5f9" stroke-width="1" />

            <!-- Area Fill -->
            <polygon
              :points="chartData.areaPoints"
              fill="url(#chartGradient)"
            />

            <!-- Line Path -->
            <polyline
              :points="chartData.polylinePoints"
              fill="none"
              stroke="#059669"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <!-- Data Point Dots & Labels -->
            <g v-for="(p, i) in chartData.points" :key="i">
              <circle
                :cx="p.x"
                :cy="p.y"
                r="4.5"
                fill="#ffffff"
                stroke="#059669"
                stroke-width="2.5"
              />
              <text
                :x="p.x"
                :y="p.y - 8"
                text-anchor="middle"
                class="text-[10px] font-bold fill-slate-700"
              >
                {{ p.val }}
              </text>
              <text
                :x="p.x"
                y="135"
                text-anchor="middle"
                class="text-[9px] fill-slate-400"
              >
                {{ formatDisplayDate(p.date).split(' ')[0] }} {{ formatDisplayDate(p.date).split(' ')[1] }}
              </text>
            </g>
          </svg>
        </div>
      </div>
    </BaseCard>

    <!-- Riwayat Tabel Hybrid / Cards -->
    <BaseCard padding="p-0" class="border-slate-200/80 overflow-hidden">
      <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 class="text-sm font-bold text-slate-900">
          Riwayat Pengukuran Mandiri
        </h3>
        <span class="text-xs text-slate-500 font-medium">
          Total: {{ records.length }} data
        </span>
      </div>

      <!-- Empty State -->
      <div v-if="records.length === 0" class="p-8 text-center">
        <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p class="text-sm font-semibold text-slate-700">Belum ada data monitoring.</p>
        <p class="text-xs text-slate-400 mt-1">Mulai catat kondisi kesehatanmu hari ini untuk melihat grafik tren.</p>
      </div>

      <!-- Desktop Table View (Hidden on mobile) -->
      <div v-else class="hidden md:block overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-600">
          <thead class="bg-slate-50 text-slate-700 uppercase text-[10px] font-bold border-b border-slate-100">
            <tr>
              <th class="px-5 py-3.5">Tanggal</th>
              <th class="px-4 py-3.5">Berat</th>
              <th class="px-4 py-3.5">Suhu</th>
              <th class="px-4 py-3.5">Tekanan Darah</th>
              <th class="px-4 py-3.5">Keluhan/Gejala</th>
              <th class="px-4 py-3.5">Catatan</th>
              <th class="px-4 py-3.5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="rec in records" :key="rec.id" class="hover:bg-slate-50/60 transition-colors">
              <td class="px-5 py-3.5 font-semibold text-slate-900 whitespace-nowrap">
                {{ formatDisplayDate(rec.date) }}
              </td>
              <td class="px-4 py-3.5 whitespace-nowrap">
                <span class="font-bold text-slate-800">{{ rec.weight }}</span> kg
              </td>
              <td class="px-4 py-3.5 whitespace-nowrap">
                <span class="font-bold text-slate-800">{{ rec.temperature }}</span> °C
              </td>
              <td class="px-4 py-3.5 whitespace-nowrap">
                <span class="font-bold text-slate-800">{{ rec.systolic }}/{{ rec.diastolic }}</span> mmHg
              </td>
              <td class="px-4 py-3.5">
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="sym in rec.symptoms"
                    :key="sym"
                    :class="[
                      'px-2 py-0.5 rounded-md text-[10px] font-medium',
                      sym === 'Tidak ada' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'
                    ]"
                  >
                    {{ sym }}
                  </span>
                </div>
              </td>
              <td class="px-4 py-3.5 max-w-xs truncate text-slate-500">
                {{ rec.notes || '-' }}
              </td>
              <td class="px-4 py-3.5 text-right">
                <button
                  @click="$emit('delete-record', rec.id)"
                  class="text-rose-500 hover:text-rose-700 p-1 rounded hover:bg-rose-50 transition-colors"
                  title="Hapus Catatan"
                  type="button"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Cards View (Shown on < md) -->
      <div v-if="records.length > 0" class="md:hidden divide-y divide-slate-100">
        <div v-for="rec in records" :key="rec.id" class="p-4 space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-900">{{ formatDisplayDate(rec.date) }}</span>
            <button
              @click="$emit('delete-record', rec.id)"
              class="text-rose-500 hover:text-rose-700 text-xs p-1"
              type="button"
            >
              Hapus
            </button>
          </div>

          <div class="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl text-center">
            <div>
              <p class="text-[10px] text-slate-400">Berat</p>
              <p class="text-xs font-bold text-slate-800">{{ rec.weight }} kg</p>
            </div>
            <div>
              <p class="text-[10px] text-slate-400">Suhu</p>
              <p class="text-xs font-bold text-slate-800">{{ rec.temperature }} °C</p>
            </div>
            <div>
              <p class="text-[10px] text-slate-400">Tensi</p>
              <p class="text-xs font-bold text-slate-800">{{ rec.systolic }}/{{ rec.diastolic }}</p>
            </div>
          </div>

          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="text-[11px] text-slate-500 font-medium">Gejala:</span>
            <span
              v-for="sym in rec.symptoms"
              :key="sym"
              :class="[
                'px-2 py-0.5 rounded-md text-[10px] font-medium',
                sym === 'Tidak ada' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'
              ]"
            >
              {{ sym }}
            </span>
          </div>

          <p v-if="rec.notes" class="text-xs text-slate-500 italic bg-white p-2 rounded-lg border border-slate-100">
            “{{ rec.notes }}”
          </p>
        </div>
      </div>
    </BaseCard>
  </div>
</template>
