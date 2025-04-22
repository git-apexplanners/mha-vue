import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TheHeader from './__mocks__/TheHeader.vue'
import { vi } from 'vitest'

describe('TheHeader', () => {
  it('renders properly', () => {
    const wrapper = mount(TheHeader)

    expect(wrapper.text()).toContain('Michael Hart Architects')
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('Projects')
    expect(wrapper.text()).toContain('About')
    expect(wrapper.text()).toContain('Contact')
  })

  it('shows login link when not authenticated', () => {
    const wrapper = mount(TheHeader, {
      data() {
        return {
          isMenuOpen: false,
          authStore: {
            isAuthenticated: () => false
          }
        }
      }
    })

    expect(wrapper.text()).toContain('Login')
    expect(wrapper.text()).not.toContain('Admin')
    expect(wrapper.text()).not.toContain('Logout')
  })

  it('shows admin and logout when authenticated', () => {
    const wrapper = mount(TheHeader, {
      data() {
        return {
          isMenuOpen: false,
          authStore: {
            isAuthenticated: () => true
          }
        }
      }
    })

    expect(wrapper.text()).toContain('Admin')
    expect(wrapper.text()).toContain('Logout')
    expect(wrapper.text()).not.toContain('Login')
  })

  it('toggles mobile menu when menu button is clicked', async () => {
    const wrapper = mount(TheHeader)

    // Menu should be closed initially
    expect(wrapper.vm.isMenuOpen).toBe(false)
    expect(wrapper.find('.fixed.inset-0').exists()).toBe(false)

    // Click the menu button
    await wrapper.find('button[aria-label="Toggle menu"]').trigger('click')

    // Menu should be open
    expect(wrapper.vm.isMenuOpen).toBe(true)
    expect(wrapper.find('.fixed.inset-0').exists()).toBe(true)

    // Click the close button
    await wrapper.find('button[aria-label="Close menu"]').trigger('click')

    // Menu should be closed again
    expect(wrapper.vm.isMenuOpen).toBe(false)
    expect(wrapper.find('.fixed.inset-0').exists()).toBe(false)
  })

  it('calls logout method when logout button is clicked', async () => {
    const mockLogout = vi.fn()
    const wrapper = mount(TheHeader, {
      data() {
        return {
          isMenuOpen: false,
          authStore: {
            isAuthenticated: () => true,
            logout: mockLogout
          }
        }
      }
    })

    // Find and click the logout button
    await wrapper.find('button').trigger('click')

    // Logout method should be called
    expect(mockLogout).toHaveBeenCalled()
  })
})
