# Michael Hart Architects - Vue.js Version

This is the Vue.js version of the Michael Hart Architects website, migrated from the original Next.js implementation.

## Features

- Project management with category organization
- Image gallery for projects
- Page management for static content
- Admin dashboard for content management
- Responsive design for all devices

## Tech Stack

- Vue.js 3 with Composition API
- Vite for fast development and building
- TypeScript for type safety
- Pinia for state management
- Vue Router for client-side routing
- Tailwind CSS for styling
- MySQL for the database (configured for production use)
- Axios for API requests

## Project Structure

- `src/` - Source code
  - `assets/` - Static assets
  - `components/` - Vue components
    - `ui/` - UI components (buttons, inputs, etc.)
    - `layout/` - Layout components
    - `admin/` - Admin-specific components
    - `common/` - Common components used across the app
  - `composables/` - Vue composables (similar to React hooks)
  - `router/` - Vue Router configuration
  - `stores/` - Pinia stores for state management
  - `services/` - API services
  - `types/` - TypeScript type definitions
  - `utils/` - Utility functions
  - `views/` - Vue pages/views
    - `admin/` - Admin pages
    - `portfolio/` - Portfolio pages
    - `auth/` - Authentication pages
    - `pages/` - Static content pages
  - `App.vue` - Root component
  - `main.ts` - Entry point
- `public/` - Static assets that will be served at the root path

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mha-vue.js
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and configure your environment variables.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This project is configured for deployment to cPanel. Follow these steps:

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the contents of the `dist` directory to your cPanel hosting.

3. Configure the server to serve the `index.html` file for all routes.

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
