import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import del from 'rollup-plugin-delete'
import typescript from 'rollup-plugin-typescript2'

const plugins = [del({ targets: 'dist/*' }), typescript(), nodeResolve(), commonjs(), terser()]

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.umd.js',
        format: 'umd',
        name: 'Bunny',
        sourcemap: true,
      },
    ],
    plugins,
  },
]
