<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCategoriesStore } from '@/stores/categories'
import { toastService } from '@/composables/useToast'
import type { Category } from '@/stores/categories'

const categoriesStore = useCategoriesStore()
const route = useRoute()

// State
const loading = ref(true)
const isModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const categoryToEdit = ref<Partial<Category> | null>(null)
const categoryToDelete = ref<Category | null>(null)
const formErrors = ref<Record<string, string>>({})

// Form data
const formData = ref({
  id: '',
  name: '',
  slug: '',
  parent_id: null as string | null
})

// Load categories
onMounted(async () => {
  try {
    await categoriesStore.fetchCategories()

    // Check if we should open the create modal based on query parameter
    if (route.query.action === 'create') {
      openCreateModal()
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
    toastService.error({
      title: 'Error',
      description: 'Failed to load categories. Please try again.'
    })
  } finally {
    loading.value = false
  }
})

// Watch for route query changes
watch(() => route.query, (newQuery) => {
  if (newQuery.action === 'create') {
    openCreateModal()
  }
})

// Open modal to create a new category
const openCreateModal = () => {
  formData.value = {
    id: '',
    name: '',
    slug: '',
    parent_id: null
  }
  formErrors.value = {}
  isModalOpen.value = true
}

// Open modal to edit a category
const openEditModal = (category: Category) => {
  formData.value = {
    id: category.id,
    name: category.name,
    slug: category.slug,
    parent_id: category.parent_id
  }
  formErrors.value = {}
  isModalOpen.value = true
}

// Close the modal
const closeModal = () => {
  isModalOpen.value = false
}

// Generate slug from name
const generateSlug = () => {
  if (!formData.value.name) return

  formData.value.slug = formData.value.name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// Validate form
const validateForm = () => {
  const newErrors: Record<string, string> = {}

  if (!formData.value.name.trim()) {
    newErrors.name = 'Name is required'
  }

  if (!formData.value.slug.trim()) {
    newErrors.slug = 'Slug is required'
  } else if (!/^[a-z0-9-]+$/.test(formData.value.slug)) {
    newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens'
  }

  formErrors.value = newErrors
  return Object.keys(newErrors).length === 0
}

// Save category
const saveCategory = async () => {
  if (!validateForm()) {
    return
  }

  try {
    let result

    if (formData.value.id) {
      // Update existing category
      result = await categoriesStore.updateCategory(formData.value.id, {
        name: formData.value.name,
        slug: formData.value.slug,
        parent_id: formData.value.parent_id
      })
    } else {
      // Create new category
      result = await categoriesStore.createCategory({
        name: formData.value.name,
        slug: formData.value.slug,
        parent_id: formData.value.parent_id
      })
    }

    if (result) {
      toastService.success({
        title: 'Success',
        description: `Category ${formData.value.id ? 'updated' : 'created'} successfully`
      })
      closeModal()
    } else {
      throw new Error(`Failed to ${formData.value.id ? 'update' : 'create'} category`)
    }
  } catch (error) {
    console.error('Error saving category:', error)
    toastService.error({
      title: 'Error',
      description: `Failed to ${formData.value.id ? 'update' : 'create'} category. Please try again.`
    })
  }
}

// Open delete confirmation modal
const confirmDelete = (category: Category) => {
  categoryToDelete.value = category
  isDeleteModalOpen.value = true
}

// Cancel delete
const cancelDelete = () => {
  categoryToDelete.value = null
  isDeleteModalOpen.value = false
}

// Delete category
const deleteCategory = async () => {
  if (!categoryToDelete.value) return

  try {
    const success = await categoriesStore.deleteCategory(categoryToDelete.value.id)

    if (success) {
      toastService.success({
        title: 'Success',
        description: `Category "${categoryToDelete.value.name}" has been deleted.`
      })
    } else {
      throw new Error('Failed to delete category')
    }
  } catch (error) {
    console.error('Error deleting category:', error)
    toastService.error({
      title: 'Error',
      description: 'Failed to delete category. Please try again.'
    })
  } finally {
    cancelDelete()
  }
}

// Get parent category name
const getParentCategoryName = (parentId: string | null) => {
  if (!parentId) return 'None'

  const category = categoriesStore.categories.find(c => c.id === parentId)
  return category ? category.name : 'Unknown'
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
        <h1 class="text-3xl font-bold">Categories</h1>
        <p class="text-muted-foreground">Manage project categories</p>
      </div>
      <button
        @click="openCreateModal"
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
        New Category
      </button>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>

    <!-- No Categories -->
    <div v-else-if="categoriesStore.categories.length === 0" class="text-center py-12">
      <h3 class="text-xl font-bold mb-2">No categories found</h3>
      <p class="text-muted-foreground mb-4">Create your first category to get started</p>
      <button
        @click="openCreateModal"
        class="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
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
        New Category
      </button>
    </div>

    <!-- Categories Table -->
    <div v-else class="bg-card rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-3 px-4 font-medium">Name</th>
              <th class="text-left py-3 px-4 font-medium">Slug</th>
              <th class="text-left py-3 px-4 font-medium">Parent</th>
              <th class="text-left py-3 px-4 font-medium">Created</th>
              <th class="text-right py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categoriesStore.categories" :key="category.id" class="border-b">
              <td class="py-3 px-4">{{ category.name }}</td>
              <td class="py-3 px-4">{{ category.slug }}</td>
              <td class="py-3 px-4">{{ getParentCategoryName(category.parent_id) }}</td>
              <td class="py-3 px-4">{{ formatDate(category.created_at) }}</td>
              <td class="py-3 px-4 text-right">
                <div class="flex justify-end gap-2">
                  <button @click="openEditModal(category)" class="text-primary hover:text-primary/80">
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
                  <button @click="confirmDelete(category)" class="text-destructive hover:text-destructive/80">
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

    <!-- Category Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 bg-background/80 flex items-center justify-center">
      <div class="bg-card rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-bold mb-4">{{ formData.id ? 'Edit' : 'New' }} Category</h3>

        <form @submit.prevent="saveCategory" class="space-y-4">
          <!-- Name -->
          <div class="space-y-2">
            <label for="name" class="text-sm font-medium">
              Name <span class="text-destructive">*</span>
            </label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              :class="[
                'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                formErrors.name ? 'border-destructive focus-visible:ring-destructive' : ''
              ]"
              placeholder="Category name"
              @blur="generateSlug"
            />
            <p v-if="formErrors.name" class="text-sm text-destructive">{{ formErrors.name }}</p>
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
                  formErrors.slug ? 'border-destructive focus-visible:ring-destructive' : ''
                ]"
                placeholder="category-slug"
              />
              <button
                type="button"
                class="ml-2 px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
                @click="generateSlug"
              >
                Generate
              </button>
            </div>
            <p v-if="formErrors.slug" class="text-sm text-destructive">{{ formErrors.slug }}</p>
          </div>

          <!-- Parent Category -->
          <div class="space-y-2">
            <label for="parent" class="text-sm font-medium">
              Parent Category
            </label>
            <select
              id="parent"
              v-model="formData.parent_id"
              class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option :value="null">None (Top Level)</option>
              <option
                v-for="category in categoriesStore.categories"
                :key="category.id"
                :value="category.id"
                :disabled="category.id === formData.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end gap-2 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {{ formData.id ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="isDeleteModalOpen" class="fixed inset-0 z-50 bg-background/80 flex items-center justify-center">
      <div class="bg-card rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-bold mb-2">Delete Category</h3>
        <p class="mb-4">
          Are you sure you want to delete the category "{{ categoryToDelete?.name }}"? This action cannot be undone.
        </p>
        <div class="flex justify-end gap-2">
          <button
            @click="cancelDelete"
            class="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          >
            Cancel
          </button>
          <button
            @click="deleteCategory"
            class="px-4 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
