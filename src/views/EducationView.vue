<script setup>
import { ref, computed } from 'vue'
import { useEducationStore } from '@/stores/educationStore'
import UserLayout from '@/layouts/UserLayout.vue'
import ArticleCard from '@/components/education/ArticleCard.vue'
import BaseInput from '@/components/ui/BaseInput.vue'

const educationStore = useEducationStore()

const searchQuery = ref('')
const selectedCategory = ref('Semua')

const filteredArticles = computed(() => {
  return educationStore.sortedArticles.filter(art => {
    const matchCategory = selectedCategory.value === 'Semua' || art.category === selectedCategory.value
    const matchSearch = !searchQuery.value.trim() || 
      art.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchCategory && matchSearch
  })
})
</script>

<template>
  <UserLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">
          Edukasi & Literasi Kesehatan
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">
          Informasi praktis, kiat hidup bersih, dan panduan kesehatan preventif yang mudah dipahami.
        </p>
      </div>

      <!-- Search & Category Filters -->
      <div class="space-y-3">
        <!-- Search Input -->
        <div class="max-w-md">
          <BaseInput
            v-model="searchQuery"
            placeholder="Cari topik artikel (cth: DBD, gizi, luka bakar)..."
          />
        </div>

        <!-- Category Pills -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            v-for="cat in educationStore.categories"
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
          </button>
        </div>
      </div>

      <!-- Articles Grid -->
      <div v-if="filteredArticles.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ArticleCard
          v-for="art in filteredArticles"
          :key="art.id"
          :article="art"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
        <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <p class="text-sm font-bold text-slate-800">Tidak ada artikel yang ditemukan</p>
        <p class="text-xs text-slate-500 mt-1">Coba kata kunci pencarian lain atau pilih kategori "Semua".</p>
      </div>
    </div>
  </UserLayout>
</template>
