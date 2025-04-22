import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import axios from 'axios'

// Mock axios
vi.mock('axios')

// Create a mock for the projects store
const mockProjects = [
  { id: '1', title: 'Project 1', description: 'Description 1', slug: 'project-1', content: null, featured_image: null, main_image_url: null, gallery_image_urls: null, category_id: '1', published: true, created_at: '2023-01-01', updated_at: '2023-01-01' },
  { id: '2', title: 'Project 2', description: 'Description 2', slug: 'project-2', content: null, featured_image: null, main_image_url: null, gallery_image_urls: null, category_id: '1', published: true, created_at: '2023-01-01', updated_at: '2023-01-01' },
  { id: '3', title: 'Project 3', description: 'Description 3', slug: 'project-3', content: null, featured_image: null, main_image_url: null, gallery_image_urls: null, category_id: '1', published: false, created_at: '2023-01-01', updated_at: '2023-01-01' }
]

// Import the store after mocking dependencies
import { useProjectsStore } from '@/stores/projects'

describe('Store and API Integration', () => {
  beforeEach(() => {
    // Create a fresh Pinia instance for each test
    setActivePinia(createPinia())

    // Reset mocks
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('fetches projects from API and updates store', async () => {
    // Mock API response
    vi.mocked(axios.get).mockResolvedValue({ data: mockProjects })

    // Get the store
    const store = useProjectsStore()

    // Initial state should be empty
    expect(store.projects).toEqual([])

    // Fetch projects
    await store.fetchProjects()

    // API should have been called
    expect(axios.get).toHaveBeenCalledWith('/api/projects')

    // Store should be updated with projects
    expect(store.projects).toEqual(mockProjects)
  })

  it('creates a new project via API and updates store', async () => {
    // New project data
    const newProject = { title: 'New Project', description: 'New Description', slug: 'new-project', published: true }

    // Mock API response
    const createdProject = { id: '4', ...newProject, content: null, featured_image: null, main_image_url: null, gallery_image_urls: null, category_id: '1', created_at: '2023-01-01', updated_at: '2023-01-01' }
    vi.mocked(axios.post).mockResolvedValue({ data: createdProject })

    // Get the store
    const store = useProjectsStore()

    // Create project
    await store.createProject(newProject)

    // API should have been called with correct data
    expect(axios.post).toHaveBeenCalledWith('/api/projects', newProject)

    // Projects array should contain the new project
    expect(store.projects).toContainEqual(createdProject)
  })

  it('updates an existing project via API', async () => {
    // Updated project data
    const updatedProject = { id: '1', title: 'Updated Project', description: 'Updated Description', slug: 'updated-project', published: true }

    // Mock API response
    vi.mocked(axios.put).mockResolvedValue({ data: updatedProject })

    // Get the store
    const store = useProjectsStore()

    // Set initial projects
    store.projects = [...mockProjects]

    // Update project
    await store.updateProject('1', updatedProject)

    // API should have been called with correct data
    expect(axios.put).toHaveBeenCalledWith('/api/projects/1', updatedProject)
  })

  it('deletes a project via API', async () => {
    // Mock API response
    vi.mocked(axios.delete).mockResolvedValue({ data: { success: true } })

    // Get the store
    const store = useProjectsStore()

    // Set initial projects
    store.projects = [...mockProjects]

    // Delete project
    await store.deleteProject('1')

    // API should have been called with correct ID
    expect(axios.delete).toHaveBeenCalledWith('/api/projects/1')

    // Project should be removed from the array
    expect(store.projects.find(p => p.id === '1')).toBeUndefined()
  })

  it('handles API errors gracefully', async () => {
    // Mock API error
    const error = new Error('API Error')
    vi.mocked(axios.get).mockRejectedValue(error)

    // Get the store
    const store = useProjectsStore()

    // Fetch projects (should fail)
    await store.fetchProjects()

    // API should have been called
    expect(axios.get).toHaveBeenCalledWith('/api/projects')

    // Store should have error state
    expect(store.error).toBeTruthy()

    // Projects should still be empty
    expect(store.projects).toEqual([])
  })
})
