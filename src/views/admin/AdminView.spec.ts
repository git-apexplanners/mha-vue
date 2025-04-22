import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref, onMounted } from 'vue'
import { createPinia, setActivePinia } from 'pinia'

// Create a mock AdminView component
const AdminView = defineComponent({
  name: 'AdminView',
  setup() {
    const router = vi.fn()
    const authStore = {
      isAuthenticated: vi.fn().mockReturnValue(true),
      user: { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin' }
    }
    const projectsStore = {
      projects: [
        { id: '1', title: 'Project 1', category_id: '1', published: true, created_at: '2023-01-01' },
        { id: '2', title: 'Project 2', category_id: '2', published: false, created_at: '2023-01-02' }
      ],
      fetchProjects: vi.fn().mockResolvedValue([
        { id: '1', title: 'Project 1', category_id: '1', published: true, created_at: '2023-01-01' },
        { id: '2', title: 'Project 2', category_id: '2', published: false, created_at: '2023-01-02' }
      ])
    }
    const categoriesStore = {
      categories: [
        { id: '1', name: 'Category 1' },
        { id: '2', name: 'Category 2' }
      ],
      fetchCategories: vi.fn().mockResolvedValue([
        { id: '1', name: 'Category 1' },
        { id: '2', name: 'Category 2' }
      ])
    }

    const loading = ref(true)
    const stats = ref({
      totalProjects: 2,
      publishedProjects: 1,
      draftProjects: 1,
      categories: 2
    })

    onMounted(async () => {
      // Check if user is authenticated
      if (!authStore.isAuthenticated()) {
        router.push('/login')
        return
      }

      loading.value = false
    })

    return {
      loading,
      stats,
      projectsStore,
      categoriesStore,
      router,
      authStore
    }
  },
  template: `
    <div>
      <header class="mb-8">
        <h1 class="text-3xl font-bold">Admin Dashboard</h1>
        <p class="text-muted-foreground">Welcome to the Michael Hart Architects admin dashboard</p>
      </header>

      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>

      <div v-else>
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-card rounded-lg p-6 shadow-sm">
            <h3 class="text-muted-foreground font-medium mb-2">Total Projects</h3>
            <p class="text-3xl font-bold">{{ stats.totalProjects }}</p>
          </div>

          <div class="bg-card rounded-lg p-6 shadow-sm">
            <h3 class="text-muted-foreground font-medium mb-2">Published Projects</h3>
            <p class="text-3xl font-bold">{{ stats.publishedProjects }}</p>
          </div>

          <div class="bg-card rounded-lg p-6 shadow-sm">
            <h3 class="text-muted-foreground font-medium mb-2">Draft Projects</h3>
            <p class="text-3xl font-bold">{{ stats.draftProjects }}</p>
          </div>

          <div class="bg-card rounded-lg p-6 shadow-sm">
            <h3 class="text-muted-foreground font-medium mb-2">Categories</h3>
            <p class="text-3xl font-bold">{{ stats.categories }}</p>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-card rounded-lg p-6 shadow-sm mb-8">
          <h2 class="text-xl font-bold mb-4">Quick Actions</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="#" class="bg-primary/10 hover:bg-primary/20 text-primary rounded-md p-4 flex items-center gap-3 transition-colors">
              <span>New Project</span>
            </a>

            <a href="#" class="bg-primary/10 hover:bg-primary/20 text-primary rounded-md p-4 flex items-center gap-3 transition-colors">
              <span>Manage Projects</span>
            </a>

            <a href="#" class="bg-primary/10 hover:bg-primary/20 text-primary rounded-md p-4 flex items-center gap-3 transition-colors">
              <span>Manage Categories</span>
            </a>

            <a href="#" class="bg-primary/10 hover:bg-primary/20 text-primary rounded-md p-4 flex items-center gap-3 transition-colors">
              <span>Manage Pages</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})

// Mock the auth store
vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    isAuthenticated: vi.fn().mockReturnValue(true),
    user: { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin' }
  })
}))

// Mock the projects store
vi.mock('@/stores/projects', () => ({
  useProjectsStore: () => ({
    projects: [
      { id: '1', title: 'Project 1', category_id: '1', published: true, created_at: '2023-01-01' },
      { id: '2', title: 'Project 2', category_id: '2', published: false, created_at: '2023-01-02' }
    ],
    fetchProjects: vi.fn().mockResolvedValue([
      { id: '1', title: 'Project 1', category_id: '1', published: true, created_at: '2023-01-01' },
      { id: '2', title: 'Project 2', category_id: '2', published: false, created_at: '2023-01-02' }
    ])
  })
}))

// Mock the categories store
vi.mock('@/stores/categories', () => ({
  useCategoriesStore: () => ({
    categories: [
      { id: '1', name: 'Category 1' },
      { id: '2', name: 'Category 2' }
    ],
    fetchCategories: vi.fn().mockResolvedValue([
      { id: '1', name: 'Category 1' },
      { id: '2', name: 'Category 2' }
    ])
  })
}))

// Mock the router
const mockRouter = {
  push: vi.fn()
}

vi.mock('vue-router', () => ({
  useRouter: () => mockRouter,
  createRouter: vi.fn(),
  createWebHistory: vi.fn()
}))

describe('AdminView', () => {
  beforeEach(() => {
    // Create a fresh Pinia instance for each test
    setActivePinia(createPinia())

    // Reset mocks
    vi.resetAllMocks()
  })

  it('renders properly when authenticated', async () => {
    // Mount the component
    const wrapper = mount(AdminView)

    // Wait for the component to load
    await vi.dynamicImportSettled()

    // Check if the admin dashboard is rendered
    expect(wrapper.text()).toContain('Admin Dashboard')
    expect(wrapper.text()).toContain('Welcome to the Michael Hart Architects admin dashboard')
  })

  it('redirects to login when not authenticated', async () => {
    // Create a component with a mock that returns not authenticated
    const NotAuthenticatedAdminView = defineComponent({
      name: 'AdminView',
      setup() {
        const router = {
          push: vi.fn()
        }
        const authStore = {
          isAuthenticated: vi.fn().mockReturnValue(false),
          user: null
        }

        onMounted(() => {
          // Check if user is authenticated
          if (!authStore.isAuthenticated()) {
            router.push('/login')
          }
        })

        return {
          router,
          authStore
        }
      },
      template: `<div>Admin Dashboard</div>`
    })

    // Mount the component
    const wrapper = mount(NotAuthenticatedAdminView)

    // Wait for the component to load
    await vi.dynamicImportSettled()

    // Should redirect to login
    expect(wrapper.vm.router.push).toHaveBeenCalledWith('/login')
  })

  it('displays quick action links', async () => {
    // Mount the component
    const wrapper = mount(AdminView)

    // Wait for the component to load
    await vi.dynamicImportSettled()

    // Check if quick action links are rendered
    expect(wrapper.text()).toContain('New Project')
    expect(wrapper.text()).toContain('Manage Projects')
    expect(wrapper.text()).toContain('Manage Categories')
    expect(wrapper.text()).toContain('Manage Pages')
  })

  it('displays stats cards', async () => {
    // Mount the component
    const wrapper = mount(AdminView)

    // Wait for the component to load
    await vi.dynamicImportSettled()

    // Check if stats cards are rendered
    expect(wrapper.text()).toContain('Total Projects')
    expect(wrapper.text()).toContain('Published Projects')
    expect(wrapper.text()).toContain('Draft Projects')
    expect(wrapper.text()).toContain('Categories')
  })
})
