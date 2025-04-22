import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCategoriesStore } from './categories'
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

describe('Categories Store', () => {
  beforeEach(() => {
    // Create a fresh Pinia instance for each test
    setActivePinia(createPinia())

    // Reset mocks
    vi.resetAllMocks()
  })

  it('initializes with correct state', () => {
    const store = useCategoriesStore()

    expect(store.categories).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBe('')
  })

  it('fetches categories successfully', async () => {
    // Mock successful categories response
    const mockCategories = [
      { id: '1', name: 'Residential', slug: 'residential', description: 'Residential projects' },
      { id: '2', name: 'Commercial', slug: 'commercial', description: 'Commercial projects' }
    ]

    axios.get.mockResolvedValue({ data: mockCategories })

    const store = useCategoriesStore()

    // Fetch categories
    await store.fetchCategories()

    // Check if axios was called with the correct endpoint
    expect(axios.get).toHaveBeenCalledWith('/api/categories')

    // Check if store state is updated
    expect(store.categories).toEqual(mockCategories)
    expect(store.loading).toBe(false)
    expect(store.error).toBe('')
  })

  it('handles error when fetching categories', async () => {
    // Mock error response
    axios.get.mockRejectedValue({
      message: 'Network Error'
    })

    const store = useCategoriesStore()

    // Fetch categories
    await store.fetchCategories()

    // Check if store state is updated
    expect(store.categories).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBe('Network Error')
  })

  it('ensures categories is always an array', async () => {
    // Mock response with non-array data
    axios.get.mockResolvedValue({ data: null })

    const store = useCategoriesStore()

    // Fetch categories
    await store.fetchCategories()

    // Should set categories to an empty array
    expect(Array.isArray(store.categories)).toBe(true)
    expect(store.categories).toEqual([])
  })

  it('creates a new category', async () => {
    // Mock successful create response
    const newCategory = { name: 'New Category', slug: 'new-category', description: 'New Description' }
    const createdCategory = { id: '3', ...newCategory }

    axios.post.mockResolvedValue({ data: createdCategory })

    const store = useCategoriesStore()

    // Create category
    const result = await store.createCategory(newCategory)

    // Check if axios was called with the correct endpoint and data
    expect(axios.post).toHaveBeenCalledWith('/api/categories', newCategory)

    // Check if result is correct
    expect(result).toEqual(createdCategory)
  })

  it('updates an existing category', async () => {
    // Mock successful update response
    const updatedCategory = { id: '1', name: 'Updated Category', slug: 'updated-category', description: 'Updated Description' }

    axios.put.mockResolvedValue({ data: updatedCategory })

    const store = useCategoriesStore()

    // Update category
    const result = await store.updateCategory('1', { name: 'Updated Category' })

    // Check if axios was called with the correct endpoint and data
    expect(axios.put).toHaveBeenCalledWith('/api/categories/1', { name: 'Updated Category' })

    // Check if result is correct
    expect(result).toEqual(updatedCategory)
  })

  it('deletes a category', async () => {
    // Mock successful delete response
    axios.delete.mockResolvedValue({ data: { success: true } })

    const store = useCategoriesStore()

    // Delete category
    const result = await store.deleteCategory('1')

    // Check if axios was called with the correct endpoint
    expect(axios.delete).toHaveBeenCalledWith('/api/categories/1')

    // The implementation returns true, not { success: true }
    expect(result).toBe(true)
  })
})
