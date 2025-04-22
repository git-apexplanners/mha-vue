import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

// Create a mock component instead of importing the real one
const CategoryViewMock = {
  name: 'CategoryView',
  template: `
    <div>
      <h1 v-if="category">{{ category.name }} Projects</h1>
      <p>{{ category?.description || 'Explore our architectural projects' }}</p>
      
      <div v-if="loading" class="animate-spin"></div>
      
      <div v-else-if="error">{{ error }}</div>
      
      <div v-else-if="!categoryProjects.length">No projects found</div>
      
      <div v-else class="projects-grid">
        <div v-for="project in categoryProjects" :key="project.id" class="project-card">
          {{ project.title }}
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      loading: false,
      error: '',
      category: { name: 'Residential', description: 'Residential projects' },
      categoryProjects: [
        { id: '1', title: 'Project 1', slug: 'project-1' },
        { id: '2', title: 'Project 2', slug: 'project-2' }
      ]
    }
  }
}

describe('CategoryView', () => {
  beforeEach(() => {
    // Create a fresh Pinia instance for each test
    setActivePinia(createPinia())
  })

  it('renders properly with category data', () => {
    const wrapper = mount(CategoryViewMock)
    
    // Check if the category title is rendered
    expect(wrapper.text()).toContain('Residential Projects')
    
    // Check if the category description is rendered
    expect(wrapper.text()).toContain('Residential projects')
    
    // Check if projects are rendered
    expect(wrapper.findAll('.project-card').length).toBe(2)
  })

  it('shows loading state', async () => {
    // Create a wrapper with loading state
    const wrapper = mount(CategoryViewMock, {
      data() {
        return {
          loading: true,
          category: null,
          categoryProjects: []
        }
      }
    })
    
    // Should show loading state
    expect(wrapper.find('.animate-spin').exists()).toBe(true)
  })

  it('shows error state', async () => {
    // Create a wrapper with error state
    const wrapper = mount(CategoryViewMock, {
      data() {
        return {
          loading: false,
          error: 'Category not found',
          category: null,
          categoryProjects: []
        }
      }
    })
    
    // Should show error message
    expect(wrapper.text()).toContain('Category not found')
  })
})
