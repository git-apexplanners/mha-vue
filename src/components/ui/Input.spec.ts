import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, computed } from 'vue'

// Create a mock Input component for testing
const Input = defineComponent({
  name: 'Input',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    autocomplete: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:value', 'input', 'change', 'focus', 'blur'],
  setup(props, { emit }) {
    const inputClasses = computed(() => {
      return [
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.error ? 'border-destructive focus-visible:ring-destructive' : ''
      ].filter(Boolean).join(' ')
    })

    const handleInput = (event) => {
      emit('update:value', event.target.value)
      emit('input', event)
    }

    const handleChange = (event) => {
      emit('change', event)
    }

    const handleFocus = (event) => {
      emit('focus', event)
    }

    const handleBlur = (event) => {
      emit('blur', event)
    }

    return {
      inputClasses,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur
    }
  },
  template: `
    <input
      :id="id"
      :name="name"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :autocomplete="autocomplete"
      :class="inputClasses"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  `
})

describe('Input', () => {
  it('renders properly with default props', () => {
    const wrapper = mount(Input)

    // Check if input element is rendered
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)

    // Check default props
    expect(input.attributes('type')).toBe('text')
    expect(input.attributes('value')).toBe('')
    expect(input.attributes('disabled')).toBeFalsy()
    expect(input.attributes('required')).toBeFalsy()
  })

  it('applies custom props correctly', () => {
    const wrapper = mount(Input, {
      props: {
        type: 'email',
        value: 'test@example.com',
        placeholder: 'Enter email',
        disabled: true,
        required: true,
        id: 'email-input',
        name: 'email',
        autocomplete: 'email'
      }
    })

    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('email')
    expect(input.attributes('value')).toBe('test@example.com')
    expect(input.attributes('placeholder')).toBe('Enter email')
    expect(input.attributes('disabled')).toBe('')
    expect(input.attributes('required')).toBe('')
    expect(input.attributes('id')).toBe('email-input')
    expect(input.attributes('name')).toBe('email')
    expect(input.attributes('autocomplete')).toBe('email')
  })

  it('applies error class when error prop is true', () => {
    const wrapper = mount(Input, {
      props: {
        error: true
      }
    })

    const input = wrapper.find('input')
    expect(input.classes()).toContain('border-destructive')
    expect(input.classes()).toContain('focus-visible:ring-destructive')
  })

  it('emits update:value and input events on input', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')

    await input.setValue('new value')

    expect(wrapper.emitted('update:value')).toBeTruthy()
    expect(wrapper.emitted('update:value')![0]).toEqual(['new value'])
    expect(wrapper.emitted('input')).toBeTruthy()
  })

  it('emits change event on change', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')

    await input.trigger('change')

    expect(wrapper.emitted('change')).toBeTruthy()
  })

  it('emits focus event on focus', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')

    await input.trigger('focus')

    expect(wrapper.emitted('focus')).toBeTruthy()
  })

  it('emits blur event on blur', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')

    await input.trigger('blur')

    expect(wrapper.emitted('blur')).toBeTruthy()
  })
})
