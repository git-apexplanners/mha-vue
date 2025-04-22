import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export interface Project {
  id: string
  title: string
  slug: string
  description: string | null
  content: string | null
  featured_image: string | null
  main_image_url: string | null
  gallery_image_urls: string[] | null
  category_id: string
  published: boolean
  created_at: string
  updated_at: string
}

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([])
  const currentProject = ref<Project | null>(null)
  const loading = ref(false)
  const error = ref('')

  // Get all projects
  async function fetchProjects() {
    loading.value = true
    error.value = ''

    try {
      const response = await axios.get('/api/projects')
      projects.value = response.data
      return projects.value
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch projects'
      return []
    } finally {
      loading.value = false
    }
  }

  // Get a single project by ID
  async function fetchProjectById(id: string) {
    loading.value = true
    error.value = ''

    try {
      const response = await axios.get(`/api/projects/${id}`)
      currentProject.value = response.data
      return currentProject.value
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch project'
      return null
    } finally {
      loading.value = false
    }
  }

  // Get projects by category
  async function fetchProjectsByCategory(categoryId: string) {
    loading.value = true
    error.value = ''

    try {
      const response = await axios.get(`/api/categories/${categoryId}/projects`)
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch projects by category'
      return []
    } finally {
      loading.value = false
    }
  }

  // Create a new project (admin only)
  async function createProject(projectData: Partial<Project>) {
    loading.value = true
    error.value = ''

    try {
      const response = await axios.post('/api/projects', projectData)
      projects.value.push(response.data)
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to create project'
      return null
    } finally {
      loading.value = false
    }
  }

  // Update a project (admin only)
  async function updateProject(id: string, projectData: Partial<Project>) {
    loading.value = true
    error.value = ''

    try {
      const response = await axios.put(`/api/projects/${id}`, projectData)

      // Update the project in the projects array
      const index = projects.value.findIndex(p => p.id === id)
      if (index !== -1) {
        projects.value[index] = response.data
      }

      // Update currentProject if it's the same project
      if (currentProject.value?.id === id) {
        currentProject.value = response.data
      }

      return response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to update project'
      return null
    } finally {
      loading.value = false
    }
  }

  // Delete a project (admin only)
  async function deleteProject(id: string) {
    loading.value = true
    error.value = ''

    try {
      await axios.delete(`/api/projects/${id}`)

      // Remove the project from the projects array
      projects.value = projects.value.filter(p => p.id !== id)

      // Clear currentProject if it's the same project
      if (currentProject.value?.id === id) {
        currentProject.value = null
      }

      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to delete project'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    projects,
    currentProject,
    loading,
    error,
    fetchProjects,
    fetchProjectById,
    fetchProjectsByCategory,
    createProject,
    updateProject,
    deleteProject
  }
})
