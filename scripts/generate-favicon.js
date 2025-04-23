// This script is a placeholder for generating a PNG favicon from the SVG
// In a real environment, you would use a library like sharp or svg2png to convert the SVG to PNG
// For now, we'll just copy the SVG to the dist directory and rely on the browser's SVG support

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Copy the SVG favicon to the dist directory
function copyFavicon() {
  const svgPath = path.resolve(__dirname, '../public/favicon.svg')
  const distPath = path.resolve(__dirname, '../dist/favicon.svg')
  
  if (fs.existsSync(svgPath)) {
    fs.copyFileSync(svgPath, distPath)
    console.log(`Favicon copied to ${distPath}`)
  } else {
    console.error('Favicon SVG not found at', svgPath)
  }
}

// Run the script
copyFavicon()
