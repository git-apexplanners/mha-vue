<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Please enter both email and password'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const success = await authStore.login(email.value, password.value)
    if (success) {
      // Check if there's a redirect URL in the query parameters
      const redirectPath = route.query.redirect as string || '/admin'
      router.push(redirectPath)
    } else {
      errorMessage.value = authStore.error || 'Login failed'
    }
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = 'An unexpected error occurred'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <h1 class="text-3xl font-bold">Sign in to your account</h1>
        <p class="mt-2 text-muted-foreground">
          Enter your credentials to access the admin dashboard
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <div v-if="errorMessage" class="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
          {{ errorMessage }}
        </div>

        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium mb-1">Email address</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium mb-1">Password</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              placeholder="••••••••"
            />
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="rememberMe"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 rounded border-input bg-background text-primary focus:ring-primary"
              />
              <label for="remember-me" class="ml-2 block text-sm text-muted-foreground">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="text-primary hover:underline">
                Forgot your password?
              </a>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
            <span v-else>Sign in</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
