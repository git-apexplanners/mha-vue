<script setup lang="ts">
import { ref } from 'vue';

// Mock projects data
const projects = ref([
  {
    id: 'cruwmbs1',
    title: 'Harmony Heights Redevelopment',
    location: 'Cape Town, South Africa',
    year: '2022',
    description: 'A comprehensive redevelopment of an existing housing complex, transforming outdated units into modern, sustainable homes while maintaining community connections.',
    imageUrl: '/placeholder-image.jpg'
  },
  {
    id: 'cruwmbs2',
    title: 'Urban Renewal Initiative',
    location: 'Johannesburg, South Africa',
    year: '2021',
    description: 'A CRUWMBS project focused on upgrading informal settlements with improved infrastructure, housing, and community facilities while preserving social networks.',
    imageUrl: '/placeholder-image.jpg'
  },
  {
    id: 'cruwmbs3',
    title: 'Community Revitalization Project',
    location: 'Durban, South Africa',
    year: '2020',
    description: 'A collaborative effort to revitalize a declining urban neighborhood through strategic interventions in housing, public space, and community facilities.',
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
      <h1 class="text-4xl font-bold mb-4">CRUWMBS Housing</h1>
      <p class="text-xl text-muted-foreground max-w-3xl mb-8">
        Our Community Redevelopment and Urban Welfare Management Building Schemes (CRUWMBS) focus on holistic approaches to upgrading existing housing and communities.
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

    <!-- CRUWMBS Approach Section -->
    <div class="mt-16 bg-secondary rounded-lg p-8">
      <h2 class="text-2xl font-bold mb-6">Understanding CRUWMBS</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p class="mb-4">
            Community Redevelopment and Urban Welfare Management Building Schemes (CRUWMBS) represent a comprehensive approach to housing development that goes beyond simply providing shelter. These projects focus on the holistic improvement of communities, addressing physical infrastructure, social services, economic opportunities, and environmental sustainability.
          </p>
          <p>
            At Michael Hart Architects, we have developed expertise in designing and implementing CRUWMBS projects that transform existing neighborhoods while preserving their social fabric and cultural identity.
          </p>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-3">Key Components</h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <div>
                <strong class="block">Housing Upgrades</strong>
                <span class="text-sm text-muted-foreground">Improving existing housing stock or developing new units that meet modern standards.</span>
              </div>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <div>
                <strong class="block">Infrastructure Development</strong>
                <span class="text-sm text-muted-foreground">Enhancing roads, water supply, sanitation, and other essential services.</span>
              </div>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <div>
                <strong class="block">Community Facilities</strong>
                <span class="text-sm text-muted-foreground">Creating spaces for education, healthcare, recreation, and social interaction.</span>
              </div>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <div>
                <strong class="block">Economic Development</strong>
                <span class="text-sm text-muted-foreground">Supporting local businesses and creating opportunities for employment and entrepreneurship.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
