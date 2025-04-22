import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePagesStore } from './pages'
import axios from 'axios'

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

describe('Pages Store', () => {
  beforeEach(() => {
    // Create a fresh Pinia instance for each test
    setActivePinia(createPinia())

    // Reset mocks
    vi.resetAllMocks()
  })

  it('initializes with correct state', () => {
    const store = usePagesStore()

    expect(store.pages).toEqual([])
    expect(store.currentPage).toBeNull()
    expect(store.loading).toBe(false)
    expect(store.error).toBe('')
  })

  it('fetches pages successfully', async () => {
    // Mock successful pages response
    const mockPages = [
      { id: '1', title: 'Home', slug: 'home', content: 'Home content', published: true, order: 1 },
      { id: '2', title: 'About', slug: 'about', content: 'About content', published: true, order: 2 }
    ]

    axios.get.mockResolvedValue({ data: mockPages })

    const store = usePagesStore()

    // Fetch pages
    await store.fetchPages()

    // Check if axios was called with the correct endpoint
    expect(axios.get).toHaveBeenCalledWith('/api/pages')

    // Check if store state is updated
    expect(store.pages).toEqual(mockPages)
    expect(store.loading).toBe(false)
    expect(store.error).toBe('')
  })

  it('handles error when fetching pages', async () => {
    // Mock error response
    axios.get.mockRejectedValue({
      response: {
        data: {
          error: 'Failed to fetch pages'
        }
      }
    })

    const store = usePagesStore()

    // Fetch pages
    await store.fetchPages()

    // Check if store state is updated
    expect(store.pages).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBe('Failed to fetch pages')
  })

  it('ensures pages is always an array', async () => {
    // Mock response with non-array data
    axios.get.mockResolvedValue({ data: null })

    const store = usePagesStore()

    // Fetch pages
    await store.fetchPages()

    // Should set pages to an empty array
    expect(Array.isArray(store.pages)).toBe(true)
    expect(store.pages).toEqual([])
  })

  it('fetches a single page by slug', async () => {
    // Mock successful page response
    const mockPage = { id: '1', title: 'Home', slug: 'home', content: 'Home content', published: true, order: 1 }

    axios.get.mockResolvedValue({ data: mockPage })

    const store = usePagesStore()

    // Fetch page
    const result = await store.fetchPageBySlug('home')

    // Check if axios was called with the correct endpoint
    expect(axios.get).toHaveBeenCalledWith('/api/pages/slug/home')

    // Check if result is correct
    expect(result).toEqual(mockPage)

    // Check if store state is updated
    expect(store.currentPage).toEqual(mockPage)
    expect(store.loading).toBe(false)
    expect(store.error).toBe('')
  })

  it('creates a new page', async () => {
    // Mock successful create response
    const newPage = { title: 'New Page', slug: 'new-page', content: 'New content', published: false }
    const createdPage = { id: '3', ...newPage, order: 3 }

    axios.post.mockResolvedValue({ data: createdPage })

    const store = usePagesStore()

    // Create page
    const result = await store.createPage(newPage)

    // Check if axios was called with the correct endpoint and data
    expect(axios.post).toHaveBeenCalledWith('/api/pages', newPage)

    // Check if result is correct
    expect(result).toEqual(createdPage)

    // We don't check store.currentPage because it's not set in the implementation
    expect(store.loading).toBe(false)
    expect(store.error).toBe('')
  })

  it('updates an existing page', async () => {
    // Mock successful update response
    const updatedPage = { id: '1', title: 'Updated Page', slug: 'updated-page', content: 'Updated content', published: true, order: 1 }

    axios.put.mockResolvedValue({ data: updatedPage })

    const store = usePagesStore()

    // Update page
    const result = await store.updatePage('1', { title: 'Updated Page' })

    // Check if axios was called with the correct endpoint and data
    expect(axios.put).toHaveBeenCalledWith('/api/pages/1', { title: 'Updated Page' })

    // Check if result is correct
    expect(result).toEqual(updatedPage)

    // We don't check store.currentPage because it's not set in the implementation
    expect(store.loading).toBe(false)
    expect(store.error).toBe('')
  })

  it('deletes a page', async () => {
    // Mock successful delete response
    axios.delete.mockResolvedValue({ data: { success: true } })

    const store = usePagesStore()

    // Delete page
    const result = await store.deletePage('1')

    // Check if axios was called with the correct endpoint
    expect(axios.delete).toHaveBeenCalledWith('/api/pages/1')

    // The implementation returns true, not { success: true }
    expect(result).toBe(true)

    // Check if store state is updated
    expect(store.loading).toBe(false)
    expect(store.error).toBe('')
  })

  it('reorders pages', async () => {
    // Mock successful reorder response
    const reorderedPages = [
      { id: '2', title: 'About', slug: 'about', content: 'About content', published: true, order: 1 },
      { id: '1', title: 'Home', slug: 'home', content: 'Home content', published: true, order: 2 }
    ]

    axios.post.mockResolvedValue({ data: reorderedPages })

    const store = usePagesStore()

    // Reorder pages
    const result = await store.reorderPages(['2', '1'])

    // Check if axios was called with the correct endpoint and data
    expect(axios.post).toHaveBeenCalledWith('/api/pages/reorder', { pageIds: ['2', '1'] })

    // Check if result is correct
    expect(result).toEqual(reorderedPages)

    // Check if store state is updated
    expect(store.pages).toEqual(reorderedPages)
    expect(store.loading).toBe(false)
    expect(store.error).toBe('')
  })

  it('ensures reorderPages always returns an array', async () => {
    // Mock response with non-array data
    axios.post.mockResolvedValue({ data: null })

    const store = usePagesStore()

    // Reorder pages
    const result = await store.reorderPages(['1', '2'])

    // Should return an empty array
    expect(Array.isArray(result)).toBe(true)
    expect(result).toEqual([])

    // Should set pages to an empty array
    expect(Array.isArray(store.pages)).toBe(true)
    expect(store.pages).toEqual([])
  })
})
