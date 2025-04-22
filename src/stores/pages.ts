import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export interface Page {
  id: string
  title: string
  slug: string
  content: string | null
  meta_title: string | null
  meta_description: string | null
  published: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export const usePagesStore = defineStore('pages', () => {
  const pages = ref<Page[]>([])
  const currentPage = ref<Page | null>(null)
  const loading = ref(false)
  const error = ref('')

  // Get all pages
  async function fetchPages() {
    loading.value = true
    error.value = ''

    try {
      const response = await axios.get('/api/pages')
      // Ensure we always set an array
      pages.value = Array.isArray(response.data) ? response.data : []
      return pages.value
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to fetch pages'
      pages.value = []
      return []
    } finally {
      loading.value = false
    }
  }

  // Get a single page by ID
  async function fetchPageById(id: string) {
    loading.value = true
    error.value = ''

    try {
      const response = await axios.get(`/api/pages/${id}`)
      currentPage.value = response.data
      return currentPage.value
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to fetch page'
      return null
    } finally {
      loading.value = false
    }
  }

  // Get a page by slug
  async function fetchPageBySlug(slug: string) {
    loading.value = true
    error.value = ''

    try {
      const response = await axios.get(`/api/pages/slug/${slug}`)
      currentPage.value = response.data
      return currentPage.value
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to fetch page'
      return null
    } finally {
      loading.value = false
    }
  }

  // Create a new page (admin only)
  async function createPage(pageData: Partial<Page>) {
    loading.value = true
    error.value = ''

    try {
      const response = await axios.post('/api/pages', pageData)
      pages.value.push(response.data)
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to create page'
      return null
    } finally {
      loading.value = false
    }
  }

  // Update a page (admin only)
  async function updatePage(id: string, pageData: Partial<Page>) {
    loading.value = true
    error.value = ''

    try {
      const response = await axios.put(`/api/pages/${id}`, pageData)

      // Update the page in the pages array
      const index = pages.value.findIndex(p => p.id === id)
      if (index !== -1) {
        pages.value[index] = response.data
      }

      // Update currentPage if it's the same page
      if (currentPage.value?.id === id) {
        currentPage.value = response.data
      }

      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to update page'
      return null
    } finally {
      loading.value = false
    }
  }

  // Delete a page (admin only)
  async function deletePage(id: string) {
    loading.value = true
    error.value = ''

    try {
      await axios.delete(`/api/pages/${id}`)

      // Remove the page from the pages array
      pages.value = pages.value.filter(p => p.id !== id)

      // Clear currentPage if it's the same page
      if (currentPage.value?.id === id) {
        currentPage.value = null
      }

      return true
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to delete page'
      return false
    } finally {
      loading.value = false
    }
  }

  // Reorder pages (admin only)
  async function reorderPages(pageIds: string[]) {
    loading.value = true
    error.value = ''

    try {
      const response = await axios.post('/api/pages/reorder', { pageIds })
      // Ensure we always set an array
      pages.value = Array.isArray(response.data) ? response.data : []
      return pages.value
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to reorder pages'
      return []
    } finally {
      loading.value = false
    }
  }

  return {
    pages,
    currentPage,
    loading,
    error,
    fetchPages,
    fetchPageById,
    fetchPageBySlug,
    createPage,
    updatePage,
    deletePage,
    reorderPages
  }
})
