import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Label from './__mocks__/Label.vue'

describe('Label', () => {
  it('renders properly', () => {
    const wrapper = mount(Label, {
      props: {
        htmlFor: 'test-input'
      },
      slots: {
        default: 'Test Label'
      }
    })

    expect(wrapper.text()).toContain('Test Label')
    expect(wrapper.attributes('for')).toBe('test-input')
  })

  it('adds required indicator when required prop is true', () => {
    const wrapper = mount(Label, {
      props: {
        htmlFor: 'test-input',
        required: true
      },
      slots: {
        default: 'Test Label'
      }
    })

    expect(wrapper.text()).toContain('*')
    expect(wrapper.find('.text-destructive').exists()).toBe(true)
  })

  it('does not add required indicator when required prop is false', () => {
    const wrapper = mount(Label, {
      props: {
        htmlFor: 'test-input',
        required: false
      },
      slots: {
        default: 'Test Label'
      }
    })

    expect(wrapper.text()).not.toContain('*')
    expect(wrapper.find('.text-destructive').exists()).toBe(false)
  })
})
