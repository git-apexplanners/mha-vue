import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
// All routes are lazy-loaded for better performance

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/portfolio/ProjectsView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/projects/:id',
      name: 'project-detail',
      component: () => import('../views/portfolio/ProjectDetailView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: { layout: 'auth' }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminView.vue'),
      meta: { layout: 'default', requiresAuth: true }
    },
    {
      path: '/admin/projects',
      name: 'admin-projects',
      component: () => import('../views/admin/ProjectsView.vue'),
      meta: { layout: 'default', requiresAuth: true }
    },
    {
      path: '/admin/projects/:id',
      name: 'admin-project-form',
      component: () => import('../views/admin/ProjectFormView.vue'),
      meta: { layout: 'default', requiresAuth: true }
    },
    {
      path: '/admin/categories',
      name: 'admin-categories',
      component: () => import('../views/admin/CategoriesView.vue'),
      meta: { layout: 'default', requiresAuth: true }
    },
    {
      path: '/admin/pages',
      name: 'admin-pages',
      component: () => import('../views/admin/PagesView.vue'),
      meta: { layout: 'default', requiresAuth: true }
    },
    {
      path: '/admin/pages/:id',
      name: 'admin-page-form',
      component: () => import('../views/admin/PageFormView.vue'),
      meta: { layout: 'default', requiresAuth: true }
    },
    {
      path: '/pages/:slug',
      name: 'page',
      component: () => import('../views/PageView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('../views/admin/UsersView.vue'),
      meta: { layout: 'default', requiresAuth: true, requiredRole: 'admin' }
    },
    {
      path: '/admin/users/:id',
      name: 'admin-user-form',
      component: () => import('../views/admin/UserFormView.vue'),
      meta: { layout: 'default', requiresAuth: true, requiredRole: 'admin' }
    },
    // Info page
    {
      path: '/info',
      name: 'info',
      component: () => import('../views/InfoView.vue'),
      meta: { layout: 'default' }
    },
    // Portfolio pages
    {
      path: '/portfolio',
      name: 'portfolio',
      component: () => import('../views/portfolio/PortfolioView.vue'),
      meta: { layout: 'default' }
    },
    // Architecture pages
    {
      path: '/portfolio/architecture',
      name: 'architecture',
      component: () => import('../views/portfolio/architecture/ArchitectureView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/portfolio/architecture/private-residences',
      name: 'private-residences',
      component: () => import('../views/portfolio/architecture/PrivateResidencesView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/portfolio/architecture/housing',
      name: 'housing',
      component: () => import('../views/portfolio/architecture/HousingView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/portfolio/architecture/housing/social',
      name: 'social-housing',
      component: () => import('../views/portfolio/architecture/housing/SocialView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/portfolio/architecture/housing/pdp',
      name: 'pdp-housing',
      component: () => import('../views/portfolio/architecture/housing/PDPView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/portfolio/architecture/housing/cruwmbs',
      name: 'cruwmbs-housing',
      component: () => import('../views/portfolio/architecture/housing/CRUWMBSView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/portfolio/architecture/counseling',
      name: 'counseling',
      component: () => import('../views/portfolio/architecture/CounselingView.vue'),
      meta: { layout: 'default' }
    },
    // Urban Design pages
    {
      path: '/portfolio/urban-design',
      name: 'urban-design',
      component: () => import('../views/portfolio/urban-design/UrbanDesignView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/portfolio/urban-design/heritage',
      name: 'heritage',
      component: () => import('../views/portfolio/urban-design/heritage/HeritageView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/portfolio/urban-design/heritage/community-projects',
      name: 'community-projects',
      component: () => import('../views/portfolio/urban-design/heritage/CommunityProjectsView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/portfolio/urban-design/regeneration',
      name: 'regeneration',
      component: () => import('../views/portfolio/urban-design/regeneration/RegenerationView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/portfolio/urban-design/regeneration/udf',
      name: 'udf',
      component: () => import('../views/portfolio/urban-design/regeneration/UDFView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/portfolio/urban-design/informal-settlement',
      name: 'informal-settlement',
      component: () => import('../views/portfolio/urban-design/InformalSettlementView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/portfolio/urban-design/neighborhood',
      name: 'neighborhood',
      component: () => import('../views/portfolio/urban-design/NeighborhoodView.vue'),
      meta: { layout: 'default' }
    },
    // Design Process pages
    {
      path: '/design-process',
      name: 'design-process',
      component: () => import('../views/design-process/DesignProcessView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/design-process/corporate',
      name: 'corporate-design',
      component: () => import('../views/design-process/CorporateView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/design-process/residential',
      name: 'residential-design',
      component: () => import('../views/design-process/ResidentialView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/design-process/institutional',
      name: 'institutional-design',
      component: () => import('../views/design-process/InstitutionalView.vue'),
      meta: { layout: 'default' }
    },
    // Achievements page
    {
      path: '/achievements',
      name: 'achievements',
      component: () => import('../views/AboutView.vue'), // Temporarily using AboutView
      meta: { layout: 'default' }
    },
    // Publications page
    {
      path: '/publications',
      name: 'publications',
      component: () => import('../views/AboutView.vue'), // Temporarily using AboutView
      meta: { layout: 'default' }
    },
    // Services pages
    {
      path: '/services/residential',
      name: 'services-residential',
      component: () => import('../views/design-process/ResidentialView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/services/commercial',
      name: 'services-commercial',
      component: () => import('../views/design-process/CorporateView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/services/urban',
      name: 'services-urban',
      component: () => import('../views/portfolio/urban-design/UrbanDesignView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/services/interior',
      name: 'services-interior',
      component: () => import('../views/AboutView.vue'), // Temporarily using AboutView
      meta: { layout: 'default' }
    },
    // Team page
    {
      path: '/team',
      name: 'team',
      component: () => import('../views/AboutView.vue'), // Temporarily using AboutView
      meta: { layout: 'default' }
    },
    // Portfolio category pages
    {
      path: '/portfolio/residential',
      name: 'portfolio-residential',
      component: () => import('../views/portfolio/CategoryView.vue'),
      meta: { layout: 'default', categorySlug: 'residential' }
    },
    {
      path: '/portfolio/commercial',
      name: 'portfolio-commercial',
      component: () => import('../views/portfolio/CategoryView.vue'),
      meta: { layout: 'default', categorySlug: 'commercial' }
    }
  ]
})

// Navigation guard to check for authentication and authorization
router.beforeEach(async (to, from, next) => {
  // Check if the route requires authentication
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiredRole = to.matched.find(record => record.meta.requiredRole)?.meta.requiredRole

  if (requiresAuth) {
    // Get the auth store
    const authStore = useAuthStore()

    // Check if user is authenticated
    if (!authStore.isAuthenticated()) {
      // Redirect to login with the intended destination
      return next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }

    // If a specific role is required, check for it
    if (requiredRole) {
      // Make sure user data is loaded
      if (!authStore.user) {
        await authStore.getCurrentUser()
      }

      // Check if user has the required role
      if (!authStore.hasRole(requiredRole)) {
        // Redirect to admin dashboard if they don't have the required role
        return next({ path: '/admin' })
      }
    }
  }

  // If we made it here, allow navigation
  next()
})

export default router
