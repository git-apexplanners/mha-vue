<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'
import { useCategoriesStore } from '@/stores/categories'
import { toastService } from '@/composables/useToast'
import type { Project } from '@/stores/projects'

const route = useRoute()
const router = useRouter()
const projectsStore = useProjectsStore()
const categoriesStore = useCategoriesStore()

// Determine if we're editing or creating
const isEditing = computed(() => route.params.id !== 'new')
const projectId = computed(() => route.params.id as string)

// Form state
const loading = ref(true)
const saving = ref(false)
const errors = ref<Record<string, string>>({})

// Form data
const formData = ref<Partial<Project>>({
  title: '',
  slug: '',
  description: '',
  content: '',
  featured_image: null,
  main_image_url: null,
  gallery_image_urls: [],
  category_id: '',
  published: false
})

// Load data
onMounted(async () => {
  try {
    // Load categories
    await categoriesStore.fetchCategories()

    // If editing, load the project
    if (isEditing.value) {
      const project = await projectsStore.fetchProjectById(projectId.value)

      if (project) {
        formData.value = { ...project }
      } else {
        toastService.error({
          title: 'Error',
          description: 'Project not found'
        })
        router.push('/admin/projects')
      }
    }
  } catch (error) {
    console.error('Error loading data:', error)
    toastService.error({
      title: 'Error',
      description: 'Failed to load data. Please try again.'
    })
  } finally {
    loading.value = false
  }
})

// Generate slug from title
const generateSlug = () => {
  if (!formData.value.title) return

  formData.value.slug = formData.value.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// Validate form
const validateForm = () => {
  const newErrors: Record<string, string> = {}

  if (!formData.value.title?.trim()) {
    newErrors.title = 'Title is required'
  }

  if (!formData.value.slug?.trim()) {
    newErrors.slug = 'Slug is required'
  } else if (!/^[a-z0-9-]+$/.test(formData.value.slug)) {
    newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens'
  }

  if (!formData.value.category_id) {
    newErrors.category_id = 'Category is required'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

// Save project
const saveProject = async () => {
  if (!validateForm()) {
    toastService.error({
      title: 'Validation Error',
      description: 'Please fix the errors in the form'
    })
    return
  }

  saving.value = true

  try {
    let result

    if (isEditing.value) {
      result = await projectsStore.updateProject(projectId.value, formData.value)
    } else {
      result = await projectsStore.createProject(formData.value)
    }

    if (result) {
      toastService.success({
        title: 'Success',
        description: `Project ${isEditing.value ? 'updated' : 'created'} successfully`
      })
      router.push('/admin/projects')
    } else {
      throw new Error(`Failed to ${isEditing.value ? 'update' : 'create'} project`)
    }
  } catch (error) {
    console.error('Error saving project:', error)
    toastService.error({
      title: 'Error',
      description: `Failed to ${isEditing.value ? 'update' : 'create'} project. Please try again.`
    })
  } finally {
    saving.value = false
  }
}

// Cancel and go back
const cancel = () => {
  router.push('/admin/projects')
}

// Handle image upload (placeholder for now)
const handleImageUpload = (event: Event, type: 'main' | 'gallery') => {
  const input = event.target as HTMLInputElement
  const files = input.files

  if (!files || files.length === 0) return

  // In a real implementation, you would upload the file to a server
  // and get back a URL. For now, we'll just use a placeholder URL.
  if (type === 'main') {
    formData.value.main_image_url = 'https://placehold.co/600x400'
  } else {
    const galleryUrls = formData.value.gallery_image_urls || []
    galleryUrls.push('https://placehold.co/600x400')
    formData.value.gallery_image_urls = galleryUrls
  }
}

// Remove gallery image
const removeGalleryImage = (index: number) => {
  if (!formData.value.gallery_image_urls) return

  formData.value.gallery_image_urls = formData.value.gallery_image_urls.filter((_, i) => i !== index)
}
</script>

<template>
  <div>
    <header class="mb-8">
      <h1 class="text-3xl font-bold">{{ isEditing ? 'Edit' : 'New' }} Project</h1>
      <p class="text-muted-foreground">
        {{ isEditing ? 'Update project details' : 'Create a new architectural project' }}
      </p>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>

    <!-- Project Form -->
    <form v-else @submit.prevent="saveProject" class="space-y-8">
      <!-- Basic Information -->
      <div class="bg-card rounded-lg p-6 shadow-sm">
        <h2 class="text-xl font-bold mb-4">Basic Information</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <!-- Title -->
          <div class="space-y-2">
            <label for="title" class="text-sm font-medium">
              Title <span class="text-destructive">*</span>
            </label>
            <input
              id="title"
              v-model="formData.title"
              type="text"
              :class="[
                'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                errors.title ? 'border-destructive focus-visible:ring-destructive' : ''
              ]"
              placeholder="Project title"
              @blur="generateSlug"
            />
            <p v-if="errors.title" class="text-sm text-destructive">{{ errors.title }}</p>
          </div>

          <!-- Slug -->
          <div class="space-y-2">
            <label for="slug" class="text-sm font-medium">
              Slug <span class="text-destructive">*</span>
            </label>
            <div class="flex">
              <input
                id="slug"
                v-model="formData.slug"
                type="text"
                :class="[
                  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                  errors.slug ? 'border-destructive focus-visible:ring-destructive' : ''
                ]"
                placeholder="project-slug"
              />
              <button
                type="button"
                class="ml-2 px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
                @click="generateSlug"
              >
                Generate
              </button>
            </div>
            <p v-if="errors.slug" class="text-sm text-destructive">{{ errors.slug }}</p>
            <p v-else class="text-sm text-muted-foreground">
              The URL-friendly name that will be used in the project URL
            </p>
          </div>
        </div>

        <div class="space-y-2 mb-6">
          <!-- Description -->
          <label for="description" class="text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            v-model="formData.description"
            class="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Brief description of the project"
            rows="4"
          ></textarea>
          <p class="text-sm text-muted-foreground">
            A short description that will be displayed in project listings
          </p>
        </div>

        <div class="space-y-2 mb-6">
          <!-- Content -->
          <label for="content" class="text-sm font-medium">
            Content
          </label>
          <textarea
            id="content"
            v-model="formData.content"
            class="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Detailed content of the project"
            rows="8"
          ></textarea>
          <p class="text-sm text-muted-foreground">
            The full content of the project page (supports HTML)
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Category -->
          <div class="space-y-2">
            <label for="category" class="text-sm font-medium">
              Category <span class="text-destructive">*</span>
            </label>
            <select
              id="category"
              v-model="formData.category_id"
              :class="[
                'w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                errors.category_id ? 'border-destructive focus:ring-destructive' : ''
              ]"
            >
              <option value="" disabled>Select a category</option>
              <option v-for="category in categoriesStore.categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
            <p v-if="errors.category_id" class="text-sm text-destructive">{{ errors.category_id }}</p>
          </div>

          <!-- Published Status -->
          <div class="space-y-2">
            <label class="text-sm font-medium">Status</label>
            <div class="flex items-center space-x-2">
              <input
                id="published"
                v-model="formData.published"
                type="checkbox"
                class="h-4 w-4 rounded border-input bg-background text-primary focus:ring-primary"
              />
              <label for="published" class="text-sm text-muted-foreground">
                Published (visible to the public)
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Images -->
      <div class="bg-card rounded-lg p-6 shadow-sm">
        <h2 class="text-xl font-bold mb-4">Images</h2>

        <!-- Main Image -->
        <div class="mb-6">
          <label class="text-sm font-medium block mb-2">
            Main Image
          </label>

          <div v-if="formData.main_image_url" class="mb-4">
            <div class="relative aspect-[16/9] max-w-md overflow-hidden rounded-lg">
              <img
                :src="formData.main_image_url"
                alt="Main project image"
                class="w-full h-full object-cover"
              />
              <button
                type="button"
                class="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground"
                @click="formData.main_image_url = null"
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
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <div v-else>
            <label
              for="main-image"
              class="flex flex-col items-center justify-center w-full max-w-md h-32 border-2 border-dashed border-input rounded-lg cursor-pointer bg-background hover:bg-accent hover:text-accent-foreground"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
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
                  class="h-8 w-8 mb-2"
                >
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                  <line x1="16" x2="22" y1="5" y2="5"></line>
                  <line x1="19" x2="19" y1="2" y2="8"></line>
                  <circle cx="9" cy="9" r="2"></circle>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                </svg>
                <p class="mb-2 text-sm">
                  <span class="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p class="text-xs text-muted-foreground">PNG, JPG or WEBP (MAX. 2MB)</p>
              </div>
              <input
                id="main-image"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleImageUpload($event, 'main')"
              />
            </label>
          </div>
        </div>

        <!-- Gallery Images -->
        <div>
          <label class="text-sm font-medium block mb-2">
            Gallery Images
          </label>

          <div v-if="formData.gallery_image_urls && formData.gallery_image_urls.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            <div
              v-for="(url, index) in formData.gallery_image_urls"
              :key="index"
              class="relative aspect-square overflow-hidden rounded-lg"
            >
              <img
                :src="url"
                :alt="`Gallery image ${index + 1}`"
                class="w-full h-full object-cover"
              />
              <button
                type="button"
                class="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground"
                @click="removeGalleryImage(index)"
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
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <label
            for="gallery-images"
            class="flex flex-col items-center justify-center w-full max-w-md h-32 border-2 border-dashed border-input rounded-lg cursor-pointer bg-background hover:bg-accent hover:text-accent-foreground"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
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
                class="h-8 w-8 mb-2"
              >
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                <line x1="16" x2="22" y1="5" y2="5"></line>
                <line x1="19" x2="19" y1="2" y2="8"></line>
                <circle cx="9" cy="9" r="2"></circle>
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
              </svg>
              <p class="mb-2 text-sm">
                <span class="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p class="text-xs text-muted-foreground">PNG, JPG or WEBP (MAX. 2MB)</p>
            </div>
            <input
              id="gallery-images"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleImageUpload($event, 'gallery')"
            />
          </label>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end gap-4">
        <button
          type="button"
          @click="cancel"
          class="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="saving"
          class="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none"
        >
          <span v-if="saving" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving...
          </span>
          <span v-else>{{ isEditing ? 'Update' : 'Create' }} Project</span>
        </button>
      </div>
    </form>
  </div>
</template>
