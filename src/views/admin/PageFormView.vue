<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePagesStore } from '@/stores/pages'
import { toastService } from '@/composables/useToast'
import RichTextEditor from '@/components/ui/RichTextEditor.vue'
import type { Page } from '@/stores/pages'

const route = useRoute()
const router = useRouter()
const pagesStore = usePagesStore()

// Determine if we're editing or creating
const isEditing = computed(() => route.params.id !== 'new')
const pageId = computed(() => route.params.id as string)

// Form state
const loading = ref(true)
const saving = ref(false)
const errors = ref<Record<string, string>>({})

// Form data
const formData = ref<Partial<Page>>({
  title: '',
  slug: '',
  content: '',
  meta_title: '',
  meta_description: '',
  published: false,
  sort_order: 0
})

// Load data
onMounted(async () => {
  try {
    // If editing, load the page
    if (isEditing.value) {
      const page = await pagesStore.fetchPageById(pageId.value)

      if (page) {
        formData.value = { ...page }
      } else {
        toastService.error({
          title: 'Error',
          description: 'Page not found'
        })
        router.push('/admin/pages')
      }
    } else {
      // For new pages, set the sort order to the end of the list
      await pagesStore.fetchPages()
      formData.value.sort_order = pagesStore.pages.length
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

// Generate meta title from title
const generateMetaTitle = () => {
  if (!formData.value.title) return

  formData.value.meta_title = formData.value.title
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

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

// Save page
const savePage = async () => {
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
      result = await pagesStore.updatePage(pageId.value, formData.value)
    } else {
      result = await pagesStore.createPage(formData.value)
    }

    if (result) {
      toastService.success({
        title: 'Success',
        description: `Page ${isEditing.value ? 'updated' : 'created'} successfully`
      })
      router.push('/admin/pages')
    } else {
      throw new Error(`Failed to ${isEditing.value ? 'update' : 'create'} page`)
    }
  } catch (error) {
    console.error('Error saving page:', error)
    toastService.error({
      title: 'Error',
      description: `Failed to ${isEditing.value ? 'update' : 'create'} page. Please try again.`
    })
  } finally {
    saving.value = false
  }
}

// Cancel and go back
const cancel = () => {
  router.push('/admin/pages')
}
</script>

<template>
  <div>
    <header class="mb-8">
      <h1 class="text-3xl font-bold">{{ isEditing ? 'Edit' : 'New' }} Page</h1>
      <p class="text-muted-foreground">
        {{ isEditing ? 'Update page details' : 'Create a new website page' }}
      </p>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>

    <!-- Page Form -->
    <form v-else @submit.prevent="savePage" class="space-y-8">
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
              placeholder="Page title"
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
                placeholder="page-slug"
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
              The URL-friendly name that will be used in the page URL
            </p>
          </div>
        </div>

        <div class="space-y-2 mb-6">
          <!-- Content -->
          <label for="content" class="text-sm font-medium">
            Content
          </label>
          <RichTextEditor
            id="content"
            v-model="formData.content"
            placeholder="Start typing your page content here..."
            :error="errors.content"
          />
          <p class="text-sm text-muted-foreground">
            Use the toolbar above to format your content
          </p>
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

      <!-- SEO Settings -->
      <div class="bg-card rounded-lg p-6 shadow-sm">
        <h2 class="text-xl font-bold mb-4">SEO Settings</h2>

        <div class="space-y-6">
          <!-- Meta Title -->
          <div class="space-y-2">
            <label for="meta-title" class="text-sm font-medium">
              Meta Title
            </label>
            <div class="flex">
              <input
                id="meta-title"
                v-model="formData.meta_title"
                type="text"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Meta title for SEO"
              />
              <button
                type="button"
                class="ml-2 px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
                @click="generateMetaTitle"
              >
                Use Title
              </button>
            </div>
            <p class="text-sm text-muted-foreground">
              The title that appears in search engine results (recommended: 50-60 characters)
            </p>
          </div>

          <!-- Meta Description -->
          <div class="space-y-2">
            <label for="meta-description" class="text-sm font-medium">
              Meta Description
            </label>
            <textarea
              id="meta-description"
              v-model="formData.meta_description"
              class="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Meta description for SEO"
              rows="3"
            ></textarea>
            <p class="text-sm text-muted-foreground">
              The description that appears in search engine results (recommended: 150-160 characters)
            </p>
          </div>
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
          <span v-else>{{ isEditing ? 'Update' : 'Create' }} Page</span>
        </button>
      </div>
    </form>
  </div>
</template>
