import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import vuePlugin from 'eslint-plugin-vue';
import globals from 'globals';

export default [
  { ignores: ['node_modules/**', 'build/**', 'dist/**', '.git/**', '**/*.vue.js', '**/*.vue'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: vuePlugin.parser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        process: 'readonly',
        console: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'writable',
        setTimeout: 'readonly',
        localStorage: 'readonly',
        window: 'readonly'
      }
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // Vue rules
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/require-default-prop': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/html-self-closing': 'off',

      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-require-imports': 'off',

      // General rules
      'no-console': 'off',
      'no-debugger': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off'
    }
  }
];
