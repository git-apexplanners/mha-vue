<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const handleSubmit = () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Please enter both email and password'
    return
  }

  loading.value = true
  errorMessage.value = ''

  authStore.login(email.value, password.value)
    .then(success => {
      if (success) {
        const redirectPath = route.query.redirect || '/admin'
        router.push(redirectPath)
      } else {
        errorMessage.value = authStore.error || 'Login failed'
      }
    })
    .catch(error => {
      console.error('Login error:', error)
      errorMessage.value = 'An unexpected error occurred'
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-background">
    <div class="w-full max-w-md space-y-8 rounded-lg border border-border bg-card p-8 shadow-sm">
      <div class="text-center">
        <h1 class="text-2xl font-bold">Login</h1>
        <p class="mt-2 text-muted-foreground">Sign in to your account</p>
      </div>

      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <div v-if="errorMessage" class="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
          {{ errorMessage }}
        </div>

        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              autocomplete="email"
              required
              class="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              autocomplete="current-password"
              required
              class="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="rememberMe"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label for="remember-me" class="ml-2 block text-sm text-muted-foreground">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="text-primary hover:text-primary/90">
                Forgot your password?
              </a>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
          >
            <span v-if="loading" class="mr-2">
              <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
