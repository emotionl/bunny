import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'src/index.ts',
  format: ['esm', 'cjs', 'iife', 'umd'],
  outDir: 'dist',
  dts: true,
  clean: true,
  minify: true,
  platform: 'neutral',
  outputOptions(options, format) {
    if (format === 'iife' || format === 'umd') {
      options.name = 'Bunny'
    }
    return options
  },
})
