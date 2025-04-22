import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export interface Category {
  id: string
  name: string
  slug: string
  parent_id: string | null
  created_at: string
}

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])
  const loading = ref(false)
  const error = ref('')

  // Get all categories
  async function fetchCategories() {
    loading.value = true
    error.value = ''

    try {
      // Try to fetch from API
      try {
        const response = await axios.get('/api/categories')
        // Ensure we always set an array
        categories.value = Array.isArray(response.data) ? response.data : []
        return categories.value
      } catch (apiErr) {
        console.warn('API request failed, falling back to static JSON', apiErr)
        // If API request fails, try to fetch from static JSON file
        const staticResponse = await axios.get('/api/categories/index.json')
        categories.value = Array.isArray(staticResponse.data) ? staticResponse.data : []
        return categories.value
      }
    } catch (err: any) {
      console.error('Failed to fetch categories from both API and static JSON', err)
      error.value = err.message || 'Failed to fetch categories'
      categories.value = []
      return []
    } finally {
      loading.value = false
    }
  }

  // Get a single category by ID
  async function fetchCategoryById(id: string) {
    loading.value = true
    error.value = ''

    try {
      const response = await axios.get(`/api/categories/${id}`)
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch category'
      return null
    } finally {
      loading.value = false
    }
  }

  // Create a new category (admin only)
  async function createCategory(categoryData: Partial<Category>) {
    loading.value = true
    error.value = ''

    try {
      try {
        // Try to create via API
        const response = await axios.post('/api/categories', categoryData)
        categories.value.push(response.data)
        return response.data
      } catch (apiErr) {
        console.warn('API request failed, creating category locally', apiErr)

        // If API fails, create a local category
        const newId = (Math.max(...categories.value.map(c => parseInt(c.id)), 0) + 1).toString()
        const newCategory: Category = {
          id: newId,
          name: categoryData.name || '',
          slug: categoryData.slug || '',
          parent_id: categoryData.parent_id || null,
          created_at: new Date().toISOString()
        }

        categories.value.push(newCategory)

        // Update the static JSON file (this would normally be handled by the API)
        // In a real app, you would update the server. This is just for demo purposes.
        console.log('Created new category:', newCategory)

        return newCategory
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to create category'
      return null
    } finally {
      loading.value = false
    }
  }

  // Update a category (admin only)
  async function updateCategory(id: string, categoryData: Partial<Category>) {
    loading.value = true
    error.value = ''

    try {
      const response = await axios.put(`/api/categories/${id}`, categoryData)

      // Update the category in the categories array
      const index = categories.value.findIndex(c => c.id === id)
      if (index !== -1) {
        categories.value[index] = response.data
      }

      return response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to update category'
      return null
    } finally {
      loading.value = false
    }
  }

  // Delete a category (admin only)
  async function deleteCategory(id: string) {
    loading.value = true
    error.value = ''

    try {
      await axios.delete(`/api/categories/${id}`)

      // Remove the category from the categories array
      categories.value = categories.value.filter(c => c.id !== id)

      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to delete category'
      return false
    } finally {
      loading.value = false
    }
  }

  // Get parent categories (categories with no parent)
  function getParentCategories() {
    return categories.value.filter(category => !category.parent_id)
  }

  // Get child categories for a specific parent
  function getChildCategories(parentId: string) {
    return categories.value.filter(category => category.parent_id === parentId)
  }

  return {
    categories,
    loading,
    error,
    fetchCategories,
    fetchCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    getParentCategories,
    getChildCategories
  }
})
