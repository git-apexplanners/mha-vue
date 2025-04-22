<script setup lang="ts">
import TheSidebar from './components/layout/TheSidebar.vue'
import TheFooter from './components/layout/TheFooter.vue'
import Toaster from './components/ui/Toaster.vue'
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <div class="flex min-h-screen">
      <!-- Sidebar Navigation -->
      <TheSidebar />

      <!-- Main Content -->
      <div class="flex-1 flex flex-col">
        <main class="flex-1">
          <router-view></router-view>
        </main>
        <TheFooter />
      </div>
    </div>

    <!-- Global toast notifications -->
    <Toaster />
  </div>
</template>
