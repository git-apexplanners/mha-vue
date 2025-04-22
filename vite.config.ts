import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'api-mock',
      configureServer(server) {
        server.middlewares.use('/api', (req, res, _next) => {
          // Parse the URL to get the endpoint
          const url = new URL(req.url || '', `http://${req.headers.host}`);
          const endpoint = url.pathname.split('/').filter(Boolean)[0]; // Get the first part after /api/

          // Set response headers
          res.setHeader('Content-Type', 'application/json');

          // Handle different endpoints
          if (endpoint === 'projects') {
            const projectsPath = path.resolve(__dirname, 'src/data/projects.json');
            const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

            // Handle different HTTP methods
            if (req.method === 'GET') {
              // Check if there's an ID in the URL (e.g., /api/projects/1)
              const parts = url.pathname.split('/');
              if (parts.length > 2) {
                const id = parts[2];
                const project = projectsData.find((p: any) => p.id === id);

                if (project) {
                  res.statusCode = 200;
                  res.end(JSON.stringify(project));
                } else {
                  res.statusCode = 404;
                  res.end(JSON.stringify({ error: 'Project not found' }));
                }
              } else {
                // Return all projects
                res.statusCode = 200;
                // Ensure we always return an array
                res.end(JSON.stringify(Array.isArray(projectsData) ? projectsData : []));
              }
            } else if (req.method === 'POST') {
              // Create a new project
              let body = '';
              req.on('data', (chunk) => {
                body += chunk.toString();
              });

              req.on('end', () => {
                try {
                  const projectData = JSON.parse(body);
                  const newProject = {
                    id: String(projectsData.length + 1),
                    ...projectData,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                  };

                  projectsData.push(newProject);
                  fs.writeFileSync(projectsPath, JSON.stringify(projectsData, null, 2));

                  res.statusCode = 201;
                  res.end(JSON.stringify(newProject));
                } catch (error) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'Invalid request body' }));
                }
              });

              // Return early to prevent the default response
              return;
            } else if (req.method === 'PUT') {
              // Update an existing project
              const parts = url.pathname.split('/');
              if (parts.length > 2) {
                const id = parts[2];
                const index = projectsData.findIndex((p: any) => p.id === id);

                if (index !== -1) {
                  let body = '';
                  req.on('data', (chunk) => {
                    body += chunk.toString();
                  });

                  req.on('end', () => {
                    try {
                      const projectData = JSON.parse(body);
                      const updatedProject = {
                        ...projectsData[index],
                        ...projectData,
                        updated_at: new Date().toISOString()
                      };

                      projectsData[index] = updatedProject;
                      fs.writeFileSync(projectsPath, JSON.stringify(projectsData, null, 2));

                      res.statusCode = 200;
                      res.end(JSON.stringify(updatedProject));
                    } catch (error) {
                      res.statusCode = 400;
                      res.end(JSON.stringify({ error: 'Invalid request body' }));
                    }
                  });
                } else {
                  res.statusCode = 404;
                  res.end(JSON.stringify({ error: 'Project not found' }));
                }
              } else {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Project ID is required' }));
              }

              // Return early to prevent the default response
              return;
            } else if (req.method === 'DELETE') {
              // Delete a project
              const parts = url.pathname.split('/');
              if (parts.length > 2) {
                const id = parts[2];
                const index = projectsData.findIndex((p: any) => p.id === id);

                if (index !== -1) {
                  projectsData.splice(index, 1);
                  fs.writeFileSync(projectsPath, JSON.stringify(projectsData, null, 2));

                  res.statusCode = 200;
                  res.end(JSON.stringify({ success: true }));
                } else {
                  res.statusCode = 404;
                  res.end(JSON.stringify({ error: 'Project not found' }));
                }
              } else {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Project ID is required' }));
              }

              // Return early to prevent the default response
              return;
            } else {
              res.statusCode = 405;
              res.end(JSON.stringify({ error: 'Method not allowed' }));
              return;
            }
          } else if (endpoint === 'categories') {
            const categoriesPath = path.resolve(__dirname, 'src/data/categories.json');
            const categoriesData = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'));

            // Handle different HTTP methods
            if (req.method === 'GET') {
              // Check if there's an ID in the URL (e.g., /api/categories/1)
              const parts = url.pathname.split('/');
              if (parts.length > 2) {
                const id = parts[2];

                // Check if it's a request for projects in a category
                if (parts.length > 3 && parts[3] === 'projects') {
                  const projectsPath = path.resolve(__dirname, 'src/data/projects.json');
                  const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

                  // Filter projects by category ID
                  const categoryProjects = Array.isArray(projectsData)
                    ? projectsData.filter((p: any) => p.category_id === id)
                    : [];

                  res.statusCode = 200;
                  res.end(JSON.stringify(categoryProjects));
                } else {
                  // It's a request for a specific category
                  const category = categoriesData.find((c: any) => c.id === id);

                  if (category) {
                    res.statusCode = 200;
                    res.end(JSON.stringify(category));
                  } else {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ error: 'Category not found' }));
                  }
                }
              } else {
                // Return all categories
                res.statusCode = 200;
                // Ensure we always return an array
                res.end(JSON.stringify(Array.isArray(categoriesData) ? categoriesData : []));
              }
            } else if (req.method === 'POST') {
              // Create a new category
              let body = '';
              req.on('data', (chunk) => {
                body += chunk.toString();
              });

              req.on('end', () => {
                try {
                  const categoryData = JSON.parse(body);
                  const newCategory = {
                    id: String(categoriesData.length + 1),
                    ...categoryData,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                  };

                  categoriesData.push(newCategory);
                  fs.writeFileSync(categoriesPath, JSON.stringify(categoriesData, null, 2));

                  res.statusCode = 201;
                  res.end(JSON.stringify(newCategory));
                } catch (error) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'Invalid request body' }));
                }
              });

              // Return early to prevent the default response
              return;
            } else if (req.method === 'PUT') {
              // Update an existing category
              const parts = url.pathname.split('/');
              if (parts.length > 2) {
                const id = parts[2];
                const index = categoriesData.findIndex((c: any) => c.id === id);

                if (index !== -1) {
                  let body = '';
                  req.on('data', (chunk) => {
                    body += chunk.toString();
                  });

                  req.on('end', () => {
                    try {
                      const categoryData = JSON.parse(body);
                      const updatedCategory = {
                        ...categoriesData[index],
                        ...categoryData,
                        updated_at: new Date().toISOString()
                      };

                      categoriesData[index] = updatedCategory;
                      fs.writeFileSync(categoriesPath, JSON.stringify(categoriesData, null, 2));

                      res.statusCode = 200;
                      res.end(JSON.stringify(updatedCategory));
                    } catch (error) {
                      res.statusCode = 400;
                      res.end(JSON.stringify({ error: 'Invalid request body' }));
                    }
                  });
                } else {
                  res.statusCode = 404;
                  res.end(JSON.stringify({ error: 'Category not found' }));
                }
              } else {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Category ID is required' }));
              }

              // Return early to prevent the default response
              return;
            } else if (req.method === 'DELETE') {
              // Delete a category
              const parts = url.pathname.split('/');
              if (parts.length > 2) {
                const id = parts[2];
                const index = categoriesData.findIndex((c: any) => c.id === id);

                if (index !== -1) {
                  categoriesData.splice(index, 1);
                  fs.writeFileSync(categoriesPath, JSON.stringify(categoriesData, null, 2));

                  res.statusCode = 200;
                  res.end(JSON.stringify({ success: true }));
                } else {
                  res.statusCode = 404;
                  res.end(JSON.stringify({ error: 'Category not found' }));
                }
              } else {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Category ID is required' }));
              }

              // Return early to prevent the default response
              return;
            } else {
              res.statusCode = 405;
              res.end(JSON.stringify({ error: 'Method not allowed' }));
              return;
            }
          } else if (endpoint === 'pages') {
            const pagesPath = path.resolve(__dirname, 'src/data/pages.json');
            const pagesData = JSON.parse(fs.readFileSync(pagesPath, 'utf-8'));

            // Handle different HTTP methods
            if (req.method === 'GET') {
              // Check if there's an ID in the URL (e.g., /api/pages/1)
              const parts = url.pathname.split('/');
              if (parts.length > 2) {
                // Check if it's a request for a page by slug
                if (parts[2] === 'slug' && parts.length > 3) {
                  const slug = parts[3];
                  const page = pagesData.find((p: any) => p.slug === slug);

                  if (page) {
                    res.statusCode = 200;
                    res.end(JSON.stringify(page));
                  } else {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ error: 'Page not found' }));
                  }
                } else {
                  // It's a request for a specific page by ID
                  const id = parts[2];
                  const page = pagesData.find((p: any) => p.id === id);

                  if (page) {
                    res.statusCode = 200;
                    res.end(JSON.stringify(page));
                  } else {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ error: 'Page not found' }));
                  }
                }
              } else {
                // Return all pages
                res.statusCode = 200;
                // Ensure we always return an array
                res.end(JSON.stringify(Array.isArray(pagesData) ? pagesData : []));
              }
            } else if (req.method === 'POST') {
              // Check if it's a reorder request
              if (url.pathname === '/api/pages/reorder') {
                // Handle page reordering
                let body = '';
                req.on('data', (chunk) => {
                  body += chunk.toString();
                });

                req.on('end', () => {
                  try {
                    const { pageIds } = JSON.parse(body);

                    // Update the sort_order of pages based on the new order
                    const updatedPages = pagesData.map((page: any) => {
                      const newIndex = pageIds.indexOf(page.id);
                      return {
                        ...page,
                        sort_order: newIndex !== -1 ? newIndex : page.sort_order
                      };
                    });

                    // Sort pages by the new sort_order
                    updatedPages.sort((a: any, b: any) => a.sort_order - b.sort_order);

                    // Write the updated pages to the file
                    fs.writeFileSync(pagesPath, JSON.stringify(updatedPages, null, 2));

                    res.statusCode = 200;
                    res.end(JSON.stringify(updatedPages));
                  } catch (error) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ error: 'Invalid request body' }));
                  }
                });
              } else {
                // Create a new page
                let body = '';
                req.on('data', (chunk) => {
                  body += chunk.toString();
                });

                req.on('end', () => {
                  try {
                    const pageData = JSON.parse(body);
                    const newPage = {
                      id: String(pagesData.length + 1),
                      ...pageData,
                      created_at: new Date().toISOString(),
                      updated_at: new Date().toISOString()
                    };

                    pagesData.push(newPage);
                    fs.writeFileSync(pagesPath, JSON.stringify(pagesData, null, 2));

                    res.statusCode = 201;
                    res.end(JSON.stringify(newPage));
                  } catch (error) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ error: 'Invalid request body' }));
                  }
                });
              }

              // Return early to prevent the default response
              return;
            } else if (req.method === 'PUT') {
              // Update an existing page
              const parts = url.pathname.split('/');
              if (parts.length > 2) {
                const id = parts[2];
                const index = pagesData.findIndex((p: any) => p.id === id);

                if (index !== -1) {
                  let body = '';
                  req.on('data', (chunk) => {
                    body += chunk.toString();
                  });

                  req.on('end', () => {
                    try {
                      const pageData = JSON.parse(body);
                      const updatedPage = {
                        ...pagesData[index],
                        ...pageData,
                        updated_at: new Date().toISOString()
                      };

                      pagesData[index] = updatedPage;
                      fs.writeFileSync(pagesPath, JSON.stringify(pagesData, null, 2));

                      res.statusCode = 200;
                      res.end(JSON.stringify(updatedPage));
                    } catch (error) {
                      res.statusCode = 400;
                      res.end(JSON.stringify({ error: 'Invalid request body' }));
                    }
                  });
                } else {
                  res.statusCode = 404;
                  res.end(JSON.stringify({ error: 'Page not found' }));
                }
              } else {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Page ID is required' }));
              }

              // Return early to prevent the default response
              return;
            } else if (req.method === 'DELETE') {
              // Delete a page
              const parts = url.pathname.split('/');
              if (parts.length > 2) {
                const id = parts[2];
                const index = pagesData.findIndex((p: any) => p.id === id);

                if (index !== -1) {
                  pagesData.splice(index, 1);
                  fs.writeFileSync(pagesPath, JSON.stringify(pagesData, null, 2));

                  res.statusCode = 200;
                  res.end(JSON.stringify({ success: true }));
                } else {
                  res.statusCode = 404;
                  res.end(JSON.stringify({ error: 'Page not found' }));
                }
              } else {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Page ID is required' }));
              }

              // Return early to prevent the default response
              return;
            } else {
              res.statusCode = 405;
              res.end(JSON.stringify({ error: 'Method not allowed' }));
              return;
            }
          } else {
            // Unknown endpoint
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'API endpoint not found' }));
          }
        });
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue': 'vue/dist/vue.esm-bundler.js'
    },
    dedupe: ['vue']
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
    sourcemap: true,
    // Prevent generating .vue.js files in the source directory
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    // No proxy configuration needed
  }
})
