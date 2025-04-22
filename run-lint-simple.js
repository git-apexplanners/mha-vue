// Simple script to run ESLint
const { execSync } = require('child_process');
const path = require('path');

try {
  console.log('Running ESLint with basic configuration...');
  const result = execSync('npx eslint --ext .js,.ts,.vue src --no-eslintrc --config { "extends": ["eslint:recommended"] }', { 
    encoding: 'utf8',
    stdio: 'inherit'
  });
  
  console.log('ESLint completed successfully!');
} catch (error) {
  console.error('ESLint found issues that need to be fixed.');
  process.exit(1);
}
