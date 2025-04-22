import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import axios from 'axios'

// Mock axios
vi.mock('axios')

// Create a mock for the projects store
const mockProjects = [
  { id: 1, title: 'Project 1', description: 'Description 1', published: true },
  { id: 2, title: 'Project 2', description: 'Description 2', published: true },
  { id: 3, title: 'Project 3', description: 'Description 3', published: false }
]

// Create a mock for the API service
const mockApiService = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn()
}

// Mock the API service
vi.mock('@/services/api', () => ({
  default: mockApiService
}))

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
    mockApiService.get.mockResolvedValue({ data: mockProjects })

    // Get the store
    const store = useProjectsStore()

    // Initial state should be empty
    expect(store.projects).toEqual([])

    // Fetch projects
    await store.fetchProjects()

    // API should have been called
    expect(mockApiService.get).toHaveBeenCalledWith('/projects')

    // Store should be updated with projects
    expect(store.projects).toEqual(mockProjects)
  })

  it('creates a new project via API and updates store', async () => {
    // New project data
    const newProject = { title: 'New Project', description: 'New Description', published: true }

    // Mock API response
    const createdProject = { id: 4, ...newProject }
    mockApiService.post.mockResolvedValue({ data: createdProject })

    // Get the store
    const store = useProjectsStore()

    // Create project
    await store.createProject(newProject)

    // API should have been called with correct data
    expect(mockApiService.post).toHaveBeenCalledWith('/projects', newProject)

    // Current project should be set to the created project
    expect(store.currentProject).toEqual(createdProject)
  })

  it('updates an existing project via API', async () => {
    // Updated project data
    const updatedProject = { id: 1, title: 'Updated Project', description: 'Updated Description', published: true }

    // Mock API response
    mockApiService.put.mockResolvedValue({ data: updatedProject })

    // Get the store
    const store = useProjectsStore()

    // Update project
    await store.updateProject(updatedProject)

    // API should have been called with correct data
    expect(mockApiService.put).toHaveBeenCalledWith('/projects/1', updatedProject)

    // Current project should be set to the updated project
    expect(store.currentProject).toEqual(updatedProject)
  })

  it('deletes a project via API', async () => {
    // Mock API response
    mockApiService.delete.mockResolvedValue({ data: { success: true } })

    // Get the store
    const store = useProjectsStore()

    // Delete project
    await store.deleteProject(1)

    // API should have been called with correct ID
    expect(mockApiService.delete).toHaveBeenCalledWith('/projects/1')
  })

  it('handles API errors gracefully', async () => {
    // Mock API error
    const error = new Error('API Error')
    mockApiService.get.mockRejectedValue(error)

    // Get the store
    const store = useProjectsStore()

    // Fetch projects (should fail)
    await store.fetchProjects()

    // API should have been called
    expect(mockApiService.get).toHaveBeenCalledWith('/projects')

    // Store should have error state
    expect(store.error).toBeTruthy()

    // Projects should still be empty
    expect(store.projects).toEqual([])
  })
})
