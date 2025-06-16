import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // 测试文件匹配模式
    include: ['src/**/*.test.ts'],

    // 测试环境设置
    environment: 'node',

    // TypeScript 支持
    globals: false,

    // 覆盖率配置
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts', 'src/types/**', 'src/constants/**'],
      reporter: ['text', 'json', 'html'],
      thresholds: {
        functions: 100,
        lines: 100,
        statements: 100,
        branches: 100,
      },
    },

    // 监听模式配置
    watchExclude: ['**/node_modules/**', '**/dist/**', '**/.git/**'],

    // 并发配置
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
      },
    },
  },
})
