<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'
import { useCategoriesStore } from '@/stores/categories'
// import type { Project } from '@/stores/projects'

const route = useRoute()
const router = useRouter()
const projectsStore = useProjectsStore()
const categoriesStore = useCategoriesStore()

const loading = ref(true)
const searchQuery = ref('')
const selectedCategory = ref('')
const currentPage = ref(1)
const itemsPerPage = 9

// Get query parameters from URL
onMounted(async () => {
  searchQuery.value = route.query.search?.toString() || ''
  selectedCategory.value = route.query.category?.toString() || ''
  currentPage.value = parseInt(route.query.page?.toString() || '1')

  try {
    await Promise.all([
      projectsStore.fetchProjects(),
      categoriesStore.fetchCategories()
    ])
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
})

// Update URL when filters change
watch([searchQuery, selectedCategory, currentPage], () => {
  const query: Record<string, string> = {}

  if (searchQuery.value) {
    query.search = searchQuery.value
  }

  if (selectedCategory.value) {
    query.category = selectedCategory.value
  }

  if (currentPage.value > 1) {
    query.page = currentPage.value.toString()
  }

  router.push({ query })
})

// Filter projects based on search and category
const filteredProjects = computed(() => {
  let filtered = projectsStore.projects.filter((project: any) => project.published)

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter((project: any) =>
      project.title.toLowerCase().includes(query) ||
      (project.description && project.description.toLowerCase().includes(query))
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter((project: any) => project.category_id === selectedCategory.value)
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
  window.scrollTo(0, 0)
}

// Clear filters
const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  currentPage.value = 1
}
</script>

<template>
  <div>
    <header class="mb-8">
      <h1 class="text-3xl font-bold">Projects</h1>
      <p class="text-muted-foreground">Browse our architectural portfolio</p>
    </header>

    <!-- Filters -->
    <div class="mb-8 bg-card p-4 rounded-lg shadow-sm">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Search -->
        <div>
          <label for="search" class="block text-sm font-medium mb-1">Search</label>
          <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground">
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

    <!-- Projects Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div v-for="project in paginatedProjects" :key="project.id" class="group">
        <router-link :to="`/projects/${project.id}`" class="block no-underline">
          <div class="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
            <img
              :src="project.main_image_url || '/placeholder-image.jpg'"
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <h3 class="text-xl font-bold mb-2 text-foreground">{{ project.title }}</h3>
          <p class="text-muted-foreground line-clamp-2">{{ project.description }}</p>
          <div class="mt-2 text-sm text-muted-foreground">
            {{ categoriesStore.categories.find(c => c.id === project.category_id)?.name || 'Uncategorized' }}
          </div>
        </router-link>
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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </button>

        <template v-for="page in totalPages">
          <button
            v-if="page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)"
            @click="changePage(page)"
            :key="page"
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
            :key="'ellipsis-' + page"
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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </button>
      </nav>
    </div>
  </div>
</template>
