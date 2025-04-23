import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useNavigationStore, NavItem } from './navigation'

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn().mockImplementation((url) => {
      if (url === '/api/navigation') {
        return Promise.resolve({ data: [] })
      }
      return Promise.reject(new Error('Not found'))
    }),
    post: vi.fn().mockImplementation((url) => {
      if (url === '/api/navigation') {
        return Promise.resolve({ data: [] })
      }
      return Promise.reject(new Error('Not found'))
    })
  }
}))

describe('Navigation Store', () => {
  beforeEach(() => {
    // Create a fresh Pinia instance for each test
    setActivePinia(createPinia())
  })

  it('should initialize with empty navigation items', () => {
    const store = useNavigationStore()
    expect(store.navigationItems).toEqual([])
  })

  it('should fetch navigation items', async () => {
    const store = useNavigationStore()
    await store.fetchNavigationItems()
    expect(store.navigationItems.length).toBeGreaterThan(0)
  })

  it('should add a navigation item', () => {
    const store = useNavigationStore()
    const newItem = store.addNavigationItem({ name: 'Test Item', href: '/test' })

    expect(newItem.name).toBe('Test Item')
    expect(newItem.href).toBe('/test')
    expect(store.navigationItems).toContainEqual(expect.objectContaining({ name: 'Test Item', href: '/test' }))
    expect(store.isDirty).toBe(true)
  })

  it('should add a child navigation item', () => {
    const store = useNavigationStore()
    const parentItem = store.addNavigationItem({ name: 'Parent Item' })
    const childItem = store.addNavigationItem({ name: 'Child Item', href: '/child' }, parentItem.id)

    expect(childItem.parent_id).toBe(parentItem.id)

    // Find the parent and check if it has the child
    const parent = store.findItemById(parentItem.id)
    expect(parent?.children).toContainEqual(expect.objectContaining({ name: 'Child Item', href: '/child' }))
  })

  it('should update a navigation item', () => {
    const store = useNavigationStore()
    const item = store.addNavigationItem({ name: 'Original Name', href: '/original' })

    const updatedItem = store.updateNavigationItem(item.id, { name: 'Updated Name', href: '/updated' })

    expect(updatedItem?.name).toBe('Updated Name')
    expect(updatedItem?.href).toBe('/updated')
    expect(store.isDirty).toBe(true)
  })

  it('should delete a navigation item', () => {
    const store = useNavigationStore()
    const item = store.addNavigationItem({ name: 'Item to Delete', href: '/delete' })

    const result = store.deleteNavigationItem(item.id)

    expect(result).toBe(true)
    expect(store.navigationItems).not.toContainEqual(expect.objectContaining({ id: item.id }))
    expect(store.isDirty).toBe(true)
  })

  it('should delete a navigation item with children', () => {
    const store = useNavigationStore()
    const parentItem = store.addNavigationItem({ name: 'Parent Item' })
    const childItem = store.addNavigationItem({ name: 'Child Item', href: '/child' }, parentItem.id)

    const result = store.deleteNavigationItem(parentItem.id)

    expect(result).toBe(true)
    expect(store.navigationItems).not.toContainEqual(expect.objectContaining({ id: parentItem.id }))
    expect(store.findItemById(childItem.id)).toBeNull()
  })

  it('should move an item up in order', () => {
    const store = useNavigationStore()
    const item1 = store.addNavigationItem({ name: 'Item 1', href: '/item1' })
    const item2 = store.addNavigationItem({ name: 'Item 2', href: '/item2' })

    // Move item2 up (swap with item1)
    const result = store.moveItemUp(item2.id)

    expect(result).toBe(true)
    expect(store.navigationItems[0].id).toBe(item2.id)
    expect(store.navigationItems[1].id).toBe(item1.id)
  })

  it('should move an item down in order', () => {
    const store = useNavigationStore()
    const item1 = store.addNavigationItem({ name: 'Item 1', href: '/item1' })
    const item2 = store.addNavigationItem({ name: 'Item 2', href: '/item2' })

    // Move item1 down (swap with item2)
    const result = store.moveItemDown(item1.id)

    expect(result).toBe(true)
    expect(store.navigationItems[0].id).toBe(item2.id)
    expect(store.navigationItems[1].id).toBe(item1.id)
  })

  it('should validate navigation items', () => {
    const store = useNavigationStore()

    // Add valid items
    store.addNavigationItem({ name: 'Valid Item', href: '/valid' })
    const parentId = store.addNavigationItem({ name: 'Valid Parent' }).id
    // Add a child to the parent to make it valid
    store.addNavigationItem({ name: 'Child Item', href: '/child' }, parentId)

    const validation = store.validateNavigationItems()
    expect(validation.valid).toBe(true)
    expect(validation.errors.length).toBe(0)
  })

  it('should detect invalid navigation items', () => {
    const store = useNavigationStore()

    // Add an item with no name
    store.addNavigationItem({ name: '', href: '/invalid' })

    const validation = store.validateNavigationItems()
    expect(validation.valid).toBe(false)
    expect(validation.errors.length).toBeGreaterThan(0)
  })

  it('should detect items without href or children', () => {
    const store = useNavigationStore()

    // Add an item with a name but no href and no children
    store.addNavigationItem({ name: 'Invalid Item' })

    const validation = store.validateNavigationItems()
    expect(validation.valid).toBe(false)
    expect(validation.errors.length).toBeGreaterThan(0)
    expect(validation.errors[0]).toContain('needs either a URL or child items')
  })

  it('should reset navigation to default', () => {
    const store = useNavigationStore()

    // Add some custom items
    store.addNavigationItem({ name: 'Custom Item', href: '/custom' })

    // Reset to default
    store.resetNavigation()

    expect(store.navigationItems.length).toBeGreaterThan(0)
    expect(store.navigationItems).not.toContainEqual(expect.objectContaining({ name: 'Custom Item' }))
    expect(store.isDirty).toBe(true)
  })
})
