import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AdminSidebar from './__mocks__/AdminSidebar.vue'

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

describe('AdminSidebar', () => {
  it('renders properly', () => {
    const wrapper = mount(AdminSidebar)

    // Check if the sidebar is rendered
    expect(wrapper.find('div.h-screen').exists()).toBe(true)

    // Check if the title is rendered
    expect(wrapper.text()).toContain('Admin')

    // Check if user info is rendered
    expect(wrapper.text()).toContain('Admin User')
    expect(wrapper.text()).toContain('admin')

    // Check if navigation items are rendered
    expect(wrapper.text()).toContain('Dashboard')
    expect(wrapper.text()).toContain('Projects')
    expect(wrapper.text()).toContain('Pages')
    expect(wrapper.text()).toContain('Categories')
    expect(wrapper.text()).toContain('Navigation Menu')
    expect(wrapper.text()).toContain('Quick Create')
    expect(wrapper.text()).toContain('Users')

    // Check if sign out button is rendered
    expect(wrapper.text()).toContain('Sign Out')
  })

  it('toggles sidebar expansion', async () => {
    const wrapper = mount(AdminSidebar)

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
    const wrapper = mount(AdminSidebar)

    // Initially not expanded
    expect(wrapper.vm.isExpanded).toBe(false)

    // Mouse enter
    await wrapper.find('div.h-screen').trigger('mouseenter')

    // Should be expanded
    expect(wrapper.vm.isExpanded).toBe(true)
  })

  it('collapses on mouse leave', async () => {
    const wrapper = mount(AdminSidebar)

    // Set expanded
    await wrapper.setData({ isExpanded: true })

    // Mouse leave
    await wrapper.find('div.h-screen').trigger('mouseleave')

    // Should be collapsed
    expect(wrapper.vm.isExpanded).toBe(false)
  })

  it('toggles submenu', async () => {
    const wrapper = mount(AdminSidebar)

    // Set expanded
    await wrapper.setData({ isExpanded: true })

    // Initially submenu is closed
    expect(wrapper.vm.openItems).toEqual({})

    // Click on submenu button (Quick Create)
    const submenuButtons = wrapper.findAll('button')
    const quickCreateButton = submenuButtons.find(button => button.text().includes('Quick Create'))
    await quickCreateButton.trigger('click')

    // Quick Create submenu should be open
    expect(wrapper.vm.openItems['Quick Create']).toBe(true)

    // Click again to close
    await quickCreateButton.trigger('click')

    // Quick Create submenu should be closed
    expect(wrapper.vm.openItems['Quick Create']).toBe(false)
  })

  it('calls logout when sign out is clicked', async () => {
    const wrapper = mount(AdminSidebar)
    const authStore = wrapper.vm.authStore

    // Click sign out button
    const signOutButton = wrapper.findAll('button').find(button => button.text().includes('Sign Out'))
    await signOutButton.trigger('click')

    // Should call logout
    expect(authStore.logout).toHaveBeenCalled()
  })
})
