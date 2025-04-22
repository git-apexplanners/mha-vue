<script setup lang="ts">
import { ref } from 'vue';

// Mock projects data
const projects = ref([
  {
    id: 'cp1',
    title: 'Historic District Revitalization',
    location: 'Cape Town, South Africa',
    year: '2022',
    description: 'A community-led project to revitalize a historic district, preserving architectural heritage while creating new public spaces and economic opportunities for local residents.',
    imageUrl: '/placeholder-image.jpg'
  },
  {
    id: 'cp2',
    title: 'Cultural Heritage Center',
    location: 'Johannesburg, South Africa',
    year: '2021',
    description: 'Transformation of a historic building into a community cultural center that celebrates local heritage and provides spaces for arts, education, and community gatherings.',
    imageUrl: '/placeholder-image.jpg'
  },
  {
    id: 'cp3',
    title: 'Heritage Trail Development',
    location: 'Durban, South Africa',
    year: '2020',
    description: 'Creation of an urban heritage trail connecting historic sites, with community-designed interpretive elements, public art, and improved pedestrian infrastructure.',
    imageUrl: '/placeholder-image.jpg'
  }
]);
</script>

<template>
  <div class="container py-12">
    <div class="mb-8">
      <router-link to="/portfolio/urban-design/heritage" class="text-primary hover:underline flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        Back to Heritage
      </router-link>
      <h1 class="text-4xl font-bold mb-4">Community Heritage Projects</h1>
      <p class="text-xl text-muted-foreground max-w-3xl mb-8">
        Our community heritage projects engage local residents in preserving and celebrating their cultural and architectural heritage through collaborative design processes.
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

    <!-- Community Engagement Section -->
    <div class="mt-16 bg-secondary rounded-lg p-8">
      <h2 class="text-2xl font-bold mb-6">Community-Led Heritage Conservation</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p class="mb-4">
            At Michael Hart Architects, we believe that successful heritage conservation must involve the communities whose history and culture are embodied in the built environment. Our community heritage projects are characterized by deep engagement with local residents, businesses, and other stakeholders throughout the design and implementation process.
          </p>
          <p>
            This collaborative approach ensures that heritage conservation efforts reflect community values, address local needs, and create a sense of ownership and pride among residents. It also helps to build capacity within communities for ongoing stewardship of their heritage resources.
          </p>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-3">Our Process</h3>
          <ol class="space-y-3 list-decimal pl-5">
            <li>
              <strong class="block">Community Mapping</strong>
              <span class="text-sm text-muted-foreground">Working with residents to identify heritage assets and their significance.</span>
            </li>
            <li>
              <strong class="block">Collaborative Visioning</strong>
              <span class="text-sm text-muted-foreground">Facilitating workshops to develop a shared vision for heritage conservation and use.</span>
            </li>
            <li>
              <strong class="block">Participatory Design</strong>
              <span class="text-sm text-muted-foreground">Involving community members in the design process through interactive workshops and feedback sessions.</span>
            </li>
            <li>
              <strong class="block">Skills Development</strong>
              <span class="text-sm text-muted-foreground">Training local residents in traditional building techniques and conservation practices.</span>
            </li>
            <li>
              <strong class="block">Long-term Stewardship</strong>
              <span class="text-sm text-muted-foreground">Establishing community structures for ongoing management and maintenance of heritage assets.</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>
