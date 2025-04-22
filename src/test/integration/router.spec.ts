import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { defineComponent } from 'vue'

// Create mock components for testing
const Home = defineComponent({
  template: '<div>Home Page</div>'
})

const About = defineComponent({
  template: '<div>About Page</div>'
})

const Protected = defineComponent({
  template: '<div>Protected Page</div>'
})

const NotFound = defineComponent({
  template: '<div>404 Page</div>'
})

// Create a mock App component
const App = defineComponent({
  template: `
    <div>
      <router-view></router-view>
    </div>
  `
})

// Create mock auth store
const useAuthStore = vi.fn(() => ({
  isAuthenticated: vi.fn(() => false),
  user: null,
  token: null
}))

vi.mock('@/stores/auth', () => ({
  useAuthStore
}))

describe('Router Integration', () => {
  let router: any

  beforeEach(() => {
    // Create a fresh Pinia instance for each test
    setActivePinia(createPinia())
    
    // Create routes
    const routes: RouteRecordRaw[] = [
      { path: '/', component: Home },
      { path: '/about', component: About },
      { 
        path: '/protected', 
        component: Protected,
        meta: { requiresAuth: true }
      },
      { path: '/:pathMatch(.*)*', component: NotFound }
    ]
    
    // Create router instance
    router = createRouter({
      history: createWebHistory(),
      routes
    })
    
    // Add navigation guard
    router.beforeEach((to: any, from: any, next: any) => {
      const authStore = useAuthStore()
      
      if (to.meta.requiresAuth && !authStore.isAuthenticated()) {
        next('/')
      } else {
        next()
      }
    })
  })

  it('navigates to home page', async () => {
    // Mount the app with router
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
    
    // Navigate to home
    await router.push('/')
    await router.isReady()
    
    // Check if home page is rendered
    expect(wrapper.html()).toContain('Home Page')
  })

  it('navigates to about page', async () => {
    // Mount the app with router
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
    
    // Navigate to about
    await router.push('/about')
    await router.isReady()
    
    // Check if about page is rendered
    expect(wrapper.html()).toContain('About Page')
  })

  it('redirects from protected page when not authenticated', async () => {
    // Mock auth store to return not authenticated
    useAuthStore.mockImplementation(() => ({
      isAuthenticated: () => false,
      user: null,
      token: null
    }))
    
    // Mount the app with router
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
    
    // Try to navigate to protected page
    await router.push('/protected')
    await router.isReady()
    
    // Should be redirected to home
    expect(wrapper.html()).toContain('Home Page')
    expect(wrapper.html()).not.toContain('Protected Page')
  })

  it('allows access to protected page when authenticated', async () => {
    // Mock auth store to return authenticated
    useAuthStore.mockImplementation(() => ({
      isAuthenticated: () => true,
      user: { id: 1, name: 'Test User', role: 'admin' },
      token: 'fake-token'
    }))
    
    // Mount the app with router
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
    
    // Navigate to protected page
    await router.push('/protected')
    await router.isReady()
    
    // Should render protected page
    expect(wrapper.html()).toContain('Protected Page')
  })

  it('shows 404 page for non-existent routes', async () => {
    // Mount the app with router
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
    
    // Navigate to non-existent route
    await router.push('/non-existent-page')
    await router.isReady()
    
    // Should render 404 page
    expect(wrapper.html()).toContain('404 Page')
  })
})
