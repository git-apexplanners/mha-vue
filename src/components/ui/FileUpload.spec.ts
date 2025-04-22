import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FileUpload from './FileUpload.vue'

// Mock the useFileUpload composable
vi.mock('@/composables/useFileUpload', () => ({
  useFileUpload: () => ({
    isUploading: vi.fn(() => false),
    uploadProgress: vi.fn(() => 0),
    uploadError: vi.fn(() => null),
    uploadResult: vi.fn(() => null),
    hasError: vi.fn(() => false),
    isComplete: vi.fn(() => false),
    uploadFile: vi.fn(),
    resetUpload: vi.fn()
  })
}))

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
    
    // Trigger file selection
    const input = wrapper.find('input[type="file"]')
    await input.setValue('')
    
    // Mock the file input event
    Object.defineProperty(input.element, 'files', {
      value: [file]
    })
    
    await input.trigger('change')
    
    // Should emit file-selected event
    expect(wrapper.emitted('file-selected')).toBeTruthy()
    expect(wrapper.emitted('file-selected')?.[0]).toEqual([file])
    
    // Should create a preview URL for images
    expect(URL.createObjectURL).toHaveBeenCalledWith(file)
    
    // Should show the file preview
    expect(wrapper.find('.border-dashed').exists()).toBe(false)
    expect(wrapper.find('.border.rounded-lg').exists()).toBe(true)
    expect(wrapper.text()).toContain('test.jpg')
  })

  it('clears file selection', async () => {
    const wrapper = mount(FileUpload)
    
    // Create a mock file and select it
    const file = new File(['test content'], 'test.jpg', { type: 'image/jpeg' })
    
    // Set the selected file directly
    await wrapper.setData({
      selectedFile: file,
      previewUrl: 'mock-url'
    })
    
    // Should show the file preview
    expect(wrapper.find('.border.rounded-lg').exists()).toBe(true)
    
    // Click the remove button
    await wrapper.find('button[aria-label="Remove file"]').trigger('click')
    
    // Should clear the selection
    expect(wrapper.find('.border-dashed').exists()).toBe(true)
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('mock-url')
  })

  it('triggers file upload', async () => {
    const wrapper = mount(FileUpload)
    
    // Create a mock file and select it
    const file = new File(['test content'], 'test.jpg', { type: 'image/jpeg' })
    
    // Set the selected file directly
    await wrapper.setData({
      selectedFile: file
    })
    
    // Mock the uploadFile method
    const uploadFile = vi.fn().mockResolvedValue({
      url: 'https://example.com/test.jpg',
      filename: 'test.jpg',
      size: 12345,
      type: 'image/jpeg',
      path: '/uploads/test.jpg'
    })
    
    // Replace the uploadFile method
    wrapper.vm.uploadFile = uploadFile
    
    // Click the upload button
    await wrapper.find('button[type="button"]').trigger('click')
    
    // Should call uploadFile with the correct parameters
    expect(uploadFile).toHaveBeenCalledWith({
      file,
      folder: 'uploads',
      maxSizeMB: 5,
      allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    })
    
    // Should emit upload-complete event
    expect(wrapper.emitted('upload-complete')).toBeTruthy()
  })
})
