// vetur.config.js
module.exports = {
  // vetur specific configuration
  settings: {
    "vetur.useWorkspaceDependencies": true,
    "vetur.experimental.templateInterpolationService": true
  },
  // vetur project configuration
  projects: [
    {
      // project root directory
      root: '.',
      // package.json location
      package: './package.json',
      // tsconfig.json location
      tsconfig: './tsconfig.vetur.json',
      // global components directory
      globalComponents: [
        './src/components/**/*.vue'
      ]
    }
  ]
}
