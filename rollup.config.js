import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'

export default [
  // Browser-friendly UMD build.
  {
    input: './src/index.js',
    output: {
      file: pkg.browser,
      format: 'umd',
    },
    name: 'immutable-ics',
    sourcemap: true,
    plugins: [
      resolve(),
      commonjs({
        namedExports: {
          'node_modules/typed-immutable/lib/index.js': [
            'Typed',
            'Record',
            'List',
            'Map',
            'Any',
          ],
        },
      }),
      babel(),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: './src/index.js',
    external: [
      'lodash.isdate',
      'lodash.isfunction',
      'lodash.isnull',
      'lodash.isundefined',
      'lodash.padstart',
      'typed-immutable',
    ],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es',
      },
    ],
    sourcemap: true,
    plugins: [babel()],
  },
]
