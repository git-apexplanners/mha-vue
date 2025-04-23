import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import AddToNavigationModal from './AddToNavigationModal.vue'
import { useNavigationStore } from '@/stores/navigation'

// Mock the toast service
vi.mock('@/composables/useToast', () => ({
  toastService: {
    success: vi.fn(),
    error: vi.fn()
  },
  useToast: () => ({
    success: vi.fn(),
    error: vi.fn()
  })
}))

describe('AddToNavigationModal', () => {
  beforeEach(() => {
    // Create a fresh Pinia instance for each test
    setActivePinia(createPinia())
    
    // Reset mocks
    vi.resetAllMocks()
  })
  
  it('renders properly when open', () => {
    const wrapper = mount(AddToNavigationModal, {
      props: {
        pageName: 'Test Page',
        pageSlug: 'test-page',
        isOpen: true
      }
    })
    
    expect(wrapper.text()).toContain('Add Page to Navigation')
    expect(wrapper.text()).toContain('Test Page')
    expect(wrapper.text()).toContain('/test-page')
    expect(wrapper.find('select').exists()).toBe(true)
  })
  
  it('does not render when closed', () => {
    const wrapper = mount(AddToNavigationModal, {
      props: {
        pageName: 'Test Page',
        pageSlug: 'test-page',
        isOpen: false
      }
    })
    
    expect(wrapper.html()).toBe('')
  })
  
  it('emits close event when cancel button is clicked', async () => {
    const wrapper = mount(AddToNavigationModal, {
      props: {
        pageName: 'Test Page',
        pageSlug: 'test-page',
        isOpen: true
      }
    })
    
    // Find and click the cancel button
    const cancelButton = wrapper.find('button[type="button"]')
    await cancelButton.trigger('click')
    
    // Check if close event was emitted
    expect(wrapper.emitted('close')).toBeTruthy()
  })
  
  it('adds page to navigation when form is submitted', async () => {
    const navigationStore = useNavigationStore()
    const addItemSpy = vi.spyOn(navigationStore, 'addNavigationItem')
    const saveItemsSpy = vi.spyOn(navigationStore, 'saveNavigationItems')
    
    const wrapper = mount(AddToNavigationModal, {
      props: {
        pageName: 'Test Page',
        pageSlug: 'test-page',
        isOpen: true
      }
    })
    
    // Submit the form
    const form = wrapper.find('form')
    await form.trigger('submit')
    
    // Check if navigation store methods were called
    expect(addItemSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Test Page',
        href: '/test-page'
      }),
      expect.anything()
    )
    expect(saveItemsSpy).toHaveBeenCalled()
    
    // Check if events were emitted
    expect(wrapper.emitted('added')).toBeTruthy()
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
