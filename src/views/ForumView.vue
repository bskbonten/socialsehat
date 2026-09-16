<script setup>
import { ref, reactive, computed } from 'vue'
import { useForumStore } from '@/stores/forumStore'
import { useToastStore } from '@/stores/toastStore'
import UserLayout from '@/layouts/UserLayout.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'

const forumStore = useForumStore()
const toastStore = useToastStore()

const showCreateModal = ref(false)
const selectedCategory = ref('Semua')

const categories = ['Semua', 'Kebersihan', 'Lingkungan', 'Nutrisi', 'Gaya Hidup', 'Tanya Warga']

const form = reactive({
  title: '',
  category: 'Kebersihan',
  content: ''
})

const errors = reactive({
  title: '',
  content: ''
})

const filteredPosts = computed(() => {
  if (selectedCategory.value === 'Semua') {
    return forumStore.posts
  }
  return forumStore.posts.filter(p => p.category === selectedCategory.value)
})

function handleOpenModal() {
  form.title = ''
  form.category = 'Kebersihan'
  form.content = ''
  errors.title = ''
  errors.content = ''
  showCreateModal.value = true
}

function handleCreatePost() {
  errors.title = ''
  errors.content = ''
  let valid = true

  if (!form.title.trim() || form.title.trim().length < 5) {
    errors.title = 'Judul diskusi minimal 5 karakter.'
    valid = false
  }
  if (!form.content.trim() || form.content.trim().length < 10) {
    errors.content = 'Isi diskusi minimal 10 karakter.'
    valid = false
  }

  if (!valid) return

  forumStore.addPost(form.title, form.content, form.category)
  toastStore.showToast('✅ Topik diskusi berhasil dibagikan.', 'success')
  showCreateModal.value = false
}

function formatTimeAgo(isoStr) {
  if (!isoStr) return '-'
  const d = new Date(isoStr)
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<template>
  <UserLayout>
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">
            Forum Komunitas Sehat & Lingkungan
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">
            Ruang berbagi pengalaman, tips gotong royong, dan kepedulian lingkungan antar-warga.
          </p>
        </div>

        <BaseButton @click="handleOpenModal" variant="primary" size="md">
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
          </svg>
          + Mulai Diskusi
        </BaseButton>
      </div>

      <!-- Mandatory Medical Disclaimer Banner -->
      <div class="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
        <svg class="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div>
          <span class="font-bold">Pemberitahuan Komunitas:</span>
          <span> Forum SehatSosial adalah ruang berbagi informasi dan bukan pengganti konsultasi tenaga kesehatan. Jangan meminta atau membagikan resep obat keras tanpa anjuran dokter.</span>
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div class="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          v-for="cat in categories"
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

      <!-- Posts List -->
      <div class="space-y-4">
        <BaseCard
          v-for="post in filteredPosts"
          :key="post.id"
          padding="p-5 sm:p-6"
          :hover="true"
          class="border-slate-200/80"
        >
          <div class="flex items-start justify-between gap-3 mb-2">
            <div class="flex items-center gap-2.5">
              <img
                :src="post.authorAvatar"
                alt="Avatar"
                class="w-8 h-8 rounded-full object-cover border border-emerald-200"
              />
              <div>
                <p class="text-xs font-bold text-slate-800">{{ post.authorName }}</p>
                <p class="text-[10px] text-slate-400">{{ formatTimeAgo(post.createdAt) }}</p>
              </div>
            </div>

            <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              {{ post.category }}
            </span>
          </div>

          <router-link :to="`/forum/${post.id}`" class="block group">
            <h3 class="font-bold text-slate-900 text-sm sm:text-base group-hover:text-emerald-700 transition-colors mt-1">
              {{ post.title }}
            </h3>
            <p class="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
              {{ post.content }}
            </p>
          </router-link>

          <div class="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs text-slate-500">
            <div class="flex items-center gap-4">
              <!-- Komentar count -->
              <router-link :to="`/forum/${post.id}`" class="flex items-center gap-1.5 hover:text-emerald-700 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{{ post.comments?.length || 0 }} Tanggapan</span>
              </router-link>

              <!-- Likes -->
              <button
                @click="forumStore.toggleLike(post.id)"
                type="button"
                class="flex items-center gap-1.5 hover:text-rose-600 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{{ post.likes || 0 }}</span>
              </button>
            </div>

            <router-link :to="`/forum/${post.id}`" class="text-emerald-600 font-bold hover:underline inline-flex items-center gap-1">
              Buka Diskusi →
            </router-link>
          </div>
        </BaseCard>
      </div>

      <!-- Create Post Modal -->
      <BaseModal
        :show="showCreateModal"
        title="Mulai Topik Diskusi Baru"
        @close="showCreateModal = false"
      >
        <form @submit.prevent="handleCreatePost" class="space-y-4">
          <BaseInput
            v-model="form.title"
            label="Pertanyaan / Judul Diskusi"
            placeholder="Contoh: Bagaimana cara menjaga kebersihan kamar agar tetap sehat?"
            :error="errors.title"
            required
          />

          <BaseSelect
            v-model="form.category"
            label="Kategori"
            :options="categories.filter(c => c !== 'Semua')"
            required
          />

          <div>
            <label class="text-xs font-semibold text-slate-700 block mb-1.5">
              Isi Diskusi / Penjelasan <span class="text-rose-500">*</span>
            </label>
            <textarea
              v-model="form.content"
              rows="4"
              placeholder="Tuliskan pengalaman atau pertanyaan Anda untuk didiskusikan bersama warga..."
              class="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-colors"
            ></textarea>
            <p v-if="errors.content" class="text-xs text-rose-500 mt-1 font-medium">
              {{ errors.content }}
            </p>
          </div>
        </form>

        <template #footer>
          <BaseButton @click="showCreateModal = false" variant="ghost" size="md">
            Batal
          </BaseButton>
          <BaseButton @click="handleCreatePost" variant="primary" size="md">
            Publikasikan Topik
          </BaseButton>
        </template>
      </BaseModal>
    </div>
  </UserLayout>
</template>
