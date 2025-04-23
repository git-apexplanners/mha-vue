<script setup lang="ts">
// No script needed for this basic page
</script>

<template>
  <div>
    <header class="mb-8">
      <h1 class="text-3xl font-bold">About Michael Hart Architects</h1>
      <p class="text-muted-foreground">Learn about our firm and our approach to architecture</p>
    </header>

    <!-- About Section -->
    <section class="mb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 class="text-2xl font-bold mb-4">Our Story</h2>
          <p class="mb-4">
            Founded in 1990 by Michael Hart, our firm has grown from a small practice to a team of passionate architects and designers dedicated to creating exceptional spaces. With over three decades of experience, we've established ourselves as leaders in innovative architectural design.
          </p>
          <p>
            Our journey has been defined by a commitment to excellence, sustainability, and client satisfaction. We believe that great architecture has the power to transform lives and communities, which is why we approach each project with a deep understanding of our clients' needs and aspirations.
          </p>
        </div>
        <div class="relative aspect-square rounded-lg overflow-hidden bg-muted">
          <!-- Placeholder for an about image -->
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-muted-foreground">About Image</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Values -->
    <section class="mb-12 bg-card p-8 rounded-lg">
      <h2 class="text-2xl font-bold mb-6 text-center">Our Mission & Values</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2">Excellence</h3>
          <p class="text-muted-foreground">
            We strive for excellence in every aspect of our work, from initial concept to final execution.
          </p>
        </div>
        <div class="text-center">
          <div class="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" x2="9.01" y1="9" y2="9"></line>
              <line x1="15" x2="15.01" y1="9" y2="9"></line>
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2">Client Focus</h3>
          <p class="text-muted-foreground">
            We prioritize our clients' needs and work collaboratively to bring their vision to life.
          </p>
        </div>
        <div class="text-center">
          <div class="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
              <path d="M2 22a8 8 0 0 1 8-8h4a8 8 0 0 1 8 8"></path>
              <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
              <path d="M5 8v.01"></path>
              <path d="M19 8v.01"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2">Sustainability</h3>
          <p class="text-muted-foreground">
            We are committed to sustainable design practices that minimize environmental impact.
          </p>
        </div>
      </div>
    </section>



    <!-- CTA Section -->
    <section class="bg-primary text-primary-foreground p-8 rounded-lg text-center">
      <h2 class="text-2xl font-bold mb-4">Ready to Start Your Project?</h2>
      <p class="mb-6 max-w-2xl mx-auto">
        Contact us today to discuss how we can bring your architectural vision to life.
      </p>
      <router-link to="/contact" class="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-opacity-90 transition-colors">
        Get in Touch
      </router-link>
    </section>
  </div>
</template>
