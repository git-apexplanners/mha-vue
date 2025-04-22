import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProjectsStore } from './projects'
import axios from 'axios'

// Mock axios
vi.mock('axios')

describe('Projects Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.resetAllMocks()
  })

  it('initializes with empty projects array', () => {
    const store = useProjectsStore()
    expect(store.projects).toEqual([])
    expect(store.currentProject).toBeNull()
    expect(store.loading).toBe(false)
    expect(store.error).toBe('')
  })

  it('fetches projects successfully', async () => {
    const mockProjects = [
      { id: '1', title: 'Project 1', description: 'Description 1', slug: 'project-1', content: null, featured_image: null, main_image_url: null, gallery_image_urls: null, category_id: '1', published: true, created_at: '2023-01-01', updated_at: '2023-01-01' },
      { id: '2', title: 'Project 2', description: 'Description 2', slug: 'project-2', content: null, featured_image: null, main_image_url: null, gallery_image_urls: null, category_id: '1', published: true, created_at: '2023-01-01', updated_at: '2023-01-01' }
    ]

    // Mock the API response
    vi.mocked(axios.get).mockResolvedValue({ data: mockProjects })

    const store = useProjectsStore()
    await store.fetchProjects()

    expect(axios.get).toHaveBeenCalledWith('/api/projects')
    expect(store.projects).toEqual(mockProjects)
    expect(store.loading).toBe(false)
    expect(store.error).toBe('')
  })

  it('handles error when fetching projects', async () => {
    const errorMessage = 'Failed to fetch projects'

    // Mock the API error
    vi.mocked(axios.get).mockRejectedValue(new Error(errorMessage))

    const store = useProjectsStore()
    await store.fetchProjects()

    expect(axios.get).toHaveBeenCalledWith('/api/projects')
    expect(store.projects).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBe(errorMessage)
  })

  it('fetches a single project by ID', async () => {
    const mockProject = { id: '1', title: 'Project 1', description: 'Description 1', slug: 'project-1', content: null, featured_image: null, main_image_url: null, gallery_image_urls: null, category_id: '1', published: true, created_at: '2023-01-01', updated_at: '2023-01-01' }

    // Mock the API response
    vi.mocked(axios.get).mockResolvedValue({ data: mockProject })

    const store = useProjectsStore()
    await store.fetchProjectById('1')

    expect(axios.get).toHaveBeenCalledWith('/api/projects/1')
    expect(store.currentProject).toEqual(mockProject)
    expect(store.loading).toBe(false)
    expect(store.error).toBe('')
  })

  it('creates a new project', async () => {
    const newProject = { title: 'New Project', description: 'New Description', slug: 'new-project' }
    const createdProject = { id: '3', ...newProject, content: null, featured_image: null, main_image_url: null, gallery_image_urls: null, category_id: '1', published: true, created_at: '2023-01-01', updated_at: '2023-01-01' }

    // Mock the API response
    vi.mocked(axios.post).mockResolvedValue({ data: createdProject })

    const store = useProjectsStore()
    await store.createProject(newProject)

    expect(axios.post).toHaveBeenCalledWith('/api/projects', newProject)
    expect(store.loading).toBe(false)
    expect(store.error).toBe('')
  })

  it('updates an existing project', async () => {
    const updatedProject = { id: '1', title: 'Updated Project', description: 'Updated Description', slug: 'updated-project' }

    // Mock the API response
    vi.mocked(axios.put).mockResolvedValue({ data: updatedProject })

    const store = useProjectsStore()
    await store.updateProject('1', updatedProject)

    expect(axios.put).toHaveBeenCalledWith('/api/projects/1', updatedProject)
    expect(store.loading).toBe(false)
    expect(store.error).toBe('')
  })

  it('deletes a project', async () => {
    // Mock the API response
    vi.mocked(axios.delete).mockResolvedValue({ data: { success: true } })

    const store = useProjectsStore()
    await store.deleteProject('1')

    expect(axios.delete).toHaveBeenCalledWith('/api/projects/1')
    expect(store.loading).toBe(false)
    expect(store.error).toBe('')
  })
})
