<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'
import { useCategoriesStore } from '@/stores/categories'
import { toastService } from '@/composables/useToast'
import type { Project } from '@/stores/projects'

const router = useRouter()
const projectsStore = useProjectsStore()
const categoriesStore = useCategoriesStore()

// State
const loading = ref(true)
const searchQuery = ref('')
const selectedCategory = ref('')
const currentPage = ref(1)
const itemsPerPage = 10
const isDeleteModalOpen = ref(false)
const projectToDelete = ref<Project | null>(null)

// Load data
onMounted(async () => {
  try {
    await Promise.all([
      projectsStore.fetchProjects(),
      categoriesStore.fetchCategories()
    ])
  } catch (error) {
    console.error('Error fetching data:', error)
    toastService.error({
      title: 'Error',
      description: 'Failed to load projects. Please try again.'
    })
  } finally {
    loading.value = false
  }
})

// Filter projects
const filteredProjects = computed(() => {
  let filtered = [...projectsStore.projects]

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(project =>
      project.title.toLowerCase().includes(query) ||
      (project.description && project.description.toLowerCase().includes(query))
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(project => project.category_id === selectedCategory.value)
  }

  return filtered
})

// Paginate projects
const paginatedProjects = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return filteredProjects.value.slice(startIndex, endIndex)
})

// Calculate total pages
const totalPages = computed(() => {
  return Math.ceil(filteredProjects.value.length / itemsPerPage)
})

// Handle page change
const changePage = (page: number) => {
  currentPage.value = page
}

// Clear filters
const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  currentPage.value = 1
}

// Navigate to create new project
const createNewProject = () => {
  router.push('/admin/projects/new')
}

// Navigate to edit project
const editProject = (id: string) => {
  router.push(`/admin/projects/${id}`)
}

// View project
const viewProject = (id: string) => {
  router.push(`/projects/${id}`)
}

// Confirm delete
const confirmDelete = (project: Project) => {
  projectToDelete.value = project
  isDeleteModalOpen.value = true
}

// Cancel delete
const cancelDelete = () => {
  projectToDelete.value = null
  isDeleteModalOpen.value = false
}

// Delete project
const deleteProject = async () => {
  if (!projectToDelete.value) return

  try {
    const success = await projectsStore.deleteProject(projectToDelete.value.id)

    if (success) {
      toastService.success({
        title: 'Success',
        description: `Project "${projectToDelete.value.title}" has been deleted.`
      })
    } else {
      throw new Error('Failed to delete project')
    }
  } catch (error) {
    console.error('Error deleting project:', error)
    toastService.error({
      title: 'Error',
      description: 'Failed to delete project. Please try again.'
    })
  } finally {
    cancelDelete()
  }
}

// Get category name
const getCategoryName = (categoryId: string) => {
  const category = categoriesStore.categories.find(c => c.id === categoryId)
  return category ? category.name : 'Uncategorized'
}

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}
</script>

<template>
  <div>
    <header class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold">Projects</h1>
        <p class="text-muted-foreground">Manage your architectural projects</p>
      </div>
      <button
        @click="createNewProject"
        class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4 mr-2"
        >
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>
        New Project
      </button>
    </header>

    <!-- Filters -->
    <div class="mb-8 bg-card p-4 rounded-lg shadow-sm">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Search -->
        <div>
          <label for="search" class="block text-sm font-medium mb-1">Search</label>
          <div class="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              placeholder="Search projects..."
              class="w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>
        </div>

        <!-- Category Filter -->
        <div>
          <label for="category" class="block text-sm font-medium mb-1">Category</label>
          <select
            id="category"
            v-model="selectedCategory"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option value="">All Categories</option>
            <option v-for="category in categoriesStore.categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- Clear Filters -->
        <div class="flex items-end">
          <button
            @click="clearFilters"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>

    <!-- No Results -->
    <div v-else-if="filteredProjects.length === 0" class="text-center py-12">
      <h3 class="text-xl font-bold mb-2">No projects found</h3>
      <p class="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
      <button
        @click="clearFilters"
        class="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Clear Filters
      </button>
    </div>

    <!-- Projects Table -->
    <div v-else class="bg-card rounded-lg shadow-sm overflow-hidden mb-8">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-3 px-4 font-medium">Title</th>
              <th class="text-left py-3 px-4 font-medium">Category</th>
              <th class="text-left py-3 px-4 font-medium">Status</th>
              <th class="text-left py-3 px-4 font-medium">Created</th>
              <th class="text-right py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in paginatedProjects" :key="project.id" class="border-b">
              <td class="py-3 px-4">{{ project.title }}</td>
              <td class="py-3 px-4">{{ getCategoryName(project.category_id) }}</td>
              <td class="py-3 px-4">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    project.published
                      ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400'
                  ]"
                >
                  {{ project.published ? 'Published' : 'Draft' }}
                </span>
              </td>
              <td class="py-3 px-4">{{ formatDate(project.created_at) }}</td>
              <td class="py-3 px-4 text-right">
                <div class="flex justify-end gap-2">
                  <button @click="editProject(project.id)" class="text-primary hover:text-primary/80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                      <path d="m15 5 4 4"></path>
                    </svg>
                  </button>
                  <button @click="viewProject(project.id)" class="text-primary hover:text-primary/80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                  <button @click="confirmDelete(project)" class="text-destructive hover:text-destructive/80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      <line x1="10" x2="10" y1="11" y2="17"></line>
                      <line x1="14" x2="14" y1="11" y2="17"></line>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex justify-center mt-8">
      <nav class="flex items-center space-x-1">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 w-10 disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Previous page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </button>

        <template v-for="page in totalPages" :key="page">
          <button
            v-if="page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)"
            @click="changePage(page)"
            :class="[
              'inline-flex items-center justify-center rounded-md text-sm font-medium h-10 w-10',
              currentPage === page
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent hover:text-accent-foreground'
            ]"
          >
            {{ page }}
          </button>

          <span
            v-else-if="page === 2 || page === totalPages - 1"
            class="inline-flex items-center justify-center h-10 w-10"
          >
            ...
          </span>
        </template>

        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 w-10 disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Next page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </button>
      </nav>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="isDeleteModalOpen" class="fixed inset-0 z-50 bg-background/80 flex items-center justify-center">
      <div class="bg-card rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-bold mb-2">Delete Project</h3>
        <p class="mb-4">
          Are you sure you want to delete the project "{{ projectToDelete?.title }}"? This action cannot be undone.
        </p>
        <div class="flex justify-end gap-2">
          <button
            @click="cancelDelete"
            class="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          >
            Cancel
          </button>
          <button
            @click="deleteProject"
            class="px-4 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
