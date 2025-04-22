// This script generates a sitemap.xml file for the website
// Run with: node scripts/generate-sitemap.js

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Base URL of the website
const BASE_URL = 'https://michaelhartarchitects.com'

// Static routes
const staticRoutes = [
  '/',
  '/about',
  '/contact',
  '/projects',
  '/services/residential',
  '/services/commercial',
  '/services/urban',
  '/services/interior'
]

// Dynamic routes would typically come from the database
// For this example, we'll use mock data
const mockProjects = [
  { id: 1, slug: 'modern-residence' },
  { id: 2, slug: 'commercial-complex' },
  { id: 3, slug: 'urban-planning-project' }
]

const mockPages = [
  { slug: 'privacy-policy' },
  { slug: 'terms-of-service' },
  { slug: 'our-process' }
]

// Generate sitemap XML
function generateSitemap() {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  
  // Add static routes
  staticRoutes.forEach(route => {
    sitemap += '  <url>\n'
    sitemap += `    <loc>${BASE_URL}${route}</loc>\n`
    sitemap += '    <changefreq>weekly</changefreq>\n'
    sitemap += '    <priority>0.8</priority>\n'
    sitemap += '  </url>\n'
  })
  
  // Add project routes
  mockProjects.forEach(project => {
    sitemap += '  <url>\n'
    sitemap += `    <loc>${BASE_URL}/projects/${project.id}</loc>\n`
    sitemap += '    <changefreq>monthly</changefreq>\n'
    sitemap += '    <priority>0.7</priority>\n'
    sitemap += '  </url>\n'
  })
  
  // Add page routes
  mockPages.forEach(page => {
    sitemap += '  <url>\n'
    sitemap += `    <loc>${BASE_URL}/pages/${page.slug}</loc>\n`
    sitemap += '    <changefreq>monthly</changefreq>\n'
    sitemap += '    <priority>0.6</priority>\n'
    sitemap += '  </url>\n'
  })
  
  sitemap += '</urlset>'
  
  return sitemap
}

// Write sitemap to file
function writeSitemap() {
  const sitemap = generateSitemap()
  const outputPath = path.resolve(__dirname, '../public/sitemap.xml')
  
  fs.writeFileSync(outputPath, sitemap)
  console.log(`Sitemap generated at ${outputPath}`)
}

// Run the script
writeSitemap()
