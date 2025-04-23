<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useNavigationStore } from '@/stores/navigation'
import { NavItem } from '@/types/navigation'
import IconSelector from './IconSelector.vue'

const props = defineProps<{
  item?: NavItem
  isNew?: boolean
  parentId?: string
}>()

const emit = defineEmits<{
  (e: 'save', item: NavItem): void
  (e: 'cancel'): void
  (e: 'delete', id: string): void
}>()

const navigationStore = useNavigationStore()

// Form data
const name = ref(props.item?.name || '')
const href = ref(props.item?.href || '')
const icon = ref(props.item?.icon || '')
const hasChildren = ref(!!props.item?.children?.length)

// Validation
const errors = ref<Record<string, string>>({})

// Computed properties
const isValid = computed(() => {
  return name.value.trim() !== '' &&
    (href.value.trim() !== '' || hasChildren.value) &&
    (!href.value.trim() || isValidUrl(href.value))
})

const title = computed(() => {
  if (props.isNew) {
    return 'Add New Menu Item'
  }
  return 'Edit Menu Item'
})

// Watch for changes in the item prop
watch(() => props.item, (newItem) => {
  if (newItem) {
    name.value = newItem.name
    href.value = newItem.href || ''
    icon.value = newItem.icon || ''
    hasChildren.value = !!newItem.children?.length
  }
}, { deep: true })

// Methods
function validateForm() {
  errors.value = {}

  if (name.value.trim() === '') {
    errors.value.name = 'Name is required'
  }

  if (!hasChildren.value && href.value.trim() === '') {
    errors.value.href = 'URL is required if item has no children'
  }

  if (href.value.trim() && !isValidUrl(href.value)) {
    errors.value.href = 'Invalid URL format'
  }

  return Object.keys(errors.value).length === 0
}

function isValidUrl(url: string): boolean {
  // Internal links should start with /
  if (url.startsWith('/')) return true

  // External links should be valid URLs
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

function saveItem() {
  if (!validateForm()) return

  if (props.isNew) {
    const newItem = navigationStore.addNavigationItem({
      name: name.value,
      href: hasChildren.value ? undefined : href.value,
      icon: icon.value || undefined
    }, props.parentId)

    emit('save', newItem)
  } else if (props.item) {
    const updatedItem = navigationStore.updateNavigationItem(props.item.id, {
      name: name.value,
      href: hasChildren.value ? undefined : href.value,
      icon: icon.value || undefined
    })

    if (updatedItem) {
      emit('save', updatedItem)
    }
  }
}

function handleDelete() {
  if (props.item) {
    if (confirm(`Are you sure you want to delete "${props.item.name}"? This will also delete any child items.`)) {
      emit('delete', props.item.id)
    }
  }
}

function cancel() {
  emit('cancel')
}

function toggleHasChildren() {
  hasChildren.value = !hasChildren.value
  if (hasChildren.value) {
    href.value = ''
  }
}
</script>

<template>
  <div class="bg-card p-4 rounded-lg border shadow-sm">
    <h3 class="text-lg font-bold mb-4">{{ title }}</h3>

    <form @submit.prevent="saveItem" class="space-y-4">
      <!-- Name field -->
      <div>
        <label for="name" class="block text-sm font-medium mb-1">Name *</label>
        <input
          id="name"
          v-model="name"
          type="text"
          class="w-full px-3 py-2 border rounded-md"
          :class="{ 'border-destructive': errors.name }"
          placeholder="Menu item name"
        />
        <p v-if="errors.name" class="text-destructive text-sm mt-1">{{ errors.name }}</p>
      </div>

      <!-- Has Children toggle -->
      <div class="flex items-center">
        <input
          id="hasChildren"
          v-model="hasChildren"
          type="checkbox"
          class="mr-2"
          @change="toggleHasChildren"
        />
        <label for="hasChildren" class="text-sm font-medium">This item has children (submenu)</label>
      </div>

      <!-- URL field (only shown if not a parent item) -->
      <div v-if="!hasChildren">
        <label for="href" class="block text-sm font-medium mb-1">URL *</label>
        <input
          id="href"
          v-model="href"
          type="text"
          class="w-full px-3 py-2 border rounded-md"
          :class="{ 'border-destructive': errors.href }"
          placeholder="/page-url or https://external-url.com"
        />
        <p v-if="errors.href" class="text-destructive text-sm mt-1">{{ errors.href }}</p>
        <p v-else class="text-muted-foreground text-xs mt-1">
          Internal links should start with / (e.g., /about). External links should include https:// (e.g., https://example.com)
        </p>
      </div>

      <!-- Icon selector -->
      <IconSelector v-model="icon" />

      <!-- Action buttons -->
      <div class="flex justify-between pt-4">
        <div>
          <button
            v-if="!isNew"
            type="button"
            class="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 mr-2"
            @click="handleDelete"
          >
            Delete
          </button>
          <button
            type="button"
            class="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
            @click="cancel"
          >
            Cancel
          </button>
        </div>
        <button
          type="submit"
          class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          :disabled="!isValid"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>
