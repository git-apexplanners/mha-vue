<script>
import { useRouter } from 'vue-router';
import { useNavigation } from '@/composables/useNavigation';

export default {
  name: 'HeritageView',
  setup() {
    const router = useRouter();
    const { navigationItems } = useNavigation();

    // Define subcategories directly to avoid navigation structure issues
    const heritageSubcategories = [
      { name: 'Community Projects', href: '/portfolio/urban-design/heritage/community-projects' }
    ];

    // Sample heritage projects
    const featuredProjects = [
      {
        id: 'hp1',
        title: 'Historic District Revitalization',
        location: 'Cape Town, South Africa',
        year: '2022',
        description: 'Comprehensive revitalization of a historic district, preserving architectural heritage while creating vibrant public spaces and economic opportunities.'
      },
      {
        id: 'hp2',
        title: 'Adaptive Reuse of Industrial Building',
        location: 'Johannesburg, South Africa',
        year: '2021',
        description: 'Transformation of a historic industrial building into a mixed-use development with cultural spaces, offices, and retail.'
      },
      {
        id: 'hp3',
        title: 'Heritage Conservation Plan',
        location: 'Durban, South Africa',
        year: '2020',
        description: 'Development of a conservation management plan for a significant heritage site, including guidelines for preservation and sustainable development.'
      }
    ];

    // Navigate to a subcategory
    const navigateToSubcategory = (href) => {
      if (href) {
        router.push(href);
      }
    };

    return {
      heritageSubcategories,
      featuredProjects,
      navigateToSubcategory
    };
  }
}
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
      <h1 class="text-4xl font-bold mb-4">Heritage Projects</h1>
      <p class="text-xl text-muted-foreground max-w-3xl mb-8">
        Our heritage projects focus on preserving and revitalizing historic urban environments while adapting them to meet contemporary needs and aspirations.
      </p>
    </div>

    <!-- Heritage Subcategories -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="subcategory in heritageSubcategories" :key="subcategory.name"
           class="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
           @click="navigateToSubcategory(subcategory.href)">
        <div class="aspect-video bg-muted relative">
          <!-- Placeholder for subcategory image -->
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-muted-foreground">{{ subcategory.name }} Image</span>
          </div>
        </div>
        <div class="p-4">
          <h2 class="text-xl font-bold mb-2">{{ subcategory.name }}</h2>
          <p class="text-sm text-muted-foreground mb-3">
            Explore our {{ subcategory.name.toLowerCase() }} heritage projects.
          </p>
          <button class="text-primary hover:underline text-sm flex items-center">
            View Projects
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Featured Heritage Projects -->
    <div class="mt-16 mb-16">
      <h2 class="text-2xl font-bold mb-6">Featured Heritage Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="project in featuredProjects" :key="project.id" class="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div class="aspect-video bg-muted relative">
            <!-- Placeholder for project image -->
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-muted-foreground">{{ project.title }} Image</span>
            </div>
          </div>
          <div class="p-5">
            <h3 class="text-lg font-bold mb-2">{{ project.title }}</h3>
            <div class="flex items-center text-sm text-muted-foreground mb-3">
              <span>{{ project.location }}</span>
              <span class="mx-2">•</span>
              <span>{{ project.year }}</span>
            </div>
            <p class="text-sm mb-4">{{ project.description }}</p>
            <button class="text-primary hover:underline text-sm flex items-center">
              View Project Details
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Heritage Approach Section -->
    <div class="bg-secondary rounded-lg p-8">
      <h2 class="text-2xl font-bold mb-6">Our Heritage Conservation Approach</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p class="mb-4">
            At Michael Hart Architects, we believe that heritage conservation is not about freezing buildings and urban areas in time, but rather about managing change in a way that respects and enhances their historical significance while allowing them to remain relevant and viable.
          </p>
          <p>
            Our approach to heritage projects is based on a deep understanding of historical context, traditional building techniques, and contemporary conservation principles. We work closely with heritage authorities, communities, and other stakeholders to develop solutions that balance preservation with adaptation.
          </p>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-3">Key Principles</h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <path d="M2 22h20"></path>
                <path d="M6.87 2h10.26L22 22H2L6.87 2z"></path>
              </svg>
              <div>
                <strong class="block">Research & Documentation</strong>
                <span class="text-sm text-muted-foreground">Thorough historical research and documentation of existing conditions.</span>
              </div>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <path d="M2 22h20"></path>
                <path d="M6.87 2h10.26L22 22H2L6.87 2z"></path>
              </svg>
              <div>
                <strong class="block">Minimal Intervention</strong>
                <span class="text-sm text-muted-foreground">Making only necessary changes while preserving character-defining elements.</span>
              </div>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <path d="M2 22h20"></path>
                <path d="M6.87 2h10.26L22 22H2L6.87 2z"></path>
              </svg>
              <div>
                <strong class="block">Compatibility</strong>
                <span class="text-sm text-muted-foreground">Ensuring new additions or alterations are compatible with but distinguishable from the original.</span>
              </div>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 mt-1 text-primary">
                <path d="M2 22h20"></path>
                <path d="M6.87 2h10.26L22 22H2L6.87 2z"></path>
              </svg>
              <div>
                <strong class="block">Sustainability</strong>
                <span class="text-sm text-muted-foreground">Incorporating sustainable practices while respecting heritage values.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
