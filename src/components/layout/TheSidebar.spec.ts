import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TheSidebar from './TheSidebar.vue'

// Mock the router and navigation composable
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  }),
  useRoute: () => ({
    path: '/'
  })
}))

vi.mock('@/composables/useNavigation', () => ({
  useNavigation: () => ({
    navigationItems: [
      { name: 'Home', href: '/', icon: 'home' },
      { name: 'About', href: '/about', icon: 'user' }
    ],
    isActive: (href) => href === '/',
    isActiveParent: () => false
  })
}))

describe('TheSidebar', () => {
  it('renders properly', () => {
    const wrapper = mount(TheSidebar)

    // Check if sidebar is rendered
    expect(wrapper.find('nav').exists()).toBe(true)

    // Check if navigation items are rendered
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('About')
  })

  it('expands on mouse enter', async () => {
    const wrapper = mount(TheSidebar)

    // Initially collapsed
    expect(wrapper.classes()).toContain('w-[72px]')

    // Trigger mouse enter
    await wrapper.trigger('mouseenter')

    // Should be expanded
    expect(wrapper.classes()).toContain('w-60')
  })
})
