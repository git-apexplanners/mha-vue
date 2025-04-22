<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePagesStore } from '@/stores/pages'
import { toastService } from '@/composables/useToast'
import type { Page } from '@/stores/pages'

const router = useRouter()
const pagesStore = usePagesStore()

// State
const loading = ref(true)
const isDeleteModalOpen = ref(false)
const pageToDelete = ref<Page | null>(null)
const isDragging = ref(false)
const draggedPage = ref<Page | null>(null)

// Load pages
onMounted(async () => {
  try {
    await pagesStore.fetchPages()
  } catch (error) {
    console.error('Error fetching pages:', error)
    toastService.error({
      title: 'Error',
      description: 'Failed to load pages. Please try again.'
    })
  } finally {
    loading.value = false
  }
})

// Navigate to create new page
const createNewPage = () => {
  router.push('/admin/pages/new')
}

// Navigate to edit page
const editPage = (id: string) => {
  router.push(`/admin/pages/${id}`)
}

// View page
const viewPage = (slug: string) => {
  router.push(`/pages/${slug}`)
}

// Confirm delete
const confirmDelete = (page: Page) => {
  pageToDelete.value = page
  isDeleteModalOpen.value = true
}

// Cancel delete
const cancelDelete = () => {
  pageToDelete.value = null
  isDeleteModalOpen.value = false
}

// Delete page
const deletePage = async () => {
  if (!pageToDelete.value) return
  
  try {
    const success = await pagesStore.deletePage(pageToDelete.value.id)
    
    if (success) {
      toastService.success({
        title: 'Success',
        description: `Page "${pageToDelete.value.title}" has been deleted.`
      })
    } else {
      throw new Error('Failed to delete page')
    }
  } catch (error) {
    console.error('Error deleting page:', error)
    toastService.error({
      title: 'Error',
      description: 'Failed to delete page. Please try again.'
    })
  } finally {
    cancelDelete()
  }
}

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

// Drag and drop functionality for reordering
const onDragStart = (page: Page) => {
  isDragging.value = true
  draggedPage.value = page
}

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
}

const onDrop = async (targetPage: Page) => {
  if (!draggedPage.value || draggedPage.value.id === targetPage.id) {
    isDragging.value = false
    draggedPage.value = null
    return
  }
  
  // Create a new array with the updated order
  const newOrder = [...pagesStore.pages]
  const draggedIndex = newOrder.findIndex(p => p.id === draggedPage.value?.id)
  const targetIndex = newOrder.findIndex(p => p.id === targetPage.id)
  
  // Remove the dragged item and insert it at the target position
  const [removed] = newOrder.splice(draggedIndex, 1)
  newOrder.splice(targetIndex, 0, removed)
  
  // Update the sort_order property
  const updatedPages = newOrder.map((page, index) => ({
    ...page,
    sort_order: index
  }))
  
  // Reset drag state
  isDragging.value = false
  draggedPage.value = null
  
  // Save the new order
  try {
    await pagesStore.reorderPages(updatedPages.map(p => p.id))
    toastService.success({
      title: 'Success',
      description: 'Page order updated successfully.'
    })
  } catch (error) {
    console.error('Error reordering pages:', error)
    toastService.error({
      title: 'Error',
      description: 'Failed to update page order. Please try again.'
    })
  }
}

const onDragEnd = () => {
  isDragging.value = false
  draggedPage.value = null
}
</script>

<template>
  <div>
    <header class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold">Pages</h1>
        <p class="text-muted-foreground">Manage website pages</p>
      </div>
      <button
        @click="createNewPage"
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
        New Page
      </button>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>

    <!-- No Pages -->
    <div v-else-if="pagesStore.pages.length === 0" class="text-center py-12">
      <h3 class="text-xl font-bold mb-2">No pages found</h3>
      <p class="text-muted-foreground mb-4">Create your first page to get started</p>
      <button
        @click="createNewPage"
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
        New Page
      </button>
    </div>

    <!-- Pages Table -->
    <div v-else class="bg-card rounded-lg shadow-sm overflow-hidden">
      <div class="p-4 border-b">
        <p class="text-sm text-muted-foreground">
          Drag and drop pages to reorder them. The order here determines the navigation menu order.
        </p>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-3 px-4 font-medium w-12">#</th>
              <th class="text-left py-3 px-4 font-medium">Title</th>
              <th class="text-left py-3 px-4 font-medium">Slug</th>
              <th class="text-left py-3 px-4 font-medium">Status</th>
              <th class="text-left py-3 px-4 font-medium">Updated</th>
              <th class="text-right py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(page, index) in pagesStore.pages"
              :key="page.id"
              class="border-b"
              draggable="true"
              @dragstart="onDragStart(page)"
              @dragover="onDragOver"
              @drop="onDrop(page)"
              @dragend="onDragEnd"
              :class="{ 'opacity-50': isDragging && draggedPage?.id === page.id }"
            >
              <td class="py-3 px-4 text-muted-foreground">
                {{ index + 1 }}
              </td>
              <td class="py-3 px-4">{{ page.title }}</td>
              <td class="py-3 px-4">{{ page.slug }}</td>
              <td class="py-3 px-4">
                <span 
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    page.published 
                      ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400'
                  ]"
                >
                  {{ page.published ? 'Published' : 'Draft' }}
                </span>
              </td>
              <td class="py-3 px-4">{{ formatDate(page.updated_at) }}</td>
              <td class="py-3 px-4 text-right">
                <div class="flex justify-end gap-2">
                  <button @click="editPage(page.id)" class="text-primary hover:text-primary/80">
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
                  <button @click="viewPage(page.slug)" class="text-primary hover:text-primary/80">
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
                  <button @click="confirmDelete(page)" class="text-destructive hover:text-destructive/80">
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

    <!-- Delete Confirmation Modal -->
    <div v-if="isDeleteModalOpen" class="fixed inset-0 z-50 bg-background/80 flex items-center justify-center">
      <div class="bg-card rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-bold mb-2">Delete Page</h3>
        <p class="mb-4">
          Are you sure you want to delete the page "{{ pageToDelete?.title }}"? This action cannot be undone.
        </p>
        <div class="flex justify-end gap-2">
          <button
            @click="cancelDelete"
            class="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          >
            Cancel
          </button>
          <button
            @click="deletePage"
            class="px-4 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
