import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    // Undo vi.spyOn() after each test
    restoreMocks: true,
    include: ['lib/**/*.test.ts', 'scripts/**/*.test.ts'],
  },
})
