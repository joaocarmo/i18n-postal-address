import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['lib/__tests__/**/*.test.ts', 'scripts/**/*.test.ts'],
    globals: true,
  },
})
