import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './__mocks__/Button.vue'

describe('Button', () => {
  it('renders properly', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'default',
        size: 'default'
      },
      slots: {
        default: 'Test Button'
      }
    })

    expect(wrapper.text()).toContain('Test Button')
  })

  it('applies the correct variant class', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'destructive',
        size: 'default'
      }
    })

    expect(wrapper.classes()).toContain('bg-destructive')
  })

  it('applies the correct size class', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'default',
        size: 'sm'
      }
    })

    expect(wrapper.classes()).toContain('h-9')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(Button)

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('renders as a button element by default', () => {
    const wrapper = mount(Button)

    expect(wrapper.element.tagName).toBe('BUTTON')
  })

  it('renders as a different element when asChild is true', () => {
    const wrapper = mount(Button, {
      props: {
        asChild: true
      },
      slots: {
        default: '<div>Custom Element</div>'
      }
    })

    // When asChild is true, it should render the slot content
    expect(wrapper.html()).toContain('Custom Element')
  })
})
