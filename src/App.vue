<script setup lang="ts">
import { computed } from 'vue'
import TheSidebar from './components/layout/TheSidebar.vue'
import AdminSidebar from './components/layout/AdminSidebar.vue'
import TheFooter from './components/layout/TheFooter.vue'
import Toaster from './components/ui/Toaster.vue'
import { useAuthStore } from './stores/auth'
import { onMounted } from 'vue'

const authStore = useAuthStore()

// Check if user is authenticated
const isAuthenticated = computed(() => authStore.isAuthenticated())

// Set up auto sign-out when window is closed
onMounted(() => {
  window.addEventListener('beforeunload', () => {
    if (authStore.isAuthenticated()) {
      authStore.logout()
    }
  })
})
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <div class="flex min-h-screen">
      <!-- Public Sidebar Navigation (shown when not logged in) -->
      <TheSidebar v-if="!isAuthenticated" />

      <!-- Main Content -->
      <div class="flex-1 flex flex-col">
        <main class="flex-1">
          <router-view></router-view>
        </main>
        <TheFooter />
      </div>

      <!-- Admin Sidebar (shown when user is logged in) -->
      <AdminSidebar v-if="isAuthenticated" />
    </div>

    <!-- Global toast notifications -->
    <Toaster />
  </div>
</template>
