<script>
import TheFooter from './TheFooter.vue'
import TheSidebar from './TheSidebar.vue'

export default {
  name: 'MainLayout',
  components: {
    TheFooter,
    TheSidebar
  }
}
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Sidebar Navigation -->
    <TheSidebar />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <main class="flex-1">
        <div class="container py-8">
          <div>Main content would go here</div>
        </div>
      </main>
      <TheFooter />
    </div>
  </div>
</template>



