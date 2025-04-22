import { expect, afterEach, beforeEach } from 'vitest'
import { cleanup } from '@testing-library/vue'
import * as matchers from '@testing-library/jest-dom/matchers'
import { createPinia, setActivePinia } from 'pinia'

// Extend Vitest's expect method with methods from @testing-library/jest-dom
expect.extend(matchers)

// Setup Pinia for each test
beforeEach(() => {
  setActivePinia(createPinia())
})

// Run cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})
