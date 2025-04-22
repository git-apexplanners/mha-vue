import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import Button from '@/components/ui/__mocks__/Button.vue'
import Label from '@/components/ui/__mocks__/Label.vue'

// Create a mock form component for testing
const LoginForm = defineComponent({
  components: {
    Button,
    Label
  },
  setup() {
    const email = ref('')
    const password = ref('')
    const errors = ref({
      email: '',
      password: ''
    })
    const isSubmitting = ref(false)
    const isSuccess = ref(false)
    
    const validateEmail = () => {
      if (!email.value) {
        errors.value.email = 'Email is required'
        return false
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email.value)) {
        errors.value.email = 'Invalid email format'
        return false
      }
      
      errors.value.email = ''
      return true
    }
    
    const validatePassword = () => {
      if (!password.value) {
        errors.value.password = 'Password is required'
        return false
      }
      
      if (password.value.length < 6) {
        errors.value.password = 'Password must be at least 6 characters'
        return false
      }
      
      errors.value.password = ''
      return true
    }
    
    const handleSubmit = async (e) => {
      e.preventDefault()
      
      // Reset errors
      errors.value = {
        email: '',
        password: ''
      }
      
      // Validate form
      const isEmailValid = validateEmail()
      const isPasswordValid = validatePassword()
      
      if (!isEmailValid || !isPasswordValid) {
        return
      }
      
      // Submit form
      isSubmitting.value = true
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Success
        isSuccess.value = true
      } catch (error) {
        // Handle error
        console.error(error)
      } finally {
        isSubmitting.value = false
      }
    }
    
    return {
      email,
      password,
      errors,
      isSubmitting,
      isSuccess,
      handleSubmit,
      validateEmail,
      validatePassword
    }
  },
  template: `
    <form @submit="handleSubmit" class="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <input
          id="email"
          v-model="email"
          type="email"
          @blur="validateEmail"
          class="w-full p-2 border rounded"
          :class="{ 'border-red-500': errors.email }"
        />
        <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
      </div>
      
      <div>
        <Label htmlFor="password">Password</Label>
        <input
          id="password"
          v-model="password"
          type="password"
          @blur="validatePassword"
          class="w-full p-2 border rounded"
          :class="{ 'border-red-500': errors.password }"
        />
        <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
      </div>
      
      <Button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Logging in...' : 'Login' }}
      </Button>
      
      <p v-if="isSuccess" class="text-green-500">Login successful!</p>
    </form>
  `
})

describe('Form Validation Integration', () => {
  it('validates email format', async () => {
    const wrapper = mount(LoginForm)
    
    // Get the email input
    const emailInput = wrapper.find('input[type="email"]')
    
    // Enter invalid email
    await emailInput.setValue('invalid-email')
    await emailInput.trigger('blur')
    
    // Should show error message
    expect(wrapper.text()).toContain('Invalid email format')
    
    // Enter valid email
    await emailInput.setValue('test@example.com')
    await emailInput.trigger('blur')
    
    // Error should be cleared
    expect(wrapper.text()).not.toContain('Invalid email format')
  })

  it('validates password length', async () => {
    const wrapper = mount(LoginForm)
    
    // Get the password input
    const passwordInput = wrapper.find('input[type="password"]')
    
    // Enter short password
    await passwordInput.setValue('12345')
    await passwordInput.trigger('blur')
    
    // Should show error message
    expect(wrapper.text()).toContain('Password must be at least 6 characters')
    
    // Enter valid password
    await passwordInput.setValue('123456')
    await passwordInput.trigger('blur')
    
    // Error should be cleared
    expect(wrapper.text()).not.toContain('Password must be at least 6 characters')
  })

  it('validates required fields on submit', async () => {
    const wrapper = mount(LoginForm)
    
    // Submit form without filling fields
    await wrapper.find('form').trigger('submit')
    
    // Should show both error messages
    expect(wrapper.text()).toContain('Email is required')
    expect(wrapper.text()).toContain('Password is required')
  })

  it('submits form with valid data', async () => {
    const wrapper = mount(LoginForm)
    
    // Fill form with valid data
    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="password"]').setValue('password123')
    
    // Submit form
    await wrapper.find('form').trigger('submit')
    
    // Wait for "API call" to complete
    await new Promise(resolve => setTimeout(resolve, 600))
    
    // Should show success message
    expect(wrapper.text()).toContain('Login successful!')
  })
})
