<script setup>
import { ref, computed } from 'vue'
import { useLocationStore } from '@/stores/locationStore'
import UserLayout from '@/layouts/UserLayout.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'

const locationStore = useLocationStore()

const selectedCategory = ref('Semua')
const selectedLocation = ref(locationStore.allMapLocations[0] || null)

const filteredLocations = computed(() => {
  if (selectedCategory.value === 'Semua') {
    return locationStore.allMapLocations
  }
  return locationStore.allMapLocations.filter(loc => loc.category === selectedCategory.value)
})

function selectLocation(loc) {
  selectedLocation.value = loc
}

function getCategoryColor(cat) {
  switch (cat) {
    case 'Puskesmas':
      return { bg: 'bg-emerald-600', text: 'text-white', badge: 'emerald' }
    case 'Rumah Sakit':
      return { bg: 'bg-rose-600', text: 'text-white', badge: 'danger' }
    case 'Apotek':
      return { bg: 'bg-sky-600', text: 'text-white', badge: 'sky' }
    case 'Posyandu':
      return { bg: 'bg-amber-500', text: 'text-white', badge: 'warning' }
    case 'Laporan masyarakat':
    default:
      return { bg: 'bg-purple-600', text: 'text-white', badge: 'purple' }
  }
}
</script>

<template>
  <UserLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">
            Peta Fasilitas Kesehatan & Laporan Warga
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">
            Pantau sebaran Puskesmas, Rumah Sakit, Posyandu, Apotek, dan titik laporan lingkungan di sekitar.
          </p>
        </div>

        <span class="text-xs text-slate-400 bg-white px-3 py-1.5 rounded-xl border border-slate-200 self-start sm:self-auto">
          📍 Mode Simulasi Interaktif (Siap Integrasi Peta Digital)
        </span>
      </div>

      <!-- Filter Pills -->
      <div class="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          v-for="cat in locationStore.categories"
          :key="cat"
          @click="selectedCategory = cat"
          type="button"
          :class="[
            'px-3.5 py-1.5 text-xs font-semibold rounded-xl border whitespace-nowrap transition-all select-none',
            selectedCategory === cat
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          ]"
        >
          {{ cat }}
          <span class="text-[10px] opacity-80 ml-1">
            ({{ cat === 'Semua' ? locationStore.allMapLocations.length : locationStore.allMapLocations.filter(l => l.category === cat).length }})
          </span>
        </button>
      </div>

      <!-- Main Map Grid (Interactive Canvas + Detail Drawer) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- Interactive Map Canvas (lg:col-span-8) -->
        <div class="lg:col-span-8">
          <BaseCard padding="p-0" class="overflow-hidden border-slate-200/80 shadow-soft">
            <!-- Map Toolbar -->
            <div class="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Wilayah: Jakarta Selatan & Sekitarnya</span>
              </div>
              <span>Klik pin pada peta untuk detail</span>
            </div>

            <!-- Visual Simulated Interactive Map Area -->
            <div class="relative w-full h-80 sm:h-[420px] bg-[#eef5ee] overflow-hidden select-none">
              <!-- Decorative stylized street/river lines -->
              <svg class="absolute inset-0 w-full h-full opacity-40 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <!-- River -->
                <path d="M-10,30 Q30,45 60,35 T110,65" fill="none" stroke="#7dd3fc" stroke-width="6" stroke-linecap="round" />
                <!-- Main Road 1 -->
                <path d="M10,-10 L90,110" fill="none" stroke="#ffffff" stroke-width="4" />
                <!-- Main Road 2 -->
                <path d="M-10,70 L110,20" fill="none" stroke="#ffffff" stroke-width="3" />
                <!-- Secondary Roads -->
                <line x1="10" y1="40" x2="90" y2="40" stroke="#f8fafc" stroke-width="2" />
                <line x1="50" y1="10" x2="50" y2="90" stroke="#f8fafc" stroke-width="2" />
                <!-- Parks/Greenery zones -->
                <rect x="15" y="15" width="20" height="15" rx="3" fill="#d1fae5" />
                <rect x="68" y="60" width="22" height="25" rx="4" fill="#d1fae5" />
                <rect x="25" y="65" width="18" height="20" rx="3" fill="#dcfce7" />
              </svg>

              <!-- Interactive Location Pins -->
              <div
                v-for="loc in filteredLocations"
                :key="loc.id"
                @click="selectLocation(loc)"
                class="absolute cursor-pointer transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 group z-20"
                :style="{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }"
              >
                <!-- Pin Bubble Marker -->
                <div
                  :class="[
                    'w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg transition-all',
                    getCategoryColor(loc.category).bg,
                    selectedLocation?.id === loc.id
                      ? 'scale-125 ring-4 ring-white ring-offset-2 ring-offset-slate-800'
                      : 'hover:scale-110 hover:shadow-xl'
                  ]"
                >
                  <!-- Icon by category -->
                  <svg v-if="loc.category === 'Puskesmas'" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                  <svg v-else-if="loc.category === 'Rumah Sakit'" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <svg v-else-if="loc.category === 'Apotek'" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <svg v-else-if="loc.category === 'Posyandu'" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg v-else class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>

                <!-- Hover Mini Label -->
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-slate-900 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md whitespace-nowrap shadow-md pointer-events-none z-30">
                  {{ loc.name }}
                </div>
              </div>

              <!-- Map Legend Overlay (Bottom Left) -->
              <div class="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs p-2 rounded-xl shadow-md border border-slate-200 text-[10px] text-slate-600 space-y-1 hidden sm:block">
                <div class="font-bold text-slate-800 text-[11px] mb-1">Legenda Peta:</div>
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Puskesmas
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-rose-600"></span> Rumah Sakit
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-sky-600"></span> Apotek
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Posyandu
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-purple-600"></span> Titik Laporan Warga
                </div>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Location Detail Drawer (lg:col-span-4) -->
        <div class="lg:col-span-4 space-y-4">
          <BaseCard v-if="selectedLocation" padding="p-5 sm:p-6" class="border-slate-200/80 shadow-soft">
            <div class="flex items-center justify-between gap-2 mb-2">
              <BaseBadge :variant="getCategoryColor(selectedLocation.category).badge" size="sm">
                {{ selectedLocation.category }}
              </BaseBadge>
              <span class="text-[10px] text-slate-400">Terpilih</span>
            </div>

            <h3 class="font-bold text-slate-900 text-base leading-snug">
              {{ selectedLocation.name }}
            </h3>

            <p class="text-xs text-slate-500 mt-2 leading-relaxed">
              {{ selectedLocation.description }}
            </p>

            <div class="mt-4 pt-4 border-t border-slate-100 space-y-2.5 text-xs">
              <div>
                <span class="text-slate-400 block text-[11px]">Alamat Lengkap</span>
                <p class="font-medium text-slate-800 mt-0.5">{{ selectedLocation.address }}</p>
              </div>

              <div>
                <span class="text-slate-400 block text-[11px]">Jam Operasional / Status</span>
                <p class="font-medium text-slate-800 mt-0.5">{{ selectedLocation.operatingHours }}</p>
              </div>

              <div v-if="selectedLocation.phone !== '-'">
                <span class="text-slate-400 block text-[11px]">Kontak Telepon</span>
                <p class="font-medium text-emerald-700 mt-0.5">{{ selectedLocation.phone }}</p>
              </div>

              <div v-if="selectedLocation.services && selectedLocation.services.length > 0">
                <span class="text-slate-400 block text-[11px] mb-1">Layanan / Detail</span>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="srv in selectedLocation.services"
                    :key="srv"
                    class="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-medium"
                  >
                    {{ srv }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Action button -->
            <div class="mt-5 pt-3 border-t border-slate-100">
              <a
                v-if="selectedLocation.reportId"
                :href="`/laporan/${selectedLocation.reportId}`"
                class="w-full inline-flex items-center justify-center py-2 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
              >
                Buka Detail Laporan →
              </a>
              <div v-else class="text-center">
                <span class="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-xl block">
                  ✓ Faskes Aktif & Siap Melayani
                </span>
              </div>
            </div>
          </BaseCard>

          <BaseCard v-else padding="p-6" class="text-center text-xs text-slate-400 border-slate-200">
            Pilih salah satu pin pada peta untuk melihat informasi fasilitas kesehatan atau laporan.
          </BaseCard>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
