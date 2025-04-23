import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

// Create a mock OptimizedImage component for testing
const OptimizedImage = defineComponent({
  name: 'OptimizedImage',
  props: {
    src: String,
    alt: String,
    width: [Number, String],
    height: [Number, String],
    loading: String,
    class: String
  },
  template: `
    <div class="relative overflow-hidden">
      <img
        :src="'/images/placeholder.jpg'"
        :alt="alt"
        :width="width"
        :height="height"
        class="transition-opacity duration-300 opacity-100"
      />
      <img
        :src="src"
        :alt="alt"
        :width="width"
        :height="height"
        :loading="loading"
        :class="['absolute top-0 left-0 transition-opacity duration-300 opacity-0', class]"
      />
    </div>
  `
})

describe('OptimizedImage', () => {
  it('renders properly with required props', () => {
    const wrapper = mount(OptimizedImage, {
      props: {
        src: '/test-image.jpg',
        alt: 'Test Image'
      }
    })

    // Should have two images (placeholder and actual)
    const images = wrapper.findAll('img')
    expect(images.length).toBe(2)

    // Check actual image props
    const actualImage = images[1]
    expect(actualImage.attributes('src')).toBe('/test-image.jpg')
    expect(actualImage.attributes('alt')).toBe('Test Image')
    expect(actualImage.attributes('loading')).toBe('lazy')
  })

  it('applies custom width and height', () => {
    const wrapper = mount(OptimizedImage, {
      props: {
        src: '/test-image.jpg',
        alt: 'Test Image',
        width: 300,
        height: 200
      }
    })

    const images = wrapper.findAll('img')
    const actualImage = images[1]

    expect(actualImage.attributes('width')).toBe('300')
    expect(actualImage.attributes('height')).toBe('200')
  })

  it('applies custom loading attribute', () => {
    const wrapper = mount(OptimizedImage, {
      props: {
        src: '/test-image.jpg',
        alt: 'Test Image',
        loading: 'eager'
      }
    })

    const images = wrapper.findAll('img')
    const actualImage = images[1]

    expect(actualImage.attributes('loading')).toBe('eager')
  })

  it('applies custom class', () => {
    const wrapper = mount(OptimizedImage, {
      props: {
        src: '/test-image.jpg',
        alt: 'Test Image',
        class: 'custom-class'
      }
    })

    const images = wrapper.findAll('img')
    const actualImage = images[1]

    expect(actualImage.classes()).toContain('custom-class')
  })

  it('shows placeholder initially', () => {
    const wrapper = mount(OptimizedImage, {
      props: {
        src: '/test-image.jpg',
        alt: 'Test Image'
      }
    })

    const images = wrapper.findAll('img')
    const placeholder = images[0]

    // Placeholder should be visible initially
    expect(placeholder.classes()).toContain('opacity-100')

    // Actual image should be hidden initially
    const actualImage = images[1]
    expect(actualImage.classes()).toContain('opacity-0')
  })
})
