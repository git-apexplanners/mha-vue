<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'
import { useCategoriesStore } from '@/stores/categories'
import ProjectCard from '@/components/ProjectCard.vue'

const route = useRoute()
const projectsStore = useProjectsStore()
const categoriesStore = useCategoriesStore()

// State
const loading = ref(true)
const error = ref('')

// Get category slug from route meta or params
const categorySlug = computed(() => {
  return route.meta.categorySlug || route.params.slug
})

// Get category from store
const category = computed(() => {
  return categoriesStore.categories.find(c => c.slug === categorySlug.value)
})

// Get projects for this category
const categoryProjects = ref([])

// Load data
onMounted(async () => {
  try {
    // Load categories if not already loaded
    if (categoriesStore.categories.length === 0) {
      await categoriesStore.fetchCategories()
    }

    // Wait for category to be available
    if (category.value) {
      try {
        // Load projects for this category
        const projects = await projectsStore.fetchProjectsByCategory(category.value.id)
        categoryProjects.value = projects
      } catch (err) {
        console.error('Error fetching projects:', err)
        error.value = 'Failed to load projects'
      }
    } else {
      error.value = 'Category not found'
    }
  } catch (err) {
    console.error('Error loading category data:', err)
    error.value = 'Failed to load category data'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <!-- Header -->
    <header class="mb-12">
      <h1 v-if="category" class="text-4xl font-bold mb-4">{{ category.name }} Projects</h1>
      <h1 v-else class="text-4xl font-bold mb-4">Portfolio</h1>
      <p class="text-xl text-muted-foreground">
        {{ category?.description || 'Explore our architectural projects' }}
      </p>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="py-12 text-center">
      <h3 class="text-xl font-bold mb-2 text-destructive">{{ error }}</h3>
      <p class="text-muted-foreground">Please try again later</p>
    </div>

    <!-- No Projects -->
    <div v-else-if="categoryProjects.length === 0" class="py-12 text-center">
      <h3 class="text-xl font-bold mb-2">No projects found</h3>
      <p class="text-muted-foreground">Check back later for updates</p>
    </div>

    <!-- Projects Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProjectCard
        v-for="project in categoryProjects"
        :key="project.id"
        :project="project"
      />
    </div>
  </div>
</template>
