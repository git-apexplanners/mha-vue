import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

// Mock the tiptap editor and related imports
vi.mock('@tiptap/vue-3', () => {
  const mockEditor = {
    chain: vi.fn().mockReturnThis(),
    focus: vi.fn().mockReturnThis(),
    toggleBold: vi.fn().mockReturnThis(),
    toggleItalic: vi.fn().mockReturnThis(),
    toggleUnderline: vi.fn().mockReturnThis(),
    toggleStrike: vi.fn().mockReturnThis(),
    toggleHeading: vi.fn().mockReturnThis(),
    toggleBulletList: vi.fn().mockReturnThis(),
    toggleOrderedList: vi.fn().mockReturnThis(),
    setTextAlign: vi.fn().mockReturnThis(),
    extendMarkRange: vi.fn().mockReturnThis(),
    setLink: vi.fn().mockReturnThis(),
    unsetLink: vi.fn().mockReturnThis(),
    setImage: vi.fn().mockReturnThis(),
    undo: vi.fn().mockReturnThis(),
    redo: vi.fn().mockReturnThis(),
    run: vi.fn(),
    isActive: vi.fn().mockReturnValue(false),
    can: vi.fn().mockReturnValue({
      undo: vi.fn().mockReturnValue(true),
      redo: vi.fn().mockReturnValue(true)
    }),
    getHTML: vi.fn().mockReturnValue('<p>Test content</p>'),
    commands: {
      setContent: vi.fn()
    },
    destroy: vi.fn()
  }

  return {
    Editor: vi.fn().mockImplementation(() => mockEditor),
    EditorContent: vi.fn().mockImplementation(() => ({}))
  }
})

vi.mock('@tiptap/starter-kit', () => ({ default: {} }))
vi.mock('@tiptap/extension-link', () => ({ default: { configure: () => ({}) } }))
vi.mock('@tiptap/extension-image', () => ({ default: { configure: () => ({}) } }))
vi.mock('@tiptap/extension-placeholder', () => ({ default: { configure: () => ({}) } }))

// Mock the toast service
vi.mock('@/composables/useToast', () => ({
  toastService: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

// Mock window.prompt
vi.spyOn(window, 'prompt').mockImplementation(() => 'https://example.com')

// Import the actual component - but it will use our mocks
import RichTextEditor from './RichTextEditor.vue'

describe('RichTextEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('handles null editor gracefully', async () => {
    // Create a shallow mount of the component
    const wrapper = mount(RichTextEditor)

    // Manually set the editor to null to simulate the error condition
    wrapper.vm.editor = null

    // Wait for the next tick to ensure Vue updates the DOM
    await nextTick()

    // Try to click the bold button - this should not throw an error
    const boldButton = wrapper.find('button[title="Bold"]')
    await boldButton.trigger('click')

    // The component should still be rendered
    expect(wrapper.find('.rich-text-editor').exists()).toBe(true)
  })

  it('handles addLink with null editor', async () => {
    const wrapper = mount(RichTextEditor)

    // Set editor to null
    wrapper.vm.editor = null

    // Call the addLink method directly
    wrapper.vm.addLink()

    // Prompt should not be called when editor is null
    expect(window.prompt).not.toHaveBeenCalled()
  })

  it('handles addImage with null editor', async () => {
    const wrapper = mount(RichTextEditor)

    // Set editor to null
    wrapper.vm.editor = null

    // Call the addImage method directly
    wrapper.vm.addImage()

    // Prompt should not be called when editor is null
    expect(window.prompt).not.toHaveBeenCalled()
  })

  it('renders with error prop', async () => {
    const wrapper = mount(RichTextEditor, {
      props: {
        error: 'This is an error message'
      }
    })

    // Check if the error message is displayed
    expect(wrapper.text()).toContain('This is an error message')
  })
})
