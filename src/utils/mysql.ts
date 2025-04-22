/**
 * THIS FILE IS FOR REFERENCE ONLY AND SHOULD NOT BE IMPORTED IN CLIENT-SIDE CODE
 *
 * In a Vue.js SPA, database connections are handled by the backend API
 * This file serves as a reference for the backend implementation
 *
 * @ts-nocheck - Disable TypeScript checking for this file
 */

// Import commented out to prevent build errors
// import mysql from 'mysql2/promise'

// MySQL connection pool - this would be in the backend code
// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_NAME || 'project_bolt',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// })

// Mock implementation for client-side reference
const pool = { query: async () => [[]] } as any

// Types for database models
export type Category = {
  id: string
  name: string
  slug: string
  parent_id: string | null
  created_at: string
}

export type Project = {
  id: string
  title: string
  slug: string
  description: string | null
  content: string | null
  featured_image: string | null
  main_image_url: string | null
  gallery_image_urls: string[] | null
  category_id: string
  published: boolean
  created_at: string
  updated_at: string
}

export type ProjectImage = {
  id: string
  project_id: string
  url: string
  alt: string | null
  order: number
  created_at: string
}

export type Page = {
  id: string
  title: string
  slug: string
  content: string | null
  meta_title: string | null
  meta_description: string | null
  published: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'author'
  created_at: string
  updated_at: string
}

// Database methods
export const db = {
  // Categories
  async getCategories(): Promise<Category[]> {
    const [rows] = await pool.query('SELECT * FROM categories ORDER BY name')
    return rows as Category[]
  },

  async getCategoryById(id: string): Promise<Category | null> {
    const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id])
    const categories = rows as Category[]
    return categories.length > 0 ? categories[0] : null
  },

  // Projects
  async getProjects(): Promise<Project[]> {
    const [rows] = await pool.query('SELECT * FROM projects ORDER BY created_at DESC')
    return rows as Project[]
  },

  async getProjectById(id: string): Promise<Project | null> {
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [id])
    const projects = rows as Project[]
    return projects.length > 0 ? projects[0] : null
  },

  async getProjectsByCategory(categoryId: string): Promise<Project[]> {
    const [rows] = await pool.query(
      'SELECT * FROM projects WHERE category_id = ? AND published = TRUE ORDER BY created_at DESC',
      [categoryId]
    )
    return rows as Project[]
  },

  // Pages
  async getPages(): Promise<Page[]> {
    const [rows] = await pool.query('SELECT * FROM pages ORDER BY sort_order')
    return rows as Page[]
  },

  async getPageById(id: string): Promise<Page | null> {
    const [rows] = await pool.query('SELECT * FROM pages WHERE id = ?', [id])
    const pages = rows as Page[]
    return pages.length > 0 ? pages[0] : null
  },

  async getPageBySlug(slug: string): Promise<Page | null> {
    const [rows] = await pool.query('SELECT * FROM pages WHERE slug = ?', [slug])
    const pages = rows as Page[]
    return pages.length > 0 ? pages[0] : null
  }
}

export default db
