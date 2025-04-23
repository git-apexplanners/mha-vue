import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UserSidebar from './UserSidebar.vue'

// Mock the router and auth store
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  }),
  useRoute: () => ({
    path: '/admin'
  })
}))

vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    isAuthenticated: () => true,
    isAdmin: true,
    logout: vi.fn(),
    user: {
      id: '1',
      name: 'Admin User',
      email: 'admin@test.co.za',
      role: 'admin'
    }
  })
}))

describe('UserSidebar', () => {
  it('renders properly', () => {
    const wrapper = mount(UserSidebar)
    
    // Check if the sidebar is rendered
    expect(wrapper.find('div.h-screen').exists()).toBe(true)
    
    // Check if the title is rendered
    expect(wrapper.text()).toContain('User Menu')
    
    // Check if navigation items are rendered
    expect(wrapper.text()).toContain('Dashboard')
    expect(wrapper.text()).toContain('Projects')
    expect(wrapper.text()).toContain('Pages')
    expect(wrapper.text()).toContain('Categories')
    
    // Check if sign out button is rendered
    expect(wrapper.text()).toContain('Sign Out')
  })
  
  it('toggles sidebar expansion', async () => {
    const wrapper = mount(UserSidebar)
    
    // Initially not expanded
    expect(wrapper.vm.isExpanded).toBe(false)
    
    // Toggle sidebar
    await wrapper.find('button[aria-label="Toggle sidebar"]').trigger('click')
    
    // Should be expanded
    expect(wrapper.vm.isExpanded).toBe(true)
    
    // Toggle again
    await wrapper.find('button[aria-label="Toggle sidebar"]').trigger('click')
    
    // Should be collapsed
    expect(wrapper.vm.isExpanded).toBe(false)
  })
  
  it('expands on mouse enter', async () => {
    const wrapper = mount(UserSidebar)
    
    // Initially not expanded
    expect(wrapper.vm.isExpanded).toBe(false)
    
    // Mouse enter
    await wrapper.find('div.h-screen').trigger('mouseenter')
    
    // Should be expanded
    expect(wrapper.vm.isExpanded).toBe(true)
  })
  
  it('collapses on mouse leave', async () => {
    const wrapper = mount(UserSidebar)
    
    // Set expanded
    await wrapper.setData({ isExpanded: true })
    
    // Mouse leave
    await wrapper.find('div.h-screen').trigger('mouseleave')
    
    // Should be collapsed
    expect(wrapper.vm.isExpanded).toBe(false)
  })
  
  it('calls logout when sign out is clicked', async () => {
    const wrapper = mount(UserSidebar)
    const authStore = wrapper.vm.authStore
    
    // Click sign out button
    await wrapper.find('button').trigger('click')
    
    // Should call logout
    expect(authStore.logout).toHaveBeenCalled()
  })
})
