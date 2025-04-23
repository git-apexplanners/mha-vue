<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useNavigationStore } from '@/stores/navigation'
import { NavItem } from '@/types/navigation'
import { toastService } from '@/composables/useToast'

const props = defineProps<{
  pageName: string
  pageSlug: string
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'added'): void
}>()

const navigationStore = useNavigationStore()
const loading = ref(false)
const selectedParentId = ref<string | null>(null)
const icon = ref('file')

// Computed properties
const pageUrl = computed(() => `/${props.pageSlug}`)

// Flat list of potential parent items (excluding items that would create circular references)
const potentialParents = computed(() => {
  return [
    { id: null, name: 'Root Level (Main Menu)' },
    ...navigationStore.flatNavigationItems
      .filter(item => item.children !== undefined || item.children?.length === 0)
      .map(item => ({
        id: item.id,
        name: '—'.repeat(item.level || 0) + ' ' + item.name
      }))
  ]
})

// Load navigation data
onMounted(async () => {
  loading.value = true
  try {
    await navigationStore.fetchNavigationItems()
  } catch (error) {
    console.error('Failed to load navigation data:', error)
    toastService.error({
      title: 'Error',
      description: 'Failed to load navigation data'
    })
  } finally {
    loading.value = false
  }
})

// Add the page to navigation
async function addToNavigation() {
  try {
    // Create the new navigation item
    const newItem = navigationStore.addNavigationItem({
      name: props.pageName,
      href: pageUrl.value,
      icon: icon.value
    }, selectedParentId.value || undefined)

    // Save the navigation changes
    await navigationStore.saveNavigationItems()

    toastService.success({
      title: 'Success',
      description: 'Page added to navigation menu'
    })

    emit('added')
    emit('close')
  } catch (error) {
    console.error('Failed to add page to navigation:', error)
    toastService.error({
      title: 'Error',
      description: 'Failed to add page to navigation menu'
    })
  }
}

// Close the modal
function closeModal() {
  emit('close')
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-background rounded-lg shadow-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Add Page to Navigation</h2>
        <button
          type="button"
          class="text-muted-foreground hover:text-foreground"
          @click="closeModal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div v-if="loading" class="flex justify-center py-8">
        <div class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>

      <form v-else @submit.prevent="addToNavigation" class="space-y-4">
        <div class="space-y-2">
          <label class="text-sm font-medium">Page Name</label>
          <input
            type="text"
            :value="pageName"
            disabled
            class="w-full px-3 py-2 border rounded-md bg-muted text-muted-foreground"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium">Page URL</label>
          <input
            type="text"
            :value="pageUrl"
            disabled
            class="w-full px-3 py-2 border rounded-md bg-muted text-muted-foreground"
          />
        </div>

        <div class="space-y-2">
          <label for="parent" class="text-sm font-medium">Add to</label>
          <select
            id="parent"
            v-model="selectedParentId"
            class="w-full px-3 py-2 border rounded-md"
          >
            <option
              v-for="parent in potentialParents"
              :key="parent.id || 'root'"
              :value="parent.id"
            >
              {{ parent.name }}
            </option>
          </select>
          <p class="text-sm text-muted-foreground">
            Select where to add this page in the navigation menu
          </p>
        </div>

        <div class="space-y-2">
          <label for="icon" class="text-sm font-medium">Icon</label>
          <select
            id="icon"
            v-model="icon"
            class="w-full px-3 py-2 border rounded-md"
          >
            <option value="file">File</option>
            <option value="info">Info</option>
            <option value="folder">Folder</option>
            <option value="pen-tool">Pen Tool</option>
            <option value="award">Award</option>
            <option value="book-open">Book Open</option>
            <option value="mail">Mail</option>
            <option value="building">Building</option>
            <option value="home">Home</option>
          </select>
          <p class="text-sm text-muted-foreground">
            Select an icon to display next to the menu item
          </p>
        </div>

        <div class="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            class="px-4 py-2 border rounded-md hover:bg-muted"
            @click="closeModal"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Add to Navigation
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
