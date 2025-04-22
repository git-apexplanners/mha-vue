// Run ESLint on the project
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

try {
  console.log('Running ESLint...');
  const result = execSync('npx eslint --ext .js,.ts,.vue src', { 
    cwd: rootDir,
    encoding: 'utf8',
    stdio: 'inherit'
  });
  
  console.log('ESLint completed successfully!');
} catch (error) {
  console.error('ESLint found issues that need to be fixed.');
  process.exit(1);
}
