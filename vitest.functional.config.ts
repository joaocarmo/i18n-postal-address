import { defineConfig } from 'vitest/config'

// Tests the built package in dist/
export default defineConfig({
  test: {
    include: ['test/functional/**/*.test.ts'],
  },
})
