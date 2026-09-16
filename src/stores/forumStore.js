import { defineStore } from 'pinia'
import { ref } from 'vue'
import { initialForumPosts } from '@/data/forum'
import { getStorage, setStorage } from '@/utils/storage'
import { useAuthStore } from './authStore'

export const useForumStore = defineStore('forum', () => {
  const posts = ref(getStorage('forum_posts', initialForumPosts))

  if (!getStorage('forum_posts')) {
    setStorage('forum_posts', posts.value)
  }

  const authStore = useAuthStore()

  function getPostById(id) {
    return posts.value.find(p => p.id === id)
  }

  function addPost(title, content, category = 'Kebersihan') {
    const user = authStore.currentUser
    const newPost = {
      id: `post-${Date.now()}`,
      authorId: user?.id || 'user-001',
      authorName: user?.name || 'Warga Sehat',
      authorAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      title: title.trim(),
      category: category,
      content: content.trim(),
      createdAt: new Date().toISOString(),
      likes: 1,
      comments: []
    }

    posts.value.unshift(newPost)
    setStorage('forum_posts', posts.value)
    return newPost
  }

  function addComment(postId, commentText) {
    const post = posts.value.find(p => p.id === postId)
    if (!post) return false

    const user = authStore.currentUser
    const newComment = {
      id: `c-${Date.now()}`,
      authorName: user?.name || 'Warga Sehat',
      authorAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      content: commentText.trim(),
      createdAt: new Date().toISOString()
    }

    if (!Array.isArray(post.comments)) {
      post.comments = []
    }

    post.comments.push(newComment)
    setStorage('forum_posts', posts.value)
    return newComment
  }

  function toggleLike(postId) {
    const post = posts.value.find(p => p.id === postId)
    if (post) {
      post.likes = (post.likes || 0) + 1
      setStorage('forum_posts', posts.value)
    }
  }

  return {
    posts,
    getPostById,
    addPost,
    addComment,
    toggleLike
  }
})
