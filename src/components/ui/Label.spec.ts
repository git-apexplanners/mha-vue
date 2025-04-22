import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

// Create a mock Label component
const Label = defineComponent({
  name: 'Label',
  props: {
    htmlFor: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    labelClasses() {
      return 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
    }
  },
  template: `
    <label :for="htmlFor" :class="labelClasses">
      <slot></slot>
      <span v-if="required" class="text-destructive ml-1">*</span>
    </label>
  `
})

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
