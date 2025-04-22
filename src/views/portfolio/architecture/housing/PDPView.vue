<script setup lang="ts">
import { ref } from 'vue';

// Mock projects data
const projects = ref([
  {
    id: 'pdp1',
    title: 'Green Valley Development',
    location: 'Cape Town, South Africa',
    year: '2022',
    description: 'A Property Development Partnership (PDP) project creating 200 affordable housing units with integrated community facilities and green spaces.',
    imageUrl: '/placeholder-image.jpg'
  },
  {
    id: 'pdp2',
    title: 'Urban Renewal Complex',
    location: 'Pretoria, South Africa',
    year: '2021',
    description: 'A mixed-income housing development in partnership with local government and private investors, designed to revitalize an urban neighborhood.',
    imageUrl: '/placeholder-image.jpg'
  },
  {
    id: 'pdp3',
    title: 'Coastal Heights',
    location: 'Durban, South Africa',
    year: '2020',
    description: 'A sustainable housing development created through a public-private partnership, featuring energy-efficient design and community amenities.',
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
      <h1 class="text-4xl font-bold mb-4">PDP Housing</h1>
      <p class="text-xl text-muted-foreground max-w-3xl mb-8">
        Our Property Development Partnership (PDP) projects leverage public-private collaboration to create high-quality, affordable housing developments that benefit communities.
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

    <!-- PDP Approach Section -->
    <div class="mt-16 bg-secondary rounded-lg p-8">
      <h2 class="text-2xl font-bold mb-6">Our PDP Approach</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p class="mb-4">
            Property Development Partnerships (PDPs) represent an innovative approach to housing development, bringing together public sector resources and private sector expertise to create high-quality, affordable housing.
          </p>
          <p>
            At Michael Hart Architects, we have extensive experience working within PDP frameworks, collaborating with government agencies, developers, and community organizations to design and deliver successful housing projects that meet the needs of all stakeholders.
          </p>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-3">Benefits of PDP Projects</h3>
          <ul class="space-y-2">
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span><strong>Resource Optimization:</strong> Combining public and private resources for better outcomes.</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span><strong>Risk Sharing:</strong> Distributing development risks among multiple stakeholders.</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span><strong>Innovation:</strong> Encouraging creative solutions to housing challenges.</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span><strong>Community Benefits:</strong> Creating developments that serve broader community needs.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
