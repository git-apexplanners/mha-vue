import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useProjectsStore } from './__mocks__/projects'

// Mock API service
const api = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn()
}

vi.mock('@/services/api', () => ({
  default: api
}))

describe('Projects Store', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('initializes with empty projects array', () => {
    const store = useProjectsStore()
    expect(store.projects).toEqual([])
    expect(store.currentProject).toBeNull()
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('fetches projects successfully', async () => {
    const mockProjects = [
      { id: 1, title: 'Project 1', description: 'Description 1' },
      { id: 2, title: 'Project 2', description: 'Description 2' }
    ]

    // Mock the API response
    vi.mocked(api.get).mockResolvedValue({ data: mockProjects })

    const store = useProjectsStore()
    await store.fetchProjects()

    expect(api.get).toHaveBeenCalledWith('/projects')
    expect(store.projects).toEqual(mockProjects)
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('handles error when fetching projects', async () => {
    const errorMessage = 'Failed to fetch projects'

    // Mock the API error
    vi.mocked(api.get).mockRejectedValue(new Error(errorMessage))

    const store = useProjectsStore()
    await store.fetchProjects()

    expect(api.get).toHaveBeenCalledWith('/projects')
    expect(store.projects).toEqual([])
    expect(store.isLoading).toBe(false)
    expect(store.error).toBe(errorMessage)
  })

  it('fetches a single project by ID', async () => {
    const mockProject = { id: 1, title: 'Project 1', description: 'Description 1' }

    // Mock the API response
    vi.mocked(api.get).mockResolvedValue({ data: mockProject })

    const store = useProjectsStore()
    await store.fetchProject(1)

    expect(api.get).toHaveBeenCalledWith('/projects/1')
    expect(store.currentProject).toEqual(mockProject)
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('creates a new project', async () => {
    const newProject = { title: 'New Project', description: 'New Description' }
    const createdProject = { id: 3, ...newProject }

    // Mock the API response
    vi.mocked(api.post).mockResolvedValue({ data: createdProject })

    const store = useProjectsStore()
    await store.createProject(newProject)

    expect(api.post).toHaveBeenCalledWith('/projects', newProject)
    expect(store.currentProject).toEqual(createdProject)
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('updates an existing project', async () => {
    const updatedProject = { id: 1, title: 'Updated Project', description: 'Updated Description' }

    // Mock the API response
    vi.mocked(api.put).mockResolvedValue({ data: updatedProject })

    const store = useProjectsStore()
    await store.updateProject(updatedProject)

    expect(api.put).toHaveBeenCalledWith('/projects/1', updatedProject)
    expect(store.currentProject).toEqual(updatedProject)
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('deletes a project', async () => {
    // Mock the API response
    vi.mocked(api.delete).mockResolvedValue({ data: { success: true } })

    const store = useProjectsStore()
    await store.deleteProject(1)

    expect(api.delete).toHaveBeenCalledWith('/projects/1')
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
  })
})
