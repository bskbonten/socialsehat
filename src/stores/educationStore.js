import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { initialArticles } from '@/data/articles'
import { getStorage, setStorage } from '@/utils/storage'

export const useEducationStore = defineStore('education', () => {
  const articles = ref(getStorage('articles', initialArticles))

  if (!getStorage('articles')) {
    setStorage('articles', articles.value)
  }

  const categories = [
    'Semua',
    'Gaya Hidup',
    'Nutrisi',
    'Penyakit',
    'Kebersihan',
    'Kesehatan Mental',
    'Pertolongan Pertama'
  ]

  const sortedArticles = computed(() => {
    return [...articles.value].sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
  })

  function getArticleById(id) {
    return articles.value.find(a => a.id === id || a.slug === id)
  }

  function addArticle(data) {
    const newArticle = {
      id: `art-${Date.now().toString().slice(-4)}`,
      title: data.title.trim(),
      slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category: data.category || 'Gaya Hidup',
      summary: data.summary.trim(),
      image: data.image || 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=80',
      readTime: data.readTime || '3 menit',
      publishedDate: data.publishedDate || new Date().toISOString().split('T')[0],
      author: data.author || 'Tim Edukasi SehatSosial',
      content: data.content.trim()
    }

    articles.value.unshift(newArticle)
    setStorage('articles', articles.value)
    return newArticle
  }

  function updateArticle(id, data) {
    const index = articles.value.findIndex(a => a.id === id)
    if (index === -1) return false

    articles.value[index] = {
      ...articles.value[index],
      ...data,
      summary: data.summary ? data.summary.trim() : articles.value[index].summary,
      content: data.content ? data.content.trim() : articles.value[index].content
    }

    setStorage('articles', articles.value)
    return true
  }

  function deleteArticle(id) {
    articles.value = articles.value.filter(a => a.id !== id)
    setStorage('articles', articles.value)
    return true
  }

  return {
    articles,
    categories,
    sortedArticles,
    getArticleById,
    addArticle,
    updateArticle,
    deleteArticle
  }
})
