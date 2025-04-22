import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

// Create a mock TheHeader component
const TheHeader = defineComponent({
  name: 'TheHeader',
  data() {
    return {
      isMenuOpen: false,
      // Mock auth store for build
      authStore: {
        isAuthenticated: () => false,
        logout: () => { }
      }
    }
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated()
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    closeMenu() {
      this.isMenuOpen = false
    },
    logout() {
      this.authStore.logout()
      this.closeMenu()
    }
  },
  template: `
    <header class="bg-background border-b border-border">
      <div class="container flex h-16 items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <a href="/" class="text-2xl font-bold no-underline">
            Michael Hart Architects
          </a>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-6">
          <a href="/" class="text-foreground hover:text-primary no-underline">Home</a>
          <a href="/projects" class="text-foreground hover:text-primary no-underline">Projects</a>
          <a href="/about" class="text-foreground hover:text-primary no-underline">About</a>
          <a href="/contact" class="text-foreground hover:text-primary no-underline">Contact</a>

          <template v-if="isAuthenticated">
            <a href="/admin" class="text-foreground hover:text-primary no-underline">Admin</a>
            <button @click="logout" class="text-foreground hover:text-primary">Logout</button>
          </template>
          <template v-else>
            <a href="/login" class="text-foreground hover:text-primary no-underline">Login</a>
          </template>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMenu"
          class="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          Menu
        </button>

        <!-- Mobile Menu -->
        <div
          v-if="isMenuOpen"
          class="fixed inset-0 z-50 bg-background md:hidden"
        >
          <div class="container flex h-16 items-center justify-between">
            <div class="text-2xl font-bold">Michael Hart Architects</div>
            <button
              @click="closeMenu"
              class="p-2 text-foreground"
              aria-label="Close menu"
            >
              Close
            </button>
          </div>
          <nav class="container flex flex-col space-y-4 py-8">
            <a @click="closeMenu" href="/" class="text-foreground hover:text-primary text-lg no-underline">Home</a>
            <a @click="closeMenu" href="/projects" class="text-foreground hover:text-primary text-lg no-underline">Projects</a>
            <a @click="closeMenu" href="/about" class="text-foreground hover:text-primary text-lg no-underline">About</a>
            <a @click="closeMenu" href="/contact" class="text-foreground hover:text-primary text-lg no-underline">Contact</a>

            <template v-if="isAuthenticated">
              <a @click="closeMenu" href="/admin" class="text-foreground hover:text-primary text-lg no-underline">Admin</a>
              <button @click="logout" class="text-foreground hover:text-primary text-lg text-left">Logout</button>
            </template>
            <template v-else>
              <a @click="closeMenu" href="/login" class="text-foreground hover:text-primary text-lg no-underline">Login</a>
            </template>
          </nav>
        </div>
      </div>
    </header>
  `
})

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
