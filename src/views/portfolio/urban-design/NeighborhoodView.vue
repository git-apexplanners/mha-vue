<script setup lang="ts">
import { ref } from 'vue';

// Mock projects data
const projects = ref([
  {
    id: 'nd1',
    title: 'Green Neighborhood Development',
    location: 'Cape Town, South Africa',
    year: '2022',
    description: 'A sustainable neighborhood design that integrates housing, community facilities, and green spaces with a focus on walkability, energy efficiency, and social interaction.',
    imageUrl: '/placeholder-image.jpg'
  },
  {
    id: 'nd2',
    title: 'Mixed-Income Community',
    location: 'Johannesburg, South Africa',
    year: '2021',
    description: 'A neighborhood design that brings together diverse income groups through thoughtful planning of housing types, public spaces, and community facilities.',
    imageUrl: '/placeholder-image.jpg'
  },
  {
    id: 'nd3',
    title: 'Transit-Oriented Neighborhood',
    location: 'Pretoria, South Africa',
    year: '2020',
    description: 'A compact, mixed-use neighborhood designed around public transportation, with higher densities near transit stops and a network of pedestrian-friendly streets.',
    imageUrl: '/placeholder-image.jpg'
  }
]);
</script>

<template>
  <div class="container py-12">
    <div class="mb-8">
      <router-link to="/portfolio/urban-design" class="text-primary hover:underline flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        Back to Urban Design
      </router-link>
      <h1 class="text-4xl font-bold mb-4">Neighborhood Design</h1>
      <p class="text-xl text-muted-foreground max-w-3xl mb-8">
        Our neighborhood design projects create vibrant, sustainable, and inclusive communities that balance housing, amenities, public spaces, and infrastructure to support a high quality of life.
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

    <!-- Approach Section -->
    <div class="mt-16 bg-secondary rounded-lg p-8">
      <h2 class="text-2xl font-bold mb-6">Our Neighborhood Design Approach</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p class="mb-4">
            At Michael Hart Architects, we believe that neighborhoods are the building blocks of cities and the primary scale at which people experience urban life. Our approach to neighborhood design is holistic, considering not only the physical aspects of the built environment but also the social, economic, and environmental factors that contribute to community well-being.
          </p>
          <p>
            We design neighborhoods that are distinctive, sustainable, and inclusive, with a strong sense of place and community. Our designs are tailored to local context and needs, drawing on both traditional wisdom and contemporary best practices in urban design.
          </p>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-3">Key Elements</h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <div>
                <strong class="block">Housing Diversity</strong>
                <span class="text-sm text-muted-foreground">A mix of housing types, sizes, and price points to accommodate diverse households and income levels.</span>
              </div>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <div>
                <strong class="block">Walkable Streets</strong>
                <span class="text-sm text-muted-foreground">A connected network of safe, comfortable, and interesting streets that prioritize pedestrians.</span>
              </div>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <div>
                <strong class="block">Mixed Uses</strong>
                <span class="text-sm text-muted-foreground">Integration of residential, commercial, and community uses to create vibrant, convenient neighborhoods.</span>
              </div>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <div>
                <strong class="block">Public Spaces</strong>
                <span class="text-sm text-muted-foreground">A hierarchy of public spaces, from intimate pocket parks to larger community gathering places.</span>
              </div>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <div>
                <strong class="block">Green Infrastructure</strong>
                <span class="text-sm text-muted-foreground">Integration of natural systems for stormwater management, biodiversity, and climate resilience.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
