<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useProjectsStore } from '@/stores/projects'
import { useCategoriesStore } from '@/stores/categories'

export default {
  name: 'AdminView',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const projectsStore = useProjectsStore()
    const categoriesStore = useCategoriesStore()

    const loading = ref(true)
    const stats = ref({
      totalProjects: 0,
      publishedProjects: 0,
      draftProjects: 0,
      categories: 0
    })

    onMounted(async () => {
      // For demo purposes, we'll skip authentication check
      // In a real app, you would uncomment the following code:
      // if (!authStore.isAuthenticated()) {
      //   router.push('/login')
      //   return
      // }

      try {
        // Fetch data for dashboard
        const [projects, categories] = await Promise.all([
          projectsStore.fetchProjects(),
          categoriesStore.fetchCategories()
        ])

        // Ensure projects and categories are arrays
        const projectsArray = Array.isArray(projects) ? projects : []
        const categoriesArray = Array.isArray(categories) ? categories : []

        // Calculate stats
        stats.value = {
          totalProjects: projectsArray.length,
          publishedProjects: projectsArray.filter(project => project.published).length,
          draftProjects: projectsArray.filter(project => !project.published).length,
          categories: categoriesArray.length
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        loading.value = false
      }
    })

    return {
      loading,
      stats,
      projectsStore,
      categoriesStore,
      router,
      authStore
    }
  }
}
</script>

<template>
  <div>
    <header class="mb-8">
      <h1 class="text-3xl font-bold">Admin Dashboard</h1>
      <p class="text-muted-foreground">Welcome to the Michael Hart Architects admin dashboard</p>
    </header>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>

    <div v-else>
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-card rounded-lg p-6 shadow-sm">
          <h3 class="text-muted-foreground font-medium mb-2">Total Projects</h3>
          <p class="text-3xl font-bold">{{ stats.totalProjects }}</p>
        </div>

        <div class="bg-card rounded-lg p-6 shadow-sm">
          <h3 class="text-muted-foreground font-medium mb-2">Published Projects</h3>
          <p class="text-3xl font-bold">{{ stats.publishedProjects }}</p>
        </div>

        <div class="bg-card rounded-lg p-6 shadow-sm">
          <h3 class="text-muted-foreground font-medium mb-2">Draft Projects</h3>
          <p class="text-3xl font-bold">{{ stats.draftProjects }}</p>
        </div>

        <div class="bg-card rounded-lg p-6 shadow-sm">
          <h3 class="text-muted-foreground font-medium mb-2">Categories</h3>
          <p class="text-3xl font-bold">{{ stats.categories }}</p>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-card rounded-lg p-6 shadow-sm mb-8">
        <h2 class="text-xl font-bold mb-4">Quick Actions</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <router-link to="/admin/projects/new" class="bg-primary/10 hover:bg-primary/20 text-primary rounded-md p-4 flex items-center gap-3 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            <span>New Project</span>
          </router-link>

          <router-link to="/admin/projects" class="bg-primary/10 hover:bg-primary/20 text-primary rounded-md p-4 flex items-center gap-3 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span>Manage Projects</span>
          </router-link>

          <router-link to="/admin/categories" class="bg-primary/10 hover:bg-primary/20 text-primary rounded-md p-4 flex items-center gap-3 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
            <span>Manage Categories</span>
          </router-link>

          <router-link to="/admin/pages" class="bg-primary/10 hover:bg-primary/20 text-primary rounded-md p-4 flex items-center gap-3 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
            <span>Manage Pages</span>
          </router-link>

          <router-link to="/admin/users" class="bg-primary/10 hover:bg-primary/20 text-primary rounded-md p-4 flex items-center gap-3 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span>Manage Users</span>
          </router-link>
        </div>
      </div>

      <!-- Recent Projects -->
      <div class="bg-card rounded-lg p-6 shadow-sm mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Recent Projects</h2>
          <router-link to="/admin/projects" class="text-primary hover:underline text-sm">View All</router-link>
        </div>

        <div v-if="projectsStore.projects.length === 0" class="text-muted-foreground py-4">
          No projects found.
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b">
                <th class="text-left py-3 px-4 font-medium">Title</th>
                <th class="text-left py-3 px-4 font-medium">Category</th>
                <th class="text-left py-3 px-4 font-medium">Status</th>
                <th class="text-left py-3 px-4 font-medium">Created</th>
                <th class="text-right py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="project in (Array.isArray(projectsStore.projects) ? projectsStore.projects.slice(0, 5) : [])" :key="project.id" class="border-b">
                <td class="py-3 px-4">{{ project.title }}</td>
                <td class="py-3 px-4">
                  {{ Array.isArray(categoriesStore.categories) ?
                      (categoriesStore.categories.find(c => c.id === project.category_id)?.name || 'Unknown') :
                      'Unknown' }}
                </td>
                <td class="py-3 px-4">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      project.published
                        ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400'
                    ]"
                  >
                    {{ project.published ? 'Published' : 'Draft' }}
                  </span>
                </td>
                <td class="py-3 px-4">{{ new Date(project.created_at).toLocaleDateString() }}</td>
                <td class="py-3 px-4 text-right">
                  <div class="flex justify-end gap-2">
                    <router-link :to="`/admin/projects/${project.id}`" class="text-primary hover:text-primary/80">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                        <path d="m15 5 4 4"></path>
                      </svg>
                    </router-link>
                    <router-link :to="`/projects/${project.id}`" class="text-primary hover:text-primary/80">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </router-link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
