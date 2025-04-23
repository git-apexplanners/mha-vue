import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import MenuItemEditor from './MenuItemEditor.vue'
import { useNavigationStore } from '@/stores/navigation'

// Mock the IconSelector component
vi.mock('./IconSelector.vue', () => ({
  default: {
    name: 'IconSelector',
    props: ['modelValue'],
    template: '<div data-testid="icon-selector">Icon Selector</div>',
    emits: ['update:modelValue']
  }
}))

describe('MenuItemEditor', () => {
  beforeEach(() => {
    // Create a fresh Pinia instance for each test
    setActivePinia(createPinia())
  })
  
  it('renders properly for new item', () => {
    const wrapper = mount(MenuItemEditor, {
      props: {
        isNew: true
      }
    })
    
    expect(wrapper.text()).toContain('Add New Menu Item')
    expect(wrapper.find('input[placeholder="Menu item name"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="icon-selector"]').exists()).toBe(true)
  })
  
  it('renders properly for editing existing item', () => {
    const store = useNavigationStore()
    const item = store.addNavigationItem({ name: 'Test Item', href: '/test', icon: 'home' })
    
    const wrapper = mount(MenuItemEditor, {
      props: {
        item,
        isNew: false
      }
    })
    
    expect(wrapper.text()).toContain('Edit Menu Item')
    
    // Check if form is populated with item data
    const nameInput = wrapper.find('input[placeholder="Menu item name"]')
    expect(nameInput.element.value).toBe('Test Item')
    
    const hrefInput = wrapper.find('input[placeholder="/page-url or https://external-url.com"]')
    expect(hrefInput.element.value).toBe('/test')
  })
  
  it('toggles between URL and children mode', async () => {
    const wrapper = mount(MenuItemEditor, {
      props: {
        isNew: true
      }
    })
    
    // Initially URL field should be visible
    expect(wrapper.find('input[placeholder="/page-url or https://external-url.com"]').exists()).toBe(true)
    
    // Toggle to children mode
    const checkbox = wrapper.find('input[type="checkbox"]')
    await checkbox.setValue(true)
    
    // URL field should be hidden
    expect(wrapper.find('input[placeholder="/page-url or https://external-url.com"]').exists()).toBe(false)
  })
  
  it('validates form before saving', async () => {
    const wrapper = mount(MenuItemEditor, {
      props: {
        isNew: true
      }
    })
    
    // Try to save without entering a name
    const saveButton = wrapper.find('button[type="submit"]')
    await saveButton.trigger('click')
    
    // Check if validation error is shown
    expect(wrapper.text()).toContain('Name is required')
    
    // Check that save event was not emitted
    expect(wrapper.emitted('save')).toBeFalsy()
  })
  
  it('emits save event with valid data', async () => {
    const wrapper = mount(MenuItemEditor, {
      props: {
        isNew: true
      }
    })
    
    // Fill in the form
    const nameInput = wrapper.find('input[placeholder="Menu item name"]')
    await nameInput.setValue('New Item')
    
    const hrefInput = wrapper.find('input[placeholder="/page-url or https://external-url.com"]')
    await hrefInput.setValue('/new-page')
    
    // Submit the form
    const form = wrapper.find('form')
    await form.trigger('submit')
    
    // Check if save event was emitted
    expect(wrapper.emitted('save')).toBeTruthy()
  })
  
  it('emits delete event', async () => {
    const store = useNavigationStore()
    const item = store.addNavigationItem({ name: 'Test Item', href: '/test' })
    
    // Mock window.confirm to return true
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    
    const wrapper = mount(MenuItemEditor, {
      props: {
        item,
        isNew: false
      }
    })
    
    // Click the delete button
    const deleteButton = wrapper.find('button.bg-destructive')
    await deleteButton.trigger('click')
    
    // Check if delete event was emitted with the item id
    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')[0]).toEqual([item.id])
  })
  
  it('emits cancel event', async () => {
    const wrapper = mount(MenuItemEditor, {
      props: {
        isNew: true
      }
    })
    
    // Click the cancel button
    const cancelButton = wrapper.find('button.bg-secondary')
    await cancelButton.trigger('click')
    
    // Check if cancel event was emitted
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })
})
