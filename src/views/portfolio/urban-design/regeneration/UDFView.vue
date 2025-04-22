<script setup lang="ts">
import { ref } from 'vue';

// Mock projects data
const projects = ref([
  {
    id: 'udf1',
    title: 'Central District Framework',
    location: 'Cape Town, South Africa',
    year: '2022',
    description: 'A comprehensive Urban Development Framework (UDF) for the central district, establishing guidelines for land use, building form, public space, and infrastructure to guide future development.',
    imageUrl: '/placeholder-image.jpg'
  },
  {
    id: 'udf2',
    title: 'Waterfront District UDF',
    location: 'Durban, South Africa',
    year: '2021',
    description: 'An Urban Development Framework for a waterfront district, balancing development opportunities with public access, environmental protection, and cultural heritage preservation.',
    imageUrl: '/placeholder-image.jpg'
  },
  {
    id: 'udf3',
    title: 'Transit Corridor UDF',
    location: 'Johannesburg, South Africa',
    year: '2020',
    description: 'A framework for transit-oriented development along a major transportation corridor, promoting density, mixed use, and pedestrian-friendly environments around transit nodes.',
    imageUrl: '/placeholder-image.jpg'
  }
]);
</script>

<template>
  <div class="container py-12">
    <div class="mb-8">
      <router-link to="/portfolio/urban-design/regeneration" class="text-primary hover:underline flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        Back to Urban Regeneration
      </router-link>
      <h1 class="text-4xl font-bold mb-4">Urban Development Frameworks</h1>
      <p class="text-xl text-muted-foreground max-w-3xl mb-8">
        Our Urban Development Frameworks (UDFs) provide comprehensive guidelines for the sustainable development and regeneration of urban areas, balancing physical, social, economic, and environmental considerations.
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

    <!-- UDF Approach Section -->
    <div class="mt-16 bg-secondary rounded-lg p-8">
      <h2 class="text-2xl font-bold mb-6">Understanding Urban Development Frameworks</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p class="mb-4">
            An Urban Development Framework (UDF) is a strategic planning tool that provides a comprehensive vision and set of guidelines for the development or regeneration of an urban area. It bridges the gap between high-level policy and detailed design, establishing principles and parameters for land use, built form, public space, movement, and infrastructure.
          </p>
          <p>
            At Michael Hart Architects, we develop UDFs that are both visionary and practical, providing clear direction for future development while allowing for flexibility and adaptation over time. Our frameworks are developed through extensive analysis, stakeholder engagement, and collaborative design processes.
          </p>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-3">Key Components of Our UDFs</h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
              <div>
                <strong class="block">Spatial Vision</strong>
                <span class="text-sm text-muted-foreground">A clear, compelling vision for the future of the area, illustrated through plans, diagrams, and visualizations.</span>
              </div>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
              <div>
                <strong class="block">Development Guidelines</strong>
                <span class="text-sm text-muted-foreground">Parameters for land use, density, building height, massing, and character.</span>
              </div>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
              <div>
                <strong class="block">Public Realm Strategy</strong>
                <span class="text-sm text-muted-foreground">Plans for streets, squares, parks, and other public spaces that form the backbone of urban life.</span>
              </div>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
              <div>
                <strong class="block">Movement Framework</strong>
                <span class="text-sm text-muted-foreground">Strategies for transportation, connectivity, and accessibility, prioritizing sustainable mobility.</span>
              </div>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
              <div>
                <strong class="block">Implementation Strategy</strong>
                <span class="text-sm text-muted-foreground">Phasing, funding mechanisms, and governance arrangements to ensure delivery.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
