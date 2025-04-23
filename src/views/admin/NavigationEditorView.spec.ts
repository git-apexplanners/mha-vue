import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import NavigationEditorView from './NavigationEditorView.vue'
import { useNavigationStore } from '@/stores/navigation'

// Mock the toast service
vi.mock('@/composables/useToast', () => ({
  toastService: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn()
  }
}))

describe('NavigationEditorView', () => {
  beforeEach(() => {
    // Create a fresh Pinia instance for each test
    setActivePinia(createPinia())
    
    // Reset mocks
    vi.resetAllMocks()
  })

  it('renders properly', async () => {
    const wrapper = mount(NavigationEditorView)
    
    // Wait for the component to load
    await vi.dynamicImportSettled()
    
    // Check if the navigation editor is rendered
    expect(wrapper.text()).toContain('Navigation Menu Editor')
    expect(wrapper.text()).toContain('Drag and drop items to reorder')
  })

  it('loads navigation items on mount', async () => {
    const navigationStore = useNavigationStore()
    const fetchSpy = vi.spyOn(navigationStore, 'fetchNavigationItems')
    
    const wrapper = mount(NavigationEditorView)
    
    // Wait for the component to load
    await vi.dynamicImportSettled()
    
    // Check if fetchNavigationItems was called
    expect(fetchSpy).toHaveBeenCalled()
  })

  it('shows the item editor when adding a new item', async () => {
    const wrapper = mount(NavigationEditorView)
    
    // Wait for the component to load
    await vi.dynamicImportSettled()
    
    // Find and click the "Add Root Item" button
    const addButton = wrapper.find('button:contains("Add Root Item")')
    await addButton.trigger('click')
    
    // Check if the item editor is shown
    expect(wrapper.text()).toContain('Add New Menu Item')
    expect(wrapper.find('input[placeholder="Menu item name"]').exists()).toBe(true)
  })

  it('saves navigation changes', async () => {
    const navigationStore = useNavigationStore()
    const saveSpy = vi.spyOn(navigationStore, 'saveNavigationItems')
    
    const wrapper = mount(NavigationEditorView)
    
    // Wait for the component to load
    await vi.dynamicImportSettled()
    
    // Add a new item to make changes
    navigationStore.addNavigationItem({ name: 'Test Item', href: '/test' })
    
    // Find and click the "Save Changes" button
    const saveButton = wrapper.find('button:contains("Save Changes")')
    await saveButton.trigger('click')
    
    // Check if saveNavigationItems was called
    expect(saveSpy).toHaveBeenCalled()
  })

  it('resets navigation to default', async () => {
    const navigationStore = useNavigationStore()
    const resetSpy = vi.spyOn(navigationStore, 'resetNavigation')
    
    // Mock window.confirm to return true
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true)
    
    const wrapper = mount(NavigationEditorView)
    
    // Wait for the component to load
    await vi.dynamicImportSettled()
    
    // Find and click the "Reset" button
    const resetButton = wrapper.find('button:contains("Reset")')
    await resetButton.trigger('click')
    
    // Check if resetNavigation was called
    expect(confirmSpy).toHaveBeenCalled()
    expect(resetSpy).toHaveBeenCalled()
  })

  it('toggles between edit and preview modes', async () => {
    const wrapper = mount(NavigationEditorView)
    
    // Wait for the component to load
    await vi.dynamicImportSettled()
    
    // Initially in edit mode
    expect(wrapper.text()).toContain('Preview')
    
    // Find and click the "Preview" button
    const previewButton = wrapper.find('button:contains("Preview")')
    await previewButton.trigger('click')
    
    // Now in preview mode
    expect(wrapper.text()).toContain('Edit Mode')
    expect(wrapper.text()).toContain('Navigation Preview')
    
    // Click again to go back to edit mode
    await previewButton.trigger('click')
    
    // Back in edit mode
    expect(wrapper.text()).toContain('Preview')
  })
})
