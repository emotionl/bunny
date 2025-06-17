import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'src/index.ts',
  format: ['esm', 'cjs', 'iife'],
  outDir: 'dist',
  dts: true,
  clean: true,
  sourcemap: true,
  minify: true,
  platform: 'neutral',
  outputOptions(options, format) {
    if (format === 'iife') {
      options.name = 'Bunny'
    }
    return options
  },
})
