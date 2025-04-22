<script>
import { ref, onMounted } from 'vue'
import { useProjectsStore } from '@/stores/projects'

export default {
  name: 'HomeView',
  setup() {
    const projectsStore = useProjectsStore()
    const featuredProjects = ref([])
    const loading = ref(true)

    onMounted(async () => {
      try {
        const projects = await projectsStore.fetchProjects()
        // Get the first 3 projects as featured projects
        featuredProjects.value = Array.isArray(projects)
          ? projects.filter(project => project.published).slice(0, 3)
          : []
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      } finally {
        loading.value = false
      }
    })

    return {
      featuredProjects,
      loading,
      projectsStore
    }
  }
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-[80vh] overflow-hidden">
      <div class="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div class="text-center text-white p-8 max-w-4xl">
          <h1 class="text-4xl md:text-6xl font-bold mb-4">Michael Hart Architects</h1>
          <p class="text-xl md:text-2xl mb-8">Creating spaces that inspire for over 33 years</p>
          <router-link to="/projects" class="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors">
            View Our Projects
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section class="py-16">
      <div class="container">
        <h2 class="text-3xl font-bold mb-8 text-center">Featured Projects</h2>

        <div v-if="loading" class="flex justify-center">
          <div class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>

        <div v-else-if="featuredProjects.length === 0" class="text-center text-muted-foreground">
          No projects found.
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="project in featuredProjects" :key="project.id" class="group">
            <router-link :to="`/projects/${project.id}`" class="block no-underline">
              <div class="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                <img
                  :src="project.main_image_url || '/placeholder-image.jpg'"
                  :alt="project.title"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 class="text-xl font-bold mb-2 text-foreground">{{ project.title }}</h3>
              <p class="text-muted-foreground line-clamp-2">{{ project.description }}</p>
            </router-link>
          </div>
        </div>

        <div class="text-center mt-12">
          <router-link to="/projects" class="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary font-medium rounded-md hover:bg-primary hover:text-primary-foreground transition-colors">
            View All Projects
          </router-link>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-16 bg-secondary">
      <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold mb-4">About Michael Hart Architects</h2>
            <p class="text-muted-foreground mb-4">
              Founded in 1990, Michael Hart Architects has been at the forefront of innovative architectural design for over three decades. Our team of passionate architects and designers is dedicated to creating spaces that are not only aesthetically pleasing but also functional and sustainable.
            </p>
            <p class="text-muted-foreground mb-6">
              We believe that great architecture has the power to transform lives and communities. That's why we approach each project with a deep commitment to understanding our clients' needs and aspirations.
            </p>
            <router-link to="/about" class="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors">
              Learn More About Us
            </router-link>
          </div>
          <div class="relative aspect-square rounded-lg overflow-hidden">
            <!-- Placeholder for an about image -->
            <div class="absolute inset-0 bg-muted flex items-center justify-center">
              <span class="text-muted-foreground">About Image</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-16">
      <div class="container">
        <h2 class="text-3xl font-bold mb-8 text-center">Our Services</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Residential Architecture -->
          <div class="bg-card rounded-lg p-6 shadow-sm">
            <div class="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Residential Architecture</h3>
            <p class="text-muted-foreground mb-4">Custom homes, renovations, and residential developments designed with your lifestyle in mind.</p>
            <router-link to="/services/residential" class="text-primary hover:underline">Learn More</router-link>
          </div>

          <!-- Commercial Architecture -->
          <div class="bg-card rounded-lg p-6 shadow-sm">
            <div class="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                <rect x="9" y="9" width="6" height="6"></rect>
                <line x1="9" y1="1" x2="9" y2="4"></line>
                <line x1="15" y1="1" x2="15" y2="4"></line>
                <line x1="9" y1="20" x2="9" y2="23"></line>
                <line x1="15" y1="20" x2="15" y2="23"></line>
                <line x1="20" y1="9" x2="23" y2="9"></line>
                <line x1="20" y1="14" x2="23" y2="14"></line>
                <line x1="1" y1="9" x2="4" y2="9"></line>
                <line x1="1" y1="14" x2="4" y2="14"></line>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Commercial Architecture</h3>
            <p class="text-muted-foreground mb-4">Offices, retail spaces, and commercial buildings that balance functionality with inspiring design.</p>
            <router-link to="/services/commercial" class="text-primary hover:underline">Learn More</router-link>
          </div>

          <!-- Urban Planning -->
          <div class="bg-card rounded-lg p-6 shadow-sm">
            <div class="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="3" y1="15" x2="21" y2="15"></line>
                <line x1="9" y1="3" x2="9" y2="21"></line>
                <line x1="15" y1="3" x2="15" y2="21"></line>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Urban Planning</h3>
            <p class="text-muted-foreground mb-4">Comprehensive urban design solutions that create vibrant, sustainable communities.</p>
            <router-link to="/services/urban" class="text-primary hover:underline">Learn More</router-link>
          </div>

          <!-- Interior Design -->
          <div class="bg-card rounded-lg p-6 shadow-sm">
            <div class="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                <path d="M12 2H2v10h10V2Z"></path>
                <path d="M12 12H2v10h10V12Z"></path>
                <path d="M22 2h-10v20h10V2Z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Interior Design</h3>
            <p class="text-muted-foreground mb-4">Thoughtfully designed interiors that reflect your personality and enhance your daily life.</p>
            <router-link to="/services/interior" class="text-primary hover:underline">Learn More</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA Section -->
    <section class="py-16 bg-primary text-primary-foreground">
      <div class="container text-center">
        <h2 class="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">Contact us today to discuss how we can bring your architectural vision to life.</p>
        <router-link to="/contact" class="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-opacity-90 transition-colors">
          Get in Touch
        </router-link>
      </div>
    </section>
  </div>
</template>
