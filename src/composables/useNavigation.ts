import { ref } from 'vue'
import { useRoute } from 'vue-router'

// Define the navigation item type
export interface NavItem {
  name: string
  href?: string
  icon?: string
  children?: NavItem[]
}

// Base navigation items
const baseNavigationItems: NavItem[] = [
  { name: 'Home', href: '/', icon: 'home' },
  { name: 'Info', href: '/info', icon: 'info' },
  { name: 'About', href: '/about', icon: 'user' },
  {
    name: 'Portfolio',
    icon: 'building',
    children: [
      {
        name: 'Architecture',
        children: [
          { name: 'Private Residences', href: '/portfolio/architecture/private-residences' },
          {
            name: 'Housing', children: [
              { name: 'Social', href: '/portfolio/architecture/housing/social' },
              { name: 'PDP', href: '/portfolio/architecture/housing/pdp' },
              { name: 'CRUWMBS', href: '/portfolio/architecture/housing/cruwmbs' },
            ]
          },
          { name: 'Counseling', href: '/portfolio/architecture/counseling' },
        ],
      },
      {
        name: 'Urban Design',
        children: [
          {
            name: 'Heritage', children: [
              { name: 'Community Projects', href: '/portfolio/urban-design/heritage/community-projects' },
            ]
          },
          {
            name: 'Urban Regeneration', children: [
              { name: 'UDF', href: '/portfolio/urban-design/regeneration/udf' },
            ]
          },
          { name: 'Informal Settlement Upgrade', href: '/portfolio/urban-design/informal-settlement' },
          { name: 'Neighborhood Design', href: '/portfolio/urban-design/neighborhood' },
        ],
      },
    ],
  },
  {
    name: 'Projects',
    href: '/projects',
    icon: 'folder',
  },
  {
    name: 'Design Process',
    icon: 'pen-tool',
    children: [
      { name: 'Corporate', href: '/design-process/corporate' },
      { name: 'Construction Exp', href: '/design-process/construction' },
      { name: 'Material', href: '/design-process/material' },
    ],
  },
  { name: 'Achievements/Awards', href: '/achievements', icon: 'award' },
  { name: 'Publications/Exhibitions', href: '/publications', icon: 'book-open' },
  { name: 'Contact', href: '/contact', icon: 'mail' },
]

export function useNavigation() {
  const navigationItems = ref<NavItem[]>(baseNavigationItems)

  // Get the current route with fallback
  let route: any = { path: '/' }
  try {
    // Try to use the Vue Router route
    const vueRoute = useRoute()
    if (vueRoute) {
      route = vueRoute
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('Vue Router not available, using fallback route')
    }
  }

  // Check if a route is active
  const isActive = (href: string) => {
    if (!href) return false
    try {
      return route?.path === href || route?.path?.startsWith(`${href}/`)
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn('Error checking active route:', error)
      }
      return false
    }
  }

  // Check if a parent route is active (any child is active)
  const isActiveParent = (item: NavItem) => {
    try {
      if (item.href && isActive(item.href)) return true
      if (item.children) {
        return item.children.some(child =>
          (child.href && isActive(child.href)) || isActiveParent(child)
        )
      }
      return false
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn('Error checking active parent route:', error)
      }
      return false
    }
  }

  return {
    navigationItems,
    isActive,
    isActiveParent
  }
}
