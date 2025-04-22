<script setup lang="ts">
import { ref } from 'vue'
import { toastService } from '@/composables/useToast'

// Form data
const formData = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

// Form state
const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})

// Validate form
const validateForm = () => {
  const newErrors: Record<string, string> = {}
  
  if (!formData.value.name.trim()) {
    newErrors.name = 'Name is required'
  }
  
  if (!formData.value.email.trim()) {
    newErrors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    newErrors.email = 'Please enter a valid email address'
  }
  
  if (!formData.value.subject.trim()) {
    newErrors.subject = 'Subject is required'
  }
  
  if (!formData.value.message.trim()) {
    newErrors.message = 'Message is required'
  }
  
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success message
    toastService.success({
      title: 'Message sent',
      description: 'Thank you for your message. We will get back to you soon.'
    })
    
    // Reset form
    formData.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  } catch (error) {
    // Show error message
    toastService.error({
      title: 'Error',
      description: 'There was an error sending your message. Please try again.'
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div>
    <header class="mb-8">
      <h1 class="text-3xl font-bold">Contact Us</h1>
      <p class="text-muted-foreground">Get in touch with our team</p>
    </header>

    <!-- Contact Information -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <!-- Address -->
      <div class="bg-card rounded-lg p-6 shadow-sm">
        <div class="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <h3 class="text-xl font-bold mb-2">Our Office</h3>
        <address class="not-italic text-muted-foreground">
          <p>123 Architecture Street</p>
          <p>Design District, City</p>
          <p>Country, Postal Code</p>
        </address>
      </div>

      <!-- Email -->
      <div class="bg-card rounded-lg p-6 shadow-sm">
        <div class="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold mb-2">Email Us</h3>
        <p class="text-muted-foreground mb-2">
          <a href="mailto:info@michaelhartarchitects.com" class="hover:text-foreground">info@michaelhartarchitects.com</a>
        </p>
        <p class="text-muted-foreground">
          <a href="mailto:projects@michaelhartarchitects.com" class="hover:text-foreground">projects@michaelhartarchitects.com</a>
        </p>
      </div>

      <!-- Phone -->
      <div class="bg-card rounded-lg p-6 shadow-sm">
        <div class="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold mb-2">Call Us</h3>
        <p class="text-muted-foreground mb-2">
          <a href="tel:+1234567890" class="hover:text-foreground">+1 (234) 567-890</a>
        </p>
        <p class="text-muted-foreground">
          <a href="tel:+1234567891" class="hover:text-foreground">+1 (234) 567-891</a>
        </p>
      </div>
    </div>

    <!-- Contact Form -->
    <div class="bg-card rounded-lg p-8 shadow-sm mb-12">
      <h2 class="text-2xl font-bold mb-6">Send Us a Message</h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Name -->
          <div class="space-y-2">
            <label for="name" class="text-sm font-medium">
              Name <span class="text-destructive">*</span>
            </label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              :class="[
                'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                errors.name ? 'border-destructive focus-visible:ring-destructive' : ''
              ]"
              placeholder="Your name"
              required
            />
            <p v-if="errors.name" class="text-sm text-destructive">{{ errors.name }}</p>
          </div>

          <!-- Email -->
          <div class="space-y-2">
            <label for="email" class="text-sm font-medium">
              Email <span class="text-destructive">*</span>
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              :class="[
                'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                errors.email ? 'border-destructive focus-visible:ring-destructive' : ''
              ]"
              placeholder="Your email"
              required
            />
            <p v-if="errors.email" class="text-sm text-destructive">{{ errors.email }}</p>
          </div>

          <!-- Phone -->
          <div class="space-y-2">
            <label for="phone" class="text-sm font-medium">
              Phone
            </label>
            <input
              id="phone"
              v-model="formData.phone"
              type="tel"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Your phone number"
            />
          </div>

          <!-- Subject -->
          <div class="space-y-2">
            <label for="subject" class="text-sm font-medium">
              Subject <span class="text-destructive">*</span>
            </label>
            <input
              id="subject"
              v-model="formData.subject"
              type="text"
              :class="[
                'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                errors.subject ? 'border-destructive focus-visible:ring-destructive' : ''
              ]"
              placeholder="Message subject"
              required
            />
            <p v-if="errors.subject" class="text-sm text-destructive">{{ errors.subject }}</p>
          </div>
        </div>

        <!-- Message -->
        <div class="space-y-2">
          <label for="message" class="text-sm font-medium">
            Message <span class="text-destructive">*</span>
          </label>
          <textarea
            id="message"
            v-model="formData.message"
            :class="[
              'flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              errors.message ? 'border-destructive focus-visible:ring-destructive' : ''
            ]"
            placeholder="Your message"
            required
            rows="5"
          ></textarea>
          <p v-if="errors.message" class="text-sm text-destructive">{{ errors.message }}</p>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
          >
            <span v-if="isSubmitting" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
            <span v-else>Send Message</span>
          </button>
        </div>
      </form>
    </div>

    <!-- Map Section -->
    <div class="mb-12">
      <h2 class="text-2xl font-bold mb-6">Find Us</h2>
      <div class="aspect-[16/9] bg-muted rounded-lg overflow-hidden">
        <!-- Placeholder for map -->
        <div class="w-full h-full flex items-center justify-center">
          <span class="text-muted-foreground">Map will be displayed here</span>
        </div>
      </div>
    </div>

    <!-- Office Hours -->
    <div class="bg-secondary p-8 rounded-lg">
      <h2 class="text-2xl font-bold mb-6">Office Hours</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-bold mb-2">Weekdays</h3>
          <p class="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
        </div>
        <div>
          <h3 class="text-lg font-bold mb-2">Weekends</h3>
          <p class="text-muted-foreground">Saturday: 10:00 AM - 4:00 PM</p>
          <p class="text-muted-foreground">Sunday: Closed</p>
        </div>
      </div>
    </div>
  </div>
</template>
