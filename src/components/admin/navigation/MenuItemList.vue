<script setup lang="ts">
import { ref, computed } from 'vue'
import { useNavigationStore } from '@/stores/navigation'
import { NavItem } from '@/types/navigation'
import { useDraggable } from '@vueuse/core'

const props = defineProps<{
  items: NavItem[]
  parentId?: string
  level?: number
}>()

const emit = defineEmits<{
  (e: 'edit', item: NavItem): void
  (e: 'add', parentId?: string): void
}>()

const navigationStore = useNavigationStore()
const currentLevel = props.level || 0
const draggedItem = ref<NavItem | null>(null)
const dropTarget = ref<NavItem | null>(null)
const expandedItems = ref<Record<string, boolean>>({})

// Computed properties
const sortedItems = computed(() => {
  return [...props.items].sort((a, b) => (a.order || 0) - (b.order || 0))
})

// Methods
function handleEdit(item: NavItem) {
  emit('edit', item)
}

function handleAdd(parentId?: string) {
  emit('add', parentId)
}

function toggleExpand(itemId: string) {
  expandedItems.value[itemId] = !expandedItems.value[itemId]
}

function isExpanded(itemId: string): boolean {
  return !!expandedItems.value[itemId]
}

function moveUp(item: NavItem) {
  navigationStore.moveItemUp(item.id)
}

function moveDown(item: NavItem) {
  navigationStore.moveItemDown(item.id)
}

function handleDragStart(item: NavItem) {
  draggedItem.value = item
}

function handleDragOver(item: NavItem) {
  if (draggedItem.value && draggedItem.value.id !== item.id) {
    dropTarget.value = item
  }
}

function handleDrop(targetItem: NavItem) {
  if (!draggedItem.value) return

  // Don't drop on itself
  if (draggedItem.value.id === targetItem.id) {
    draggedItem.value = null
    dropTarget.value = null
    return
  }

  // Determine if we're dropping as a child or sibling
  const isDropAsChild = dropPosition.value === 'child'

  if (isDropAsChild) {
    // Move as a child of the target
    navigationStore.moveItemToParent(draggedItem.value.id, targetItem.id)

    // Expand the target to show the newly added child
    expandedItems.value[targetItem.id] = true
  } else {
    // Move as a sibling (same parent)
    const targetParentId = targetItem.parent_id || null
    navigationStore.moveItemToParent(draggedItem.value.id, targetParentId)

    // Reorder items
    const siblings = targetParentId
      ? navigationStore.findItemById(targetParentId)?.children || []
      : navigationStore.navigationItems

    const draggedIndex = siblings.findIndex(item => item.id === draggedItem.value?.id)
    const targetIndex = siblings.findIndex(item => item.id === targetItem.id)

    if (draggedIndex !== -1 && targetIndex !== -1) {
      // Swap orders
      const items = [...siblings]
      const temp = items[draggedIndex]
      items.splice(draggedIndex, 1)
      items.splice(targetIndex, 0, temp)

      // Update orders
      items.forEach((item, index) => {
        navigationStore.updateNavigationItem(item.id, { order: index + 1 })
      })
    }
  }

  // Reset drag state
  draggedItem.value = null
  dropTarget.value = null
}

function handleDragEnd() {
  draggedItem.value = null
  dropTarget.value = null
}

// Track drop position (as child or sibling)
const dropPosition = ref<'child' | 'sibling'>('sibling')

function updateDropPosition(e: MouseEvent, item: NavItem) {
  if (!draggedItem.value || draggedItem.value.id === item.id) return

  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const mouseY = e.clientY
  const threshold = rect.top + rect.height * 0.25

  // If mouse is in the top 25% of the item, drop as sibling
  // Otherwise, drop as child
  dropPosition.value = mouseY < threshold ? 'sibling' : 'child'
}

// Get icon component based on icon name
function getIconComponent(iconName?: string) {
  if (!iconName) return null

  switch (iconName) {
    case 'home':
      return 'HomeIcon'
    case 'info':
      return 'InfoIcon'
    case 'user':
      return 'UserIcon'
    case 'building':
      return 'BuildingIcon'
    case 'folder':
      return 'FolderIcon'
    case 'file':
      return 'FileIcon'
    case 'pen-tool':
      return 'PenToolIcon'
    case 'award':
      return 'AwardIcon'
    case 'book-open':
      return 'BookOpenIcon'
    case 'mail':
      return 'MailIcon'
    default:
      return null
  }
}
</script>

<template>
  <div :class="{ 'ml-6': currentLevel > 0 }">
    <ul class="space-y-2">
      <li
        v-for="item in sortedItems"
        :key="item.id"
        class="border rounded-md overflow-hidden"
        :class="{
          'border-primary': draggedItem?.id === item.id,
          'border-dashed border-primary bg-primary/5': dropTarget?.id === item.id
        }"
        draggable="true"
        @dragstart="handleDragStart(item)"
        @dragover.prevent="handleDragOver(item); updateDropPosition($event, item)"
        @drop.prevent="handleDrop(item)"
        @dragend="handleDragEnd"
      >
        <div
          class="flex items-center justify-between p-3 bg-card hover:bg-muted cursor-move"
          :class="{ 'bg-muted': isExpanded(item.id) }"
        >
          <div class="flex items-center">
            <!-- Expand/collapse button for items with children -->
            <button
              v-if="item.children && item.children.length > 0"
              type="button"
              class="mr-2 text-muted-foreground hover:text-foreground"
              @click.stop="toggleExpand(item.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                :class="{ 'transform rotate-90': isExpanded(item.id) }"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            <!-- Icon (if any) -->
            <div v-if="item.icon" class="mr-2 text-muted-foreground">
              <!-- Home icon -->
              <svg v-if="item.icon === 'home'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>

              <!-- Info icon -->
              <svg v-else-if="item.icon === 'info'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>

              <!-- Default for other icons -->
              <span v-else class="text-xs">{{ item.icon }}</span>
            </div>

            <!-- Item name -->
            <span class="font-medium">{{ item.name }}</span>

            <!-- URL (if any) -->
            <span v-if="item.href" class="ml-2 text-xs text-muted-foreground">{{ item.href }}</span>
          </div>

          <div class="flex items-center">
            <!-- Move up/down buttons -->
            <button
              type="button"
              class="p-1 text-muted-foreground hover:text-foreground"
              @click.stop="moveUp(item)"
              title="Move up"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m18 15-6-6-6 6"/>
              </svg>
            </button>

            <button
              type="button"
              class="p-1 text-muted-foreground hover:text-foreground"
              @click.stop="moveDown(item)"
              title="Move down"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>

            <!-- Add child button -->
            <button
              type="button"
              class="p-1 text-muted-foreground hover:text-foreground"
              @click.stop="handleAdd(item.id)"
              title="Add child item"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 5v14"/>
                <path d="M5 12h14"/>
              </svg>
            </button>

            <!-- Edit button -->
            <button
              type="button"
              class="p-1 text-muted-foreground hover:text-foreground"
              @click.stop="handleEdit(item)"
              title="Edit item"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                <path d="m15 5 4 4"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Children (if expanded) -->
        <div v-if="item.children && item.children.length > 0 && isExpanded(item.id)">
          <MenuItemList
            :items="item.children"
            :parent-id="item.id"
            :level="currentLevel + 1"
            @edit="handleEdit"
            @add="handleAdd"
          />
        </div>
      </li>
    </ul>

    <!-- Add button at current level -->
    <button
      type="button"
      class="mt-4 flex items-center text-sm text-primary hover:text-primary/80"
      @click="handleAdd(props.parentId)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
        <path d="M12 5v14"/>
        <path d="M5 12h14"/>
      </svg>
      Add {{ currentLevel > 0 ? 'Child' : 'Root' }} Item
    </button>
  </div>
</template>
