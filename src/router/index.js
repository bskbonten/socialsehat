import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

// Public views
import LandingView from '@/views/LandingView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

// Masyarakat views
import DashboardView from '@/views/DashboardView.vue'
import MonitoringView from '@/views/MonitoringView.vue'
import ReportsView from '@/views/ReportsView.vue'
import CreateReportView from '@/views/CreateReportView.vue'
import ReportDetailView from '@/views/ReportDetailView.vue'
import MapView from '@/views/MapView.vue'
import EducationView from '@/views/EducationView.vue'
import EducationDetailView from '@/views/EducationDetailView.vue'
import ForumView from '@/views/ForumView.vue'
import ForumDetailView from '@/views/ForumDetailView.vue'
import NotificationsView from '@/views/NotificationsView.vue'
import ProfileView from '@/views/ProfileView.vue'

// Admin views
import AdminDashboardView from '@/views/admin/AdminDashboardView.vue'
import AdminReportsView from '@/views/admin/AdminReportsView.vue'
import AdminEducationView from '@/views/admin/AdminEducationView.vue'
import AdminWarningView from '@/views/admin/AdminWarningView.vue'

const routes = [
  // Public
  {
    path: '/',
    name: 'landing',
    component: LandingView,
    meta: { publicOnlyOnLoginCheck: false }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { guestOnly: true }
  },

  // Masyarakat Protected
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/monitoring',
    name: 'monitoring',
    component: MonitoringView,
    meta: { requiresAuth: true }
  },
  {
    path: '/laporan',
    name: 'reports',
    component: ReportsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/laporan/buat',
    name: 'create-report',
    component: CreateReportView,
    meta: { requiresAuth: true }
  },
  {
    path: '/laporan/:id',
    name: 'report-detail',
    component: ReportDetailView,
    meta: { requiresAuth: true }
  },
  {
    path: '/peta',
    name: 'map',
    component: MapView,
    meta: { requiresAuth: true }
  },
  {
    path: '/edukasi',
    name: 'education',
    component: EducationView,
    meta: { requiresAuth: true }
  },
  {
    path: '/edukasi/:id',
    name: 'education-detail',
    component: EducationDetailView,
    meta: { requiresAuth: true }
  },
  {
    path: '/forum',
    name: 'forum',
    component: ForumView,
    meta: { requiresAuth: true }
  },
  {
    path: '/forum/:id',
    name: 'forum-detail',
    component: ForumDetailView,
    meta: { requiresAuth: true }
  },
  {
    path: '/notifikasi',
    name: 'notifications',
    component: NotificationsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/profil',
    name: 'profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  },

  // Admin Protected
  {
    path: '/admin',
    redirect: '/admin/dashboard'
  },
  {
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: AdminDashboardView,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/laporan',
    name: 'admin-reports',
    component: AdminReportsView,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/edukasi',
    name: 'admin-education',
    component: AdminEducationView,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/warning',
    name: 'admin-warning',
    component: AdminWarningView,
    meta: { requiresAuth: true, requiresAdmin: true }
  },

  // Catch all
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation Guard (Route Guard)
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // 1. Jika halaman hanya untuk guest (login & register) dan user sudah login
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    if (authStore.isAdmin) {
      return next('/admin/dashboard')
    }
    return next('/dashboard')
  }

  // 2. Jika halaman membutuhkan autentikasi dan user belum login
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }

  // 3. Jika halaman admin tetapi user bukan admin
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    return next('/dashboard')
  }

  next()
})

export default router
