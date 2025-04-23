import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCategoriesStore } from '../stores/categories'
import { useNavigationStore } from '../stores/navigation'
import { storeToRefs } from 'pinia'

export function useNavigation() {
  const route = useRoute()
  const categoriesStore = useCategoriesStore()
  const navigationStore = useNavigationStore()

  // Use storeToRefs to make the categories and navigation items reactive
  const { categories } = storeToRefs(categoriesStore)
  const { navigationItems: storeNavigationItems } = storeToRefs(navigationStore)

  // Load categories and navigation on component mount
  onMounted(async () => {
    await Promise.all([
      categoriesStore.fetchCategories(),
      navigationStore.fetchNavigationItems()
    ])
  })

  // Refresh categories when needed
  const refreshCategories = () => {
    categoriesStore.fetchCategories()
  }

  // Navigation items with dynamic categories
  const navigationItems = computed(() => {
    // If we have navigation items from the store, use those
    if (storeNavigationItems.value && storeNavigationItems.value.length > 0) {
      // Find the Portfolio item and update its children with dynamic categories
      const items = JSON.parse(JSON.stringify(storeNavigationItems.value))
      const portfolioItem = items.find(item => item.name === 'Portfolio')

      if (portfolioItem) {
        portfolioItem.children = getPortfolioItems()
      }

      return items
    }

    // Fallback to default navigation items
    const items = [
      {
        name: 'Home',
        href: '/',
        icon: 'home'
      },
      {
        name: 'About',
        href: '/about',
        icon: 'info'
      },
      {
        name: 'Services',
        icon: 'building',
        children: [
          {
            name: 'Residential',
            href: '/services/residential'
          },
          {
            name: 'Commercial',
            href: '/services/commercial'
          },
          {
            name: 'Urban Design',
            href: '/services/urban'
          },
          {
            name: 'Interior Design',
            href: '/services/interior'
          }
        ]
      },
      {
        name: 'Portfolio',
        icon: 'folder',
        children: getPortfolioItems()
      },
      {
        name: 'Design Process',
        href: '/design-process',
        icon: 'pen-tool'
      },
      {
        name: 'Achievements',
        href: '/achievements',
        icon: 'award'
      },
      {
        name: 'Publications',
        href: '/publications',
        icon: 'book-open'
      },
      {
        name: 'Contact',
        href: '/contact',
        icon: 'mail'
      }
    ]

    return items
  })

  // Helper function to get portfolio items based on categories
  function getPortfolioItems() {
    // Default categories to use when store is empty or not an array
    const defaultCategories = [
      {
        name: 'Residential',
        href: '/portfolio/residential'
      },
      {
        name: 'Commercial',
        href: '/portfolio/commercial'
      },
      {
        name: 'Urban Design',
        href: '/portfolio/urban-design'
      }
    ]

    // Check if categories is an array and has items
    if (!Array.isArray(categories.value) || !categories.value.length) {
      console.log('Using default categories for navigation')
      return defaultCategories
    }

    // Map categories to navigation items
    try {
      console.log('Using dynamic categories for navigation:', categories.value.length)
      return categories.value.map(category => ({
        name: category.name,
        href: `/portfolio/${category.slug}`
      }))
    } catch (error) {
      console.error('Error mapping categories:', error)
      return defaultCategories
    }
  }

  // Check if a route is active
  function isActive(path) {
    return route.path === path
  }

  // Check if a parent route is active (any of its children is active)
  function isActiveParent(item) {
    if (!item.children) return false

    // Check if any direct child is active
    const directChildActive = item.children.some(child => {
      if (child.href && isActive(child.href)) return true

      // Check nested children
      if (child.children) {
        return child.children.some(grandchild => grandchild.href && isActive(grandchild.href))
      }

      return false
    })

    return directChildActive
  }

  return {
    navigationItems,
    isActive,
    isActiveParent,
    refreshCategories,
    refreshNavigation: navigationStore.fetchNavigationItems
  }
}
