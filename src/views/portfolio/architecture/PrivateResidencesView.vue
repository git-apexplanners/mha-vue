<script setup lang="ts">
import { ref } from 'vue';
import PageTemplate from '@/views/PageTemplate.vue';

// Mock projects data
const projects = ref([
  {
    id: 'pr1',
    title: 'Cliffside Retreat',
    location: 'Cape Town, South Africa',
    year: '2022',
    description: 'A modern residential home perched on the cliffs overlooking the Atlantic Ocean, designed to maximize views while providing privacy and protection from the elements.',
    imageUrl: '/placeholder-image.jpg'
  },
  {
    id: 'pr2',
    title: 'Urban Oasis',
    location: 'Johannesburg, South Africa',
    year: '2021',
    description: 'A contemporary urban home that creates a peaceful sanctuary in the midst of the bustling city, featuring internal courtyards and abundant natural light.',
    imageUrl: '/placeholder-image.jpg'
  },
  {
    id: 'pr3',
    title: 'Vineyard Estate',
    location: 'Stellenbosch, South Africa',
    year: '2020',
    description: 'A luxurious family residence set among the vineyards, blending traditional Cape Dutch architectural elements with modern design principles.',
    imageUrl: '/placeholder-image.jpg'
  },
  {
    id: 'pr4',
    title: 'Beachfront Villa',
    location: 'Plettenberg Bay, South Africa',
    year: '2019',
    description: 'A spacious beach house designed for indoor-outdoor living, with expansive decks, floor-to-ceiling windows, and a seamless connection to the natural environment.',
    imageUrl: '/placeholder-image.jpg'
  }
]);
</script>

<template>
  <div class="container py-12">
    <div class="mb-8">
      <router-link to="/portfolio/architecture" class="text-primary hover:underline flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        Back to Architecture
      </router-link>
      <h1 class="text-4xl font-bold mb-4">Private Residences</h1>
      <p class="text-xl text-muted-foreground max-w-3xl mb-8">
        Our private residential projects reflect our commitment to creating homes that are not only beautiful but also perfectly tailored to the unique lifestyles and needs of our clients.
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

    <!-- Design Philosophy Section -->
    <div class="mt-16 bg-secondary rounded-lg p-8">
      <h2 class="text-2xl font-bold mb-4">Our Residential Design Philosophy</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p class="mb-4">
            At Michael Hart Architects, we believe that a home should be a reflection of its inhabitants' personalities, values, and lifestyles. Our residential design philosophy is centered around creating spaces that are not only aesthetically pleasing but also functional, comfortable, and sustainable.
          </p>
          <p>
            We take a collaborative approach to residential design, working closely with our clients to understand their needs, preferences, and aspirations. This ensures that each home we design is uniquely tailored to enhance the quality of life of those who live in it.
          </p>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-3">Key Principles</h3>
          <ul class="space-y-2">
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span><strong>Contextual Sensitivity:</strong> We design homes that respond to and enhance their surroundings.</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span><strong>Spatial Quality:</strong> We prioritize the quality of space, light, and proportion in our designs.</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span><strong>Sustainability:</strong> We incorporate environmentally responsible design principles and technologies.</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span><strong>Attention to Detail:</strong> We believe that the success of a design lies in its details.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
