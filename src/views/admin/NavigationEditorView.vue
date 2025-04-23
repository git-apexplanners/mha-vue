<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useNavigationStore } from '@/stores/navigation'
import { NavItem } from '@/types/navigation'
import MenuItemList from '@/components/admin/navigation/MenuItemList.vue'
import MenuItemEditor from '@/components/admin/navigation/MenuItemEditor.vue'
import NavigationPreview from '@/components/admin/navigation/NavigationPreview.vue'
import { toastService } from '@/composables/useToast'

const navigationStore = useNavigationStore()
const loading = ref(true)
const editingItem = ref<NavItem | null>(null)
const isNewItem = ref(false)
const newItemParentId = ref<string | undefined>(undefined)
const previewMode = ref(false)
const validationErrors = ref<string[]>([])

// Load navigation items
onMounted(async () => {
  try {
    await navigationStore.fetchNavigationItems()
  } catch (error) {
    console.error('Failed to load navigation items:', error)
    toastService.error({
      title: 'Error',
      description: 'Failed to load navigation menu. Please try again.'
    })
  } finally {
    loading.value = false
  }
})

// Computed properties
const hasUnsavedChanges = computed(() => navigationStore.isDirty)

// Methods
function handleEditItem(item: NavItem) {
  editingItem.value = item
  isNewItem.value = false
}

function handleAddItem(parentId?: string) {
  isNewItem.value = true
  newItemParentId.value = parentId
  editingItem.value = null
}

function handleSaveItem(item: NavItem) {
  toastService.success({
    title: 'Success',
    description: isNewItem.value ? 'Menu item added successfully' : 'Menu item updated successfully'
  })

  // Reset editing state
  editingItem.value = null
  isNewItem.value = false
  newItemParentId.value = undefined
}

function handleCancelEdit() {
  editingItem.value = null
  isNewItem.value = false
  newItemParentId.value = undefined
}

function handleDeleteItem(id: string) {
  if (navigationStore.deleteNavigationItem(id)) {
    toastService.success({
      title: 'Success',
      description: 'Menu item deleted successfully'
    })
    editingItem.value = null
  } else {
    toastService.error({
      title: 'Error',
      description: 'Failed to delete menu item'
    })
  }
}

async function saveNavigation() {
  // Validate navigation items
  const validation = navigationStore.validateNavigationItems()
  if (!validation.valid) {
    validationErrors.value = validation.errors
    toastService.error({
      title: 'Validation Error',
      description: 'Please fix the errors before saving'
    })
    return
  }

  validationErrors.value = []

  try {
    await navigationStore.saveNavigationItems()
    toastService.success({
      title: 'Success',
      description: 'Navigation menu saved successfully'
    })
  } catch (error) {
    console.error('Failed to save navigation:', error)
    toastService.error({
      title: 'Error',
      description: 'Failed to save navigation menu'
    })
  }
}

function resetNavigation() {
  if (confirm('Are you sure you want to reset the navigation menu to default? This will discard all your changes.')) {
    navigationStore.resetNavigation()
    toastService.success({
      title: 'Reset Complete',
      description: 'Navigation menu reset to default'
    })
  }
}

function togglePreview() {
  previewMode.value = !previewMode.value
}


</script>

<template>
  <div>
    <header class="mb-6">
      <h1 class="text-2xl font-bold">Navigation Menu Editor</h1>
      <p class="text-muted-foreground">
        Drag and drop items to reorder. Click on items to edit or add new ones.
      </p>
    </header>

    <div v-if="loading" class="flex justify-center my-12">
      <div class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Navigation Editor -->
      <div class="lg:col-span-2">
        <div class="bg-card border rounded-lg p-4 mb-4">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">Menu Structure</h2>
            <div class="flex space-x-2">
              <button
                type="button"
                class="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
                @click="togglePreview"
              >
                {{ previewMode ? 'Edit Mode' : 'Preview' }}
              </button>
              <button
                type="button"
                class="px-3 py-1 text-sm bg-destructive/10 text-destructive rounded-md hover:bg-destructive/20"
                @click="resetNavigation"
              >
                Reset
              </button>
              <button
                type="button"
                class="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                :disabled="!hasUnsavedChanges"
                @click="saveNavigation"
              >
                Save Changes
              </button>
            </div>
          </div>

          <!-- Validation errors -->
          <div v-if="validationErrors.length > 0" class="mb-4 p-3 bg-destructive/10 border border-destructive rounded-md">
            <h3 class="font-bold text-destructive mb-2">Please fix the following errors:</h3>
            <ul class="list-disc pl-5 text-sm">
              <li v-for="(error, index) in validationErrors" :key="index" class="text-destructive">
                {{ error }}
              </li>
            </ul>
          </div>

          <!-- Preview mode -->
          <div v-if="previewMode" class="border rounded-md p-4 bg-background">
            <h3 class="text-lg font-bold mb-4">Navigation Preview</h3>
            <NavigationPreview
              :items="navigationStore.navigationItems"
            />
          </div>

          <!-- Edit mode -->
          <div v-else>
            <MenuItemList
              :items="navigationStore.navigationItems"
              @edit="handleEditItem"
              @add="handleAddItem"
            />
          </div>
        </div>

        <!-- Drag and drop instructions -->
        <div class="bg-muted p-4 rounded-md text-sm">
          <h3 class="font-bold mb-2">Instructions:</h3>
          <ul class="list-disc pl-5 space-y-1">
            <li>Drag and drop items to reorder or change their parent</li>
            <li>Click the + button to add a new item</li>
            <li>Click the edit button to modify an item</li>
            <li>Items with children will have an expand/collapse button</li>
            <li>Click "Save Changes" when you're done to apply your changes</li>
          </ul>
        </div>
      </div>

      <!-- Item Editor -->
      <div>
        <div v-if="editingItem || isNewItem" class="sticky top-4">
          <MenuItemEditor
            :item="editingItem"
            :is-new="isNewItem"
            :parent-id="newItemParentId"
            @save="handleSaveItem"
            @cancel="handleCancelEdit"
            @delete="handleDeleteItem"
          />
        </div>
        <div v-else class="bg-muted p-6 rounded-lg border border-dashed text-center">
          <h3 class="text-lg font-medium mb-2">Menu Item Editor</h3>
          <p class="text-muted-foreground mb-4">
            Select an item to edit or click the + button to add a new item.
          </p>
          <button
            type="button"
            class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            @click="handleAddItem()"
          >
            Add Root Item
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
