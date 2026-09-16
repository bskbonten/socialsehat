<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForumStore } from '@/stores/forumStore'
import { useToastStore } from '@/stores/toastStore'
import UserLayout from '@/layouts/UserLayout.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'

const route = useRoute()
const router = useRouter()
const forumStore = useForumStore()
const toastStore = useToastStore()

const newComment = ref('')
const commentError = ref('')

const post = computed(() => {
  return forumStore.getPostById(route.params.id)
})

function handleAddComment() {
  if (!newComment.value.trim()) {
    commentError.value = 'Komentar tidak boleh kosong.'
    return
  }

  commentError.value = ''
  forumStore.addComment(post.value.id, newComment.value)
  newComment.value = ''
  toastStore.showToast('✅ Tanggapan Anda berhasil dikirimkan.', 'success')
}

function formatDateTime(isoStr) {
  if (!isoStr) return '-'
  return new Date(isoStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <UserLayout>
    <div class="max-w-3xl mx-auto space-y-6">
      <!-- Back button -->
      <button
        @click="router.back()"
        class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
        type="button"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Forum
      </button>

      <!-- Not found -->
      <div v-if="!post" class="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
        <p class="text-sm font-bold text-slate-800">Topik diskusi tidak ditemukan</p>
        <router-link to="/forum" class="text-xs font-bold text-emerald-600 hover:underline mt-2 inline-block">
          Kembali ke Daftar Forum
        </router-link>
      </div>

      <!-- Thread Content -->
      <template v-else>
        <BaseCard padding="p-6 sm:p-7" class="border-slate-200/80 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img
                :src="post.authorAvatar"
                alt="Avatar"
                class="w-10 h-10 rounded-full object-cover border border-emerald-200"
              />
              <div>
                <p class="text-sm font-bold text-slate-900">{{ post.authorName }}</p>
                <p class="text-[11px] text-slate-400">{{ formatDateTime(post.createdAt) }}</p>
              </div>
            </div>

            <BaseBadge variant="emerald" size="sm">
              {{ post.category }}
            </BaseBadge>
          </div>

          <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {{ post.title }}
          </h1>

          <p class="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 whitespace-pre-line">
            {{ post.content }}
          </p>

          <div class="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
            <button
              @click="forumStore.toggleLike(post.id)"
              type="button"
              class="flex items-center gap-1.5 hover:text-rose-600 transition-colors"
            >
              <svg class="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{{ post.likes }} Menyukai diskusi ini</span>
            </button>

            <span>{{ post.comments?.length || 0 }} Tanggapan Warga</span>
          </div>
        </BaseCard>

        <!-- Komentar & Tanggapan List -->
        <div class="space-y-4">
          <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Tanggapan Warga ({{ post.comments?.length || 0 }})
          </h3>

          <div v-if="post.comments && post.comments.length > 0" class="space-y-3">
            <BaseCard
              v-for="comm in post.comments"
              :key="comm.id"
              padding="p-4 sm:p-5"
              class="border-slate-200/70"
            >
              <div class="flex items-center gap-2.5 mb-2">
                <img
                  :src="comm.authorAvatar"
                  alt="Avatar"
                  class="w-7 h-7 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <span class="text-xs font-bold text-slate-800">{{ comm.authorName }}</span>
                  <span class="text-[10px] text-slate-400 ml-2">{{ formatDateTime(comm.createdAt) }}</span>
                </div>
              </div>
              <p class="text-xs text-slate-700 leading-relaxed pl-9">
                {{ comm.content }}
              </p>
            </BaseCard>
          </div>

          <div v-else class="text-center py-8 bg-white rounded-2xl border border-slate-100 text-xs text-slate-400">
            Belum ada tanggapan untuk diskusi ini. Jadilah yang pertama memberikan saran!
          </div>

          <!-- Add Comment Form Card -->
          <BaseCard padding="p-5 sm:p-6" class="border-slate-200/80">
            <h4 class="text-xs font-bold text-slate-800 mb-2">Berikan Tanggapan atau Tips:</h4>
            <form @submit.prevent="handleAddComment" class="space-y-3">
              <textarea
                v-model="newComment"
                rows="3"
                placeholder="Bagikan tips atau pengalaman Anda yang bermanfaat bagi warga..."
                class="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-colors"
              ></textarea>
              <p v-if="commentError" class="text-xs text-rose-500 font-medium">
                {{ commentError }}
              </p>
              <div class="flex justify-end">
                <BaseButton type="submit" variant="primary" size="md">
                  Kirim Tanggapan
                </BaseButton>
              </div>
            </form>
          </BaseCard>
        </div>
      </template>
    </div>
  </UserLayout>
</template>
