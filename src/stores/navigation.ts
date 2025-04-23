import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useToast } from '@/composables/useToast'
import { NavItem } from '@/types/navigation'

export const useNavigationStore = defineStore('navigation', () => {
  const toast = useToast()
  const navigationItems = ref<NavItem[]>([])
  const loading = ref(false)
  const error = ref('')
  const isDirty = ref(false)

  // Default navigation items
  const defaultNavigationItems: NavItem[] = [
    { id: '1', name: 'Home', href: '/', icon: 'home', order: 1 },
    { id: '2', name: 'About', href: '/about', icon: 'info', order: 2 },
    {
      id: '3',
      name: 'Services',
      icon: 'building',
      order: 3,
      children: [
        { id: '3-1', name: 'Residential', href: '/services/residential', parent_id: '3', order: 1 },
        { id: '3-2', name: 'Commercial', href: '/services/commercial', parent_id: '3', order: 2 },
        { id: '3-3', name: 'Urban Design', href: '/services/urban', parent_id: '3', order: 3 },
        { id: '3-4', name: 'Interior Design', href: '/services/interior', parent_id: '3', order: 4 }
      ]
    },
    { id: '4', name: 'Portfolio', icon: 'folder', order: 4 },
    { id: '5', name: 'Design Process', href: '/design-process', icon: 'pen-tool', order: 5 },
    { id: '6', name: 'Achievements', href: '/achievements', icon: 'award', order: 6 },
    { id: '7', name: 'Publications', href: '/publications', icon: 'book-open', order: 7 },
    { id: '8', name: 'Contact', href: '/contact', icon: 'mail', order: 8 }
  ]

  // Fetch navigation items
  async function fetchNavigationItems() {
    loading.value = true
    error.value = ''

    try {
      // For development, use default navigation items
      // In production, this would be replaced with a real API call
      console.log('Using default navigation items')
      navigationItems.value = defaultNavigationItems
      return navigationItems.value
    } catch (err: any) {
      console.error('Failed to fetch navigation items', err)
      error.value = err.message || 'Failed to fetch navigation items'
      navigationItems.value = defaultNavigationItems
      return defaultNavigationItems
    } finally {
      loading.value = false
    }
  }

  // Save navigation items
  async function saveNavigationItems() {
    loading.value = true
    error.value = ''

    try {
      // For development, just simulate a successful save
      // In production, this would be replaced with a real API call
      console.log('Simulating save of navigation items:', navigationItems.value)

      // Simulate a delay to make it feel like it's saving
      await new Promise(resolve => setTimeout(resolve, 500))

      toast.success({
        title: 'Success',
        description: 'Navigation menu saved successfully'
      })
      isDirty.value = false
      return navigationItems.value
    } catch (err: any) {
      console.error('Failed to save navigation items', err)
      error.value = err.message || 'Failed to save navigation items'
      toast.error({
        title: 'Error',
        description: 'Failed to save navigation menu'
      })
      return null
    } finally {
      loading.value = false
    }
  }

  // Add a new navigation item
  function addNavigationItem(item: Partial<NavItem>, parentId?: string) {
    const newId = generateId()
    const newItem: NavItem = {
      id: newId,
      name: item.name !== undefined ? item.name : 'New Item',
      href: item.href,
      icon: item.icon,
      order: getNextOrder(parentId)
    }

    if (parentId) {
      newItem.parent_id = parentId
      // Find parent and add to its children
      const parent = findItemById(parentId)
      if (parent) {
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push(newItem)
      }
    } else {
      // Add to root level
      navigationItems.value.push(newItem)
    }

    isDirty.value = true
    return newItem
  }

  // Update a navigation item
  function updateNavigationItem(id: string, updates: Partial<NavItem>) {
    const item = findItemById(id)
    if (item) {
      Object.assign(item, updates)
      isDirty.value = true
      return item
    }
    return null
  }

  // Delete a navigation item
  function deleteNavigationItem(id: string) {
    const item = findItemById(id)
    if (!item) return false

    if (item.parent_id) {
      // Item has a parent, remove from parent's children
      const parent = findItemById(item.parent_id)
      if (parent && parent.children) {
        parent.children = parent.children.filter(child => child.id !== id)
      }
    } else {
      // Root level item
      navigationItems.value = navigationItems.value.filter(navItem => navItem.id !== id)
    }

    isDirty.value = true
    return true
  }

  // Move an item up in order
  function moveItemUp(id: string) {
    const item = findItemById(id)
    if (!item) return false

    const siblings = getSiblings(item)
    const index = siblings.findIndex(sibling => sibling.id === id)

    if (index <= 0) return false // Already at the top

    // Swap order with previous item
    const prevItem = siblings[index - 1]
    const tempOrder = item.order
    item.order = prevItem.order
    prevItem.order = tempOrder

    // Re-sort siblings by order
    siblings.sort((a, b) => (a.order || 0) - (b.order || 0))

    isDirty.value = true
    return true
  }

  // Move an item down in order
  function moveItemDown(id: string) {
    const item = findItemById(id)
    if (!item) return false

    const siblings = getSiblings(item)
    const index = siblings.findIndex(sibling => sibling.id === id)

    if (index === -1 || index >= siblings.length - 1) return false // Already at the bottom

    // Swap order with next item
    const nextItem = siblings[index + 1]
    const tempOrder = item.order
    item.order = nextItem.order
    nextItem.order = tempOrder

    // Re-sort siblings by order
    siblings.sort((a, b) => (a.order || 0) - (b.order || 0))

    isDirty.value = true
    return true
  }

  // Move an item to a new parent
  function moveItemToParent(id: string, newParentId: string | null) {
    const item = findItemById(id)
    if (!item) return false

    // Remove from current parent
    if (item.parent_id) {
      const currentParent = findItemById(item.parent_id)
      if (currentParent && currentParent.children) {
        currentParent.children = currentParent.children.filter(child => child.id !== id)
      }
    } else {
      navigationItems.value = navigationItems.value.filter(navItem => navItem.id !== id)
    }

    // Add to new parent
    if (newParentId) {
      const newParent = findItemById(newParentId)
      if (newParent) {
        if (!newParent.children) {
          newParent.children = []
        }
        item.parent_id = newParentId
        item.order = getNextOrder(newParentId)
        newParent.children.push(item)
      }
    } else {
      // Move to root level
      item.parent_id = null
      item.order = getNextOrder()
      navigationItems.value.push(item)
    }

    isDirty.value = true
    return true
  }

  // Reset navigation to default
  function resetNavigation() {
    navigationItems.value = JSON.parse(JSON.stringify(defaultNavigationItems))
    isDirty.value = true
    return navigationItems.value
  }

  // Helper function to find an item by ID
  function findItemById(id: string): NavItem | null {
    // Search in root items
    const rootItem = navigationItems.value.find(item => item.id === id)
    if (rootItem) return rootItem

    // Search in children recursively
    for (const item of navigationItems.value) {
      if (item.children) {
        const result = findItemInChildren(item.children, id)
        if (result) return result
      }
    }

    return null
  }

  // Helper function to find an item in children recursively
  function findItemInChildren(children: NavItem[], id: string): NavItem | null {
    for (const child of children) {
      if (child.id === id) return child
      if (child.children) {
        const result = findItemInChildren(child.children, id)
        if (result) return result
      }
    }
    return null
  }

  // Helper function to get siblings of an item
  function getSiblings(item: NavItem): NavItem[] {
    if (item.parent_id) {
      const parent = findItemById(item.parent_id)
      return parent && parent.children ? parent.children : []
    }
    return navigationItems.value
  }

  // Helper function to get the next order value
  function getNextOrder(parentId?: string): number {
    const siblings = parentId
      ? (findItemById(parentId)?.children || [])
      : navigationItems.value

    if (siblings.length === 0) return 1

    const maxOrder = Math.max(...siblings.map(item => item.order || 0))
    return maxOrder + 1
  }

  // Helper function to generate a unique ID
  function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
  }

  // Validate navigation items
  function validateNavigationItems(): { valid: boolean, errors: string[] } {
    const errors: string[] = []

    // Validate root items
    for (const item of navigationItems.value) {
      validateItem(item, errors)
    }

    return {
      valid: errors.length === 0,
      errors
    }
  }

  // Helper function to validate a single item
  function validateItem(item: NavItem, errors: string[]): void {
    // Name is required
    if (!item.name) {
      errors.push(`Item ID ${item.id} is missing a name`)
      return; // Stop validation for this item if name is missing
    }

    // Either href or children should be present
    if (!item.href && (!item.children || item.children.length === 0)) {
      errors.push(`Item "${item.name}" (ID: ${item.id}) needs either a URL or child items`)
    }

    // Validate href format if present
    if (item.href && !isValidUrl(item.href)) {
      errors.push(`Item "${item.name}" (ID: ${item.id}) has an invalid URL format: ${item.href}`)
    }

    // Validate children recursively
    if (item.children && item.children.length > 0) {
      for (const child of item.children) {
        validateItem(child, errors)
      }
    }
  }

  // Helper function to validate URL format
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

  // Flatten navigation items for easier rendering in some cases
  const flatNavigationItems = computed(() => {
    const result: NavItem[] = []

    function flatten(items: NavItem[], level = 0) {
      items.forEach(item => {
        result.push({ ...item, level })
        if (item.children && item.children.length > 0) {
          flatten(item.children, level + 1)
        }
      })
    }

    flatten(navigationItems.value)
    return result
  })

  return {
    navigationItems,
    flatNavigationItems,
    loading,
    error,
    isDirty,
    fetchNavigationItems,
    saveNavigationItems,
    addNavigationItem,
    updateNavigationItem,
    deleteNavigationItem,
    moveItemUp,
    moveItemDown,
    moveItemToParent,
    resetNavigation,
    findItemById,
    validateNavigationItems
  }
})
