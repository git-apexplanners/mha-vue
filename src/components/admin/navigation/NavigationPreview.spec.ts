import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavigationPreview from './NavigationPreview.vue'
import { NavItem } from '@/stores/navigation'

describe('NavigationPreview', () => {
  it('renders navigation items correctly', () => {
    const items: NavItem[] = [
      {
        id: '1',
        name: 'Home',
        href: '/',
        icon: 'home',
        order: 1
      },
      {
        id: '2',
        name: 'About',
        href: '/about',
        icon: 'info',
        order: 2
      }
    ]
    
    const wrapper = mount(NavigationPreview, {
      props: {
        items
      }
    })
    
    // Check if items are rendered
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('About')
    expect(wrapper.text()).toContain('/')
    expect(wrapper.text()).toContain('/about')
    
    // Check if SVG icons are rendered
    expect(wrapper.findAll('svg').length).toBe(2)
  })
  
  it('renders nested navigation items correctly', () => {
    const items: NavItem[] = [
      {
        id: '1',
        name: 'Services',
        icon: 'building',
        order: 1,
        children: [
          {
            id: '1-1',
            name: 'Residential',
            href: '/services/residential',
            parent_id: '1',
            order: 1
          },
          {
            id: '1-2',
            name: 'Commercial',
            href: '/services/commercial',
            parent_id: '1',
            order: 2
          }
        ]
      }
    ]
    
    const wrapper = mount(NavigationPreview, {
      props: {
        items
      }
    })
    
    // Check if parent and children are rendered
    expect(wrapper.text()).toContain('Services')
    expect(wrapper.text()).toContain('Residential')
    expect(wrapper.text()).toContain('Commercial')
    expect(wrapper.text()).toContain('/services/residential')
    expect(wrapper.text()).toContain('/services/commercial')
    
    // Check if component recursively renders itself for children
    expect(wrapper.findAllComponents(NavigationPreview).length).toBe(1)
  })
})
