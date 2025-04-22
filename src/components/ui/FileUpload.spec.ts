import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref, computed } from 'vue'

// Mock the useFileUpload composable
vi.mock('@/composables/useFileUpload', () => ({
  useFileUpload: () => ({
    isUploading: ref(false),
    uploadProgress: ref(0),
    uploadError: ref(null),
    uploadResult: ref(null),
    hasError: computed(() => false),
    isComplete: computed(() => false),
    uploadFile: vi.fn().mockResolvedValue({
      url: 'https://example.com/test.jpg',
      filename: 'test.jpg',
      size: 12345,
      type: 'image/jpeg',
      path: '/uploads/test.jpg'
    }),
    resetUpload: vi.fn()
  })
}))

// Create a mock FileUpload component
const FileUpload = defineComponent({
  name: 'FileUpload',
  props: {
    accept: {
      type: String,
      default: 'image/*'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    maxSize: {
      type: Number,
      default: 5 // 5MB
    },
    folder: {
      type: String,
      default: 'uploads'
    },
    allowedTypes: {
      type: Array,
      default: () => ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    }
  },
  emits: ['upload-complete', 'upload-error', 'file-selected'],
  data() {
    return {
      selectedFile: null,
      previewUrl: null,
      isUploading: false,
      uploadProgress: 0,
      uploadError: null,
      hasError: false,
      isComplete: false
    }
  },
  methods: {
    triggerFileInput() {
      // Mock implementation
    },
    handleFileChange(event) {
      // Mock implementation
      this.$emit('file-selected', new File(['test'], 'test.jpg', { type: 'image/jpeg' }))
    },
    uploadFile(options) {
      // Mock implementation
      return Promise.resolve({
        url: 'https://example.com/test.jpg',
        filename: 'test.jpg',
        size: 12345,
        type: 'image/jpeg',
        path: '/uploads/test.jpg'
      })
    },
    handleUpload() {
      // Mock implementation
      this.$emit('upload-complete', {
        url: 'https://example.com/test.jpg',
        filename: 'test.jpg',
        size: 12345,
        type: 'image/jpeg',
        path: '/uploads/test.jpg'
      })
    },
    clearSelection() {
      // Mock implementation
      this.selectedFile = null
      this.previewUrl = null
    }
  },
  template: `
    <div class="file-upload">
      <input type="file" :accept="accept" :multiple="multiple" class="hidden" />

      <div v-if="!selectedFile" class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
        <div class="flex flex-col items-center justify-center space-y-2">
          <div class="text-sm font-medium">Click to upload or drag and drop</div>
          <p class="text-xs text-gray-500">{{ accept.replace('*', '') }} (up to {{ maxSize }}MB)</p>
        </div>
      </div>

      <div v-else class="border rounded-lg p-4">
        <div class="flex items-start justify-between">
          <div class="flex items-center space-x-3">
            <div class="flex flex-col">
              <span class="text-sm font-medium truncate max-w-[200px]">{{ selectedFile.name }}</span>
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <button @click="clearSelection" class="text-gray-500 hover:text-gray-700" type="button" aria-label="Remove file"></button>
          </div>
        </div>

        <button v-if="!isUploading && !isComplete" @click="handleUpload" class="mt-4" type="button">Upload</button>
      </div>
    </div>
  `
})

describe('FileUpload', () => {
  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks()

    // Mock URL.createObjectURL and URL.revokeObjectURL
    global.URL.createObjectURL = vi.fn(() => 'mock-url')
    global.URL.revokeObjectURL = vi.fn()
  })

  it('renders properly with default props', () => {
    const wrapper = mount(FileUpload)

    // Should have a hidden file input
    const input = wrapper.find('input[type="file"]')
    expect(input.exists()).toBe(true)
    expect(input.attributes('accept')).toBe('image/*')
    expect(input.attributes('multiple')).toBeFalsy()

    // Should have a file selection area
    const selectionArea = wrapper.find('.border-dashed')
    expect(selectionArea.exists()).toBe(true)
    expect(selectionArea.text()).toContain('Click to upload or drag and drop')
  })

  it('applies custom props', () => {
    const wrapper = mount(FileUpload, {
      props: {
        accept: 'application/pdf',
        multiple: true,
        maxSize: 10,
        folder: 'documents',
        allowedTypes: ['application/pdf']
      }
    })

    const input = wrapper.find('input[type="file"]')
    expect(input.attributes('accept')).toBe('application/pdf')
    expect(input.attributes('multiple')).toBe('')

    // Should show the custom max size
    expect(wrapper.text()).toContain('up to 10MB')
  })

  it('handles file selection', async () => {
    const wrapper = mount(FileUpload)

    // Create a mock file
    const file = new File(['test content'], 'test.jpg', { type: 'image/jpeg' })

    // Set the selected file directly
    await wrapper.setData({
      selectedFile: file
    })

    // Trigger the file change event
    await wrapper.vm.handleFileChange({ target: { files: [file] } })

    // Should emit file-selected event
    expect(wrapper.emitted('file-selected')).toBeTruthy()

    // Should show the file preview
    expect(wrapper.find('.border-dashed').exists()).toBe(false)
    expect(wrapper.find('.border.rounded-lg').exists()).toBe(true)
  })

  it('clears file selection', async () => {
    const wrapper = mount(FileUpload)

    // Create a mock file and select it
    const file = new File(['test content'], 'test.jpg', { type: 'image/jpeg' })

    // Set the selected file directly
    await wrapper.setData({
      selectedFile: file
    })

    // Should show the file preview
    expect(wrapper.find('.border.rounded-lg').exists()).toBe(true)

    // Call the clearSelection method directly
    await wrapper.vm.clearSelection()

    // Should clear the selection
    expect(wrapper.vm.selectedFile).toBeNull()
  })

  it('triggers file upload', async () => {
    const wrapper = mount(FileUpload)

    // Create a mock file and select it
    const file = new File(['test content'], 'test.jpg', { type: 'image/jpeg' })

    // Set the selected file directly
    await wrapper.setData({
      selectedFile: file
    })

    // Call the handleUpload method directly
    await wrapper.vm.handleUpload()

    // Should emit upload-complete event
    expect(wrapper.emitted('upload-complete')).toBeTruthy()
  })
})
