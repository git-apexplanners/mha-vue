import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'
import axios from 'axios'

import './assets/main.css'

// UI Components
// Removed UI component imports for production build

const app = createApp(App)

// Register UI components globally
// Removed UI component registration for production build

// Create and use Pinia before mounting the app
const pinia = createPinia()
app.use(pinia)
app.use(router)

// Initialize auth state from localStorage if token exists
const authStore = useAuthStore()
if (authStore.token) {
    // Set the authorization header for future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`
    // Load the user data
    authStore.getCurrentUser()
}

app.mount('#app')
