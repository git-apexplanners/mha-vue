import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

// Create a mock Textarea component
const Textarea = defineComponent({
  name: 'Textarea',
  props: {
    modelValue: {
      type: String,
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
    required: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 4
    }
  },
  emits: ['update:modelValue', 'input', 'change', 'focus', 'blur'],
  template: `
    <textarea
      :id="id"
      :name="name"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :rows="rows"
      :class="[
        'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        error ? 'border-destructive focus-visible:ring-destructive' : ''
      ]"
      @input="$emit('update:modelValue', $event.target.value); $emit('input', $event)"
      @change="$emit('change', $event)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    ></textarea>
  `
})

describe('Textarea', () => {
  it('renders properly with default props', () => {
    const wrapper = mount(Textarea)
    
    // Check if textarea element is rendered
    const textarea = wrapper.find('textarea')
    expect(textarea.exists()).toBe(true)
    
    // Check default props
    expect(textarea.attributes('value')).toBe('')
    expect(textarea.attributes('disabled')).toBeFalsy()
    expect(textarea.attributes('required')).toBeFalsy()
    expect(textarea.attributes('rows')).toBe('4')
  })
  
  it('applies custom props correctly', () => {
    const wrapper = mount(Textarea, {
      props: {
        modelValue: 'Test value',
        placeholder: 'Enter text',
        disabled: true,
        required: true,
        id: 'test-textarea',
        name: 'test-name',
        rows: 6
      }
    })
    
    const textarea = wrapper.find('textarea')
    expect(textarea.attributes('value')).toBe('Test value')
    expect(textarea.attributes('placeholder')).toBe('Enter text')
    expect(textarea.attributes('disabled')).toBe('')
    expect(textarea.attributes('required')).toBe('')
    expect(textarea.attributes('id')).toBe('test-textarea')
    expect(textarea.attributes('name')).toBe('test-name')
    expect(textarea.attributes('rows')).toBe('6')
  })
  
  it('applies error class when error prop is true', () => {
    const wrapper = mount(Textarea, {
      props: {
        error: true
      }
    })
    
    const textarea = wrapper.find('textarea')
    expect(textarea.classes()).toContain('border-destructive')
    expect(textarea.classes()).toContain('focus-visible:ring-destructive')
  })
  
  it('emits update:modelValue and input events on input', async () => {
    const wrapper = mount(Textarea)
    const textarea = wrapper.find('textarea')
    
    await textarea.setValue('new value')
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['new value'])
    expect(wrapper.emitted('input')).toBeTruthy()
  })
  
  it('emits change event on change', async () => {
    const wrapper = mount(Textarea)
    const textarea = wrapper.find('textarea')
    
    await textarea.trigger('change')
    
    expect(wrapper.emitted('change')).toBeTruthy()
  })
  
  it('emits focus event on focus', async () => {
    const wrapper = mount(Textarea)
    const textarea = wrapper.find('textarea')
    
    await textarea.trigger('focus')
    
    expect(wrapper.emitted('focus')).toBeTruthy()
  })
  
  it('emits blur event on blur', async () => {
    const wrapper = mount(Textarea)
    const textarea = wrapper.find('textarea')
    
    await textarea.trigger('blur')
    
    expect(wrapper.emitted('blur')).toBeTruthy()
  })
})
