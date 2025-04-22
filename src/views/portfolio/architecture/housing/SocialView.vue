<script setup lang="ts">
import { ref } from 'vue';

// Mock projects data
const projects = ref([
  {
    id: 'sh1',
    title: 'Harmony Heights',
    location: 'Cape Town, South Africa',
    year: '2021',
    description: 'A social housing development designed to provide quality, affordable homes for 120 families, with a focus on community spaces and sustainable design.',
    imageUrl: '/placeholder-image.jpg'
  },
  {
    id: 'sh2',
    title: 'Unity Gardens',
    location: 'Johannesburg, South Africa',
    year: '2020',
    description: 'A mixed-use development combining social housing with community facilities, including a daycare center, community hall, and urban agriculture spaces.',
    imageUrl: '/placeholder-image.jpg'
  },
  {
    id: 'sh3',
    title: 'Riverside Commons',
    location: 'Durban, South Africa',
    year: '2019',
    description: 'A riverside social housing project that prioritizes access to nature, with communal gardens, walking paths, and views of the water for all residents.',
    imageUrl: '/placeholder-image.jpg'
  }
]);
</script>

<template>
  <div class="container py-12">
    <div class="mb-8">
      <router-link to="/portfolio/architecture/housing" class="text-primary hover:underline flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        Back to Housing
      </router-link>
      <h1 class="text-4xl font-bold mb-4">Social Housing</h1>
      <p class="text-xl text-muted-foreground max-w-3xl mb-8">
        Our social housing projects aim to create dignified, sustainable, and community-oriented living environments for all residents, regardless of income level.
      </p>
    </div>

    <!-- Project Gallery -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div v-for="project in projects" :key="project.id" class="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div class="aspect-video bg-muted relative">
          <!-- Placeholder for project image -->
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-muted-foreground">{{ project.title }} Image</span>
          </div>
        </div>
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-2">{{ project.title }}</h2>
          <div class="flex items-center text-sm text-muted-foreground mb-4">
            <span>{{ project.location }}</span>
            <span class="mx-2">•</span>
            <span>{{ project.year }}</span>
          </div>
          <p class="mb-4">{{ project.description }}</p>
          <router-link :to="`/projects/${project.id}`" class="text-primary hover:underline flex items-center">
            View Project Details
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Social Housing Philosophy -->
    <div class="mt-16 bg-secondary rounded-lg p-8">
      <h2 class="text-2xl font-bold mb-6">Our Social Housing Philosophy</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p class="mb-4">
            At Michael Hart Architects, we believe that everyone deserves access to well-designed, dignified housing. Our social housing projects are guided by a commitment to social equity, environmental sustainability, and community building.
          </p>
          <p>
            We work closely with communities, government agencies, and non-profit organizations to create housing solutions that address the specific needs and aspirations of the people who will live in them. Our goal is to design social housing that not only provides shelter but also fosters a sense of belonging, pride, and opportunity.
          </p>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-3">Key Principles</h3>
          <ul class="space-y-2">
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span><strong>Community Engagement:</strong> Involving future residents in the design process.</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span><strong>Mixed-Use Development:</strong> Integrating housing with community facilities and services.</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span><strong>Sustainable Design:</strong> Minimizing environmental impact and reducing operating costs.</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span><strong>Quality & Dignity:</strong> Creating homes that residents can be proud of.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
