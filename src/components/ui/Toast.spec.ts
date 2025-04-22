import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Toast from './__mocks__/Toast.vue'

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('renders properly with title and description', () => {
    const wrapper = mount(Toast, {
      props: {
        title: 'Test Title',
        description: 'Test Description',
        variant: 'default',
        duration: 5000,
        open: true
      }
    })

    expect(wrapper.text()).toContain('Test Title')
    expect(wrapper.text()).toContain('Test Description')
  })

  it('applies the correct variant class', () => {
    const wrapper = mount(Toast, {
      props: {
        title: 'Test Title',
        variant: 'destructive',
        open: true
      }
    })

    expect(wrapper.html()).toContain('destructive')
  })

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(Toast, {
      props: {
        title: 'Test Title',
        open: true
      }
    })

    await wrapper.find('button[aria-label="Close"]').trigger('click')

    // Wait for the animation timeout
    vi.advanceTimersByTime(300)

    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('auto-closes after duration', async () => {
    const wrapper = mount(Toast, {
      props: {
        title: 'Test Title',
        duration: 1000,
        open: true
      }
    })

    vi.advanceTimersByTime(1000)

    // Wait for the animation timeout
    vi.advanceTimersByTime(300)

    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('does not auto-close if duration is 0', async () => {
    const wrapper = mount(Toast, {
      props: {
        title: 'Test Title',
        duration: 0,
        open: true
      }
    })

    vi.advanceTimersByTime(5000)

    expect(wrapper.emitted('close')).toBeFalsy()
  })
})
