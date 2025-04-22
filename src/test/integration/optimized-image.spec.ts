import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import OptimizedImage from '@/components/ui/OptimizedImage.vue'

describe('OptimizedImage Integration', () => {
  beforeEach(() => {
    // Mock window.Image
    global.Image = class {
      constructor() {
        setTimeout(() => {
          this.onload && this.onload()
        }, 100)
      }
      src = ''
    }
    
    // Mock URL.createObjectURL and URL.revokeObjectURL
    global.URL.createObjectURL = vi.fn(() => 'mock-url')
    global.URL.revokeObjectURL = vi.fn()
  })

  it('loads image and shows placeholder initially', async () => {
    const wrapper = mount(OptimizedImage, {
      props: {
        src: '/test-image.jpg',
        alt: 'Test Image',
        width: 300,
        height: 200
      }
    })
    
    // Should have two images (placeholder and actual)
    const images = wrapper.findAll('img')
    expect(images.length).toBe(2)
    
    // Placeholder should be visible initially
    const placeholder = images[0]
    expect(placeholder.classes()).toContain('opacity-100')
    
    // Actual image should be hidden initially
    const actualImage = images[1]
    expect(actualImage.classes()).toContain('opacity-0')
    
    // Trigger image load
    await actualImage.trigger('load')
    
    // After load, placeholder should be hidden and actual image visible
    expect(placeholder.classes()).toContain('opacity-0')
    expect(actualImage.classes()).toContain('opacity-100')
  })

  it('handles image loading error', async () => {
    const wrapper = mount(OptimizedImage, {
      props: {
        src: '/non-existent-image.jpg',
        alt: 'Error Image'
      }
    })
    
    // Should have two images (placeholder/error and actual)
    const images = wrapper.findAll('img')
    expect(images.length).toBe(2)
    
    // Trigger image error
    await images[1].trigger('error')
    
    // Error flag should be set
    expect(wrapper.vm.isError).toBe(true)
    
    // Error image should be shown
    expect(images[0].attributes('src')).toBe('/images/error.jpg')
  })

  it('preloads important images when loading is eager', async () => {
    // Spy on Image constructor
    const imageSpy = vi.spyOn(global, 'Image')
    
    mount(OptimizedImage, {
      props: {
        src: '/important-image.jpg',
        alt: 'Important Image',
        loading: 'eager'
      }
    })
    
    // Should create a new Image for preloading
    expect(imageSpy).toHaveBeenCalled()
    
    // The preloaded image should have the correct src
    const preloadedImage = imageSpy.mock.results[0].value
    expect(preloadedImage.src).toBe('/important-image.jpg')
  })

  it('applies custom classes to both placeholder and actual image', async () => {
    const wrapper = mount(OptimizedImage, {
      props: {
        src: '/test-image.jpg',
        alt: 'Test Image',
        class: 'custom-class rounded-lg'
      }
    })
    
    // Both images should have the custom classes
    const images = wrapper.findAll('img')
    expect(images[0].classes()).toContain('custom-class')
    expect(images[0].classes()).toContain('rounded-lg')
    expect(images[1].classes()).toContain('custom-class')
    expect(images[1].classes()).toContain('rounded-lg')
  })

  it('uses lazy loading by default', () => {
    const wrapper = mount(OptimizedImage, {
      props: {
        src: '/test-image.jpg',
        alt: 'Test Image'
      }
    })
    
    // Actual image should have lazy loading attribute
    const actualImage = wrapper.findAll('img')[1]
    expect(actualImage.attributes('loading')).toBe('lazy')
  })
})
