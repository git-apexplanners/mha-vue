<![CDATA[<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TheHeader',
  data() {
    return {
      isMenuOpen: false,
      // Mock auth store for build
      authStore: {
        isAuthenticated: () => false,
        logout: () => {}
      }
    }
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated()
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    closeMenu() {
      this.isMenuOpen = false
    },
    logout() {
      this.authStore.logout()
      this.closeMenu()
      window.location.href = '/login'
    }
  }
})
</script>

<template>
  <header class="bg-background border-b border-border">
    <div class="container flex h-16 items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center">
        <a href="/" class="text-2xl font-bold no-underline">
          Michael Hart Architects
        </a>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-6">
        <a href="/" class="text-foreground hover:text-primary no-underline">Home</a>
        <a href="/projects" class="text-foreground hover:text-primary no-underline">Projects</a>
        <a href="/about" class="text-foreground hover:text-primary no-underline">About</a>
        <a href="/contact" class="text-foreground hover:text-primary no-underline">Contact</a>

        <template v-if="isAuthenticated">
          <a href="/admin" class="text-foreground hover:text-primary no-underline">Admin</a>
          <button @click="logout" class="text-foreground hover:text-primary">Logout</button>
        </template>
        <template v-else>
          <a href="/login" class="text-foreground hover:text-primary no-underline">Login</a>
        </template>
      </nav>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleMenu"
        class="md:hidden p-2 text-foreground"
        aria-label="Toggle menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
          <line x1="4" x2="20" y1="12" y2="12"></line>
          <line x1="4" x2="20" y1="6" y2="6"></line>
          <line x1="4" x2="20" y1="18" y2="18"></line>
        </svg>
      </button>

      <!-- Mobile Menu -->
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 z-50 bg-background md:hidden"
      >
        <div class="container flex h-16 items-center justify-between">
          <div class="text-2xl font-bold">Michael Hart Architects</div>
          <button
            @click="closeMenu"
            class="p-2 text-foreground"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
        <nav class="container flex flex-col space-y-4 py-8">
          <a @click="closeMenu" href="/" class="text-foreground hover:text-primary text-lg no-underline">Home</a>
          <a @click="closeMenu" href="/projects" class="text-foreground hover:text-primary text-lg no-underline">Projects</a>
          <a @click="closeMenu" href="/about" class="text-foreground hover:text-primary text-lg no-underline">About</a>
          <a @click="closeMenu" href="/contact" class="text-foreground hover:text-primary text-lg no-underline">Contact</a>

          <template v-if="isAuthenticated">
            <a @click="closeMenu" href="/admin" class="text-foreground hover:text-primary text-lg no-underline">Admin</a>
            <button @click="logout" class="text-foreground hover:text-primary text-lg text-left">Logout</button>
          </template>
          <template v-else>
            <a @click="closeMenu" href="/login" class="text-foreground hover:text-primary text-lg no-underline">Login</a>
          </template>
        </nav>
      </div>
    </div>
  </header>
</template>]]>
