<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'
import { useCategoriesStore } from '@/stores/categories'

const route = useRoute()
const projectsStore = useProjectsStore()
const categoriesStore = useCategoriesStore()

const loading = ref(true)
const error = ref('')
const activeImageIndex = ref(0)

onMounted(async () => {
  const projectId = route.params.id as string

  try {
    await Promise.all([
      projectsStore.fetchProjectById(projectId),
      categoriesStore.fetchCategories()
    ])

    if (!projectsStore.currentProject) {
      error.value = 'Project not found'
    }
  } catch (err) {
    console.error('Error fetching project:', err)
    error.value = 'Failed to load project'
  } finally {
    loading.value = false
  }
})

const category = computed(() => {
  if (!projectsStore.currentProject) return null
  return categoriesStore.categories.find(c => c.id === projectsStore.currentProject?.category_id)
})

const galleryImages = computed(() => {
  if (!projectsStore.currentProject) return []

  const images = []

  if (projectsStore.currentProject.main_image_url) {
    images.push({
      url: projectsStore.currentProject.main_image_url,
      alt: `${projectsStore.currentProject.title} - Main Image`
    })
  }

  if (projectsStore.currentProject.gallery_image_urls) {
    projectsStore.currentProject.gallery_image_urls.forEach((url, index) => {
      images.push({
        url,
        alt: `${projectsStore.currentProject?.title || 'Project'} - Image ${index + 1}`
      })
    })
  }

  return images
})

const setActiveImage = (index: number) => {
  activeImageIndex.value = index
}
</script>

<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <h2 class="text-2xl font-bold mb-2">{{ error }}</h2>
      <p class="text-muted-foreground mb-4">The project you're looking for could not be found.</p>
      <router-link to="/projects" class="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
        Back to Projects
      </router-link>
    </div>

    <!-- Project Details -->
    <div v-else-if="projectsStore.currentProject">
      <!-- Breadcrumbs -->
      <nav class="mb-6 text-sm text-muted-foreground">
        <ol class="flex items-center space-x-2">
          <li>
            <router-link to="/" class="hover:text-foreground">Home</router-link>
          </li>
          <li class="flex items-center space-x-2">
            <span>/</span>
            <router-link to="/projects" class="hover:text-foreground">Projects</router-link>
          </li>
          <li v-if="category" class="flex items-center space-x-2">
            <span>/</span>
            <router-link :to="`/projects?category=${category.id}`" class="hover:text-foreground">
              {{ category.name }}
            </router-link>
          </li>
          <li class="flex items-center space-x-2">
            <span>/</span>
            <span class="text-foreground">{{ projectsStore.currentProject.title }}</span>
          </li>
        </ol>
      </nav>

      <!-- Project Header -->
      <header class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold mb-2">{{ projectsStore.currentProject.title }}</h1>
        <div class="flex items-center text-muted-foreground">
          <span v-if="category">{{ category.name }}</span>
          <span class="mx-2">•</span>
          <span>{{ new Date(projectsStore.currentProject.created_at).toLocaleDateString() }}</span>
        </div>
      </header>

      <!-- Project Gallery -->
      <div v-if="galleryImages.length > 0" class="mb-8">
        <!-- Main Image -->
        <div class="relative aspect-[16/9] overflow-hidden rounded-lg mb-4">
          <img
            :src="galleryImages[activeImageIndex].url"
            :alt="galleryImages[activeImageIndex].alt"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Thumbnails -->
        <div v-if="galleryImages.length > 1" class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          <button
            v-for="(image, index) in galleryImages"
            :key="index"
            @click="setActiveImage(index)"
            class="relative aspect-square overflow-hidden rounded-md"
            :class="{ 'ring-2 ring-primary': activeImageIndex === index }"
          >
            <img
              :src="image.url"
              :alt="image.alt"
              class="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      <!-- Project Description -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">About this project</h2>
        <div v-if="projectsStore.currentProject.description" class="prose max-w-none">
          <p>{{ projectsStore.currentProject.description }}</p>
        </div>
      </div>

      <!-- Project Content -->
      <div v-if="projectsStore.currentProject.content" class="mb-8">
        <div class="prose max-w-none" v-html="projectsStore.currentProject.content"></div>
      </div>

      <!-- Related Projects (placeholder) -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold mb-6">Related Projects</h2>
        <p class="text-muted-foreground">Related projects would be displayed here.</p>
      </div>
    </div>
  </div>
</template>
