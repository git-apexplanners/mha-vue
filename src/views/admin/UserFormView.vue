<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUsersStore } from '@/stores/users'
import { useAuthStore } from '@/stores/auth'
import { toastService } from '@/composables/useToast'
import type { User, UserRole } from '@/stores/users'

const route = useRoute()
const router = useRouter()
const usersStore = useUsersStore()
const authStore = useAuthStore()

// Determine if we're editing or creating
const isEditing = computed(() => route.params.id !== 'new')
const userId = computed(() => route.params.id as string)

// Form state
const loading = ref(true)
const saving = ref(false)
const errors = ref<Record<string, string>>({})

// Form data
const formData = ref({
  name: '',
  email: '',
  role: 'author' as UserRole,
  password: '',
  confirmPassword: ''
})

// Available roles
const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'author', label: 'Author' }
]

// Load data
onMounted(async () => {
  try {
    // If editing, load the user
    if (isEditing.value) {
      const user = await usersStore.fetchUserById(userId.value)
      
      if (user) {
        formData.value = {
          ...formData.value,
          name: user.name,
          email: user.email,
          role: user.role
        }
      } else {
        toastService.error({
          title: 'Error',
          description: 'User not found'
        })
        router.push('/admin/users')
      }
    }
  } catch (error) {
    console.error('Error loading data:', error)
    toastService.error({
      title: 'Error',
      description: 'Failed to load data. Please try again.'
    })
  } finally {
    loading.value = false
  }
})

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
  
  if (!isEditing.value && !formData.value.password) {
    newErrors.password = 'Password is required'
  } else if (formData.value.password && formData.value.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters'
  }
  
  if (formData.value.password && formData.value.password !== formData.value.confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match'
  }
  
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

// Save user
const saveUser = async () => {
  if (!validateForm()) {
    toastService.error({
      title: 'Validation Error',
      description: 'Please fix the errors in the form'
    })
    return
  }
  
  saving.value = true
  
  try {
    let result
    
    if (isEditing.value) {
      // Only include password if it was provided
      const userData: Partial<User> & { password?: string } = {
        name: formData.value.name,
        email: formData.value.email,
        role: formData.value.role
      }
      
      if (formData.value.password) {
        userData.password = formData.value.password
      }
      
      result = await usersStore.updateUser(userId.value, userData)
    } else {
      result = await usersStore.createUser({
        name: formData.value.name,
        email: formData.value.email,
        role: formData.value.role,
        password: formData.value.password
      })
    }
    
    if (result) {
      toastService.success({
        title: 'Success',
        description: `User ${isEditing.value ? 'updated' : 'created'} successfully`
      })
      router.push('/admin/users')
    } else {
      throw new Error(`Failed to ${isEditing.value ? 'update' : 'create'} user`)
    }
  } catch (error) {
    console.error('Error saving user:', error)
    toastService.error({
      title: 'Error',
      description: `Failed to ${isEditing.value ? 'update' : 'create'} user. Please try again.`
    })
  } finally {
    saving.value = false
  }
}

// Cancel and go back
const cancel = () => {
  router.push('/admin/users')
}

// Check if current user is editing themselves
const isEditingSelf = computed(() => {
  return isEditing.value && userId.value === authStore.user?.id
})
</script>

<template>
  <div>
    <header class="mb-8">
      <h1 class="text-3xl font-bold">{{ isEditing ? 'Edit' : 'New' }} User</h1>
      <p class="text-muted-foreground">
        {{ isEditing ? 'Update user details' : 'Create a new user account' }}
      </p>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>

    <!-- User Form -->
    <form v-else @submit.prevent="saveUser" class="space-y-8">
      <div class="bg-card rounded-lg p-6 shadow-sm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
              placeholder="User's full name"
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
              placeholder="user@example.com"
            />
            <p v-if="errors.email" class="text-sm text-destructive">{{ errors.email }}</p>
          </div>
        </div>

        <!-- Role -->
        <div class="space-y-2 mb-6">
          <label for="role" class="text-sm font-medium">
            Role <span class="text-destructive">*</span>
          </label>
          <select
            id="role"
            v-model="formData.role"
            :disabled="isEditingSelf"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option v-for="role in roles" :key="role.value" :value="role.value">
              {{ role.label }}
            </option>
          </select>
          <p v-if="isEditingSelf" class="text-sm text-muted-foreground">
            You cannot change your own role.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Password -->
          <div class="space-y-2">
            <label for="password" class="text-sm font-medium">
              Password <span v-if="!isEditing" class="text-destructive">*</span>
            </label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              :class="[
                'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                errors.password ? 'border-destructive focus-visible:ring-destructive' : ''
              ]"
              :placeholder="isEditing ? 'Leave blank to keep current password' : 'Enter password'"
            />
            <p v-if="errors.password" class="text-sm text-destructive">{{ errors.password }}</p>
            <p v-else-if="isEditing" class="text-sm text-muted-foreground">
              Leave blank to keep the current password.
            </p>
          </div>

          <!-- Confirm Password -->
          <div class="space-y-2">
            <label for="confirm-password" class="text-sm font-medium">
              Confirm Password <span v-if="!isEditing" class="text-destructive">*</span>
            </label>
            <input
              id="confirm-password"
              v-model="formData.confirmPassword"
              type="password"
              :class="[
                'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                errors.confirmPassword ? 'border-destructive focus-visible:ring-destructive' : ''
              ]"
              placeholder="Confirm password"
            />
            <p v-if="errors.confirmPassword" class="text-sm text-destructive">{{ errors.confirmPassword }}</p>
          </div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end gap-4">
        <button
          type="button"
          @click="cancel"
          class="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="saving"
          class="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none"
        >
          <span v-if="saving" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving...
          </span>
          <span v-else>{{ isEditing ? 'Update' : 'Create' }} User</span>
        </button>
      </div>
    </form>
  </div>
</template>
