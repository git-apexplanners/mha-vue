/**
 * Navigation item interface
 */
export interface NavItem {
  id: string
  name: string
  href?: string
  icon?: string
  children?: NavItem[]
  parent_id?: string | null
  order?: number
  level?: number // Used for flattened navigation items
}
