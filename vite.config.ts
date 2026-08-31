import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const isCoreBuild = process.env.BUILD_CORE === '1';

export default defineConfig({
  plugins: [],
  build: {
    emptyOutDir: !isCoreBuild,
    lib: isCoreBuild
      ? {
          entry: fileURLToPath(new URL('src/index-core.ts', import.meta.url)),
          name: 'vue-konva-core',
          fileName: 'vue-konva-core',
          formats: ['es', 'cjs'],
        }
      : {
          entry: fileURLToPath(new URL('src/index.ts', import.meta.url)),
          // UMD global. Must be a valid identifier so CDN users can write
          // `app.use(VueKonva)` after the script tag.
          name: 'VueKonva',
          formats: ['es', 'cjs', 'umd'],
          // The package is "type": "module", so Node reads .js as ESM and the
          // require condition needs a real .cjs. The UMD bundle keeps a .js
          // extension because CDNs serve .cjs as application/node, which
          // browsers refuse to execute in a <script> tag.
          fileName: (format) =>
            ({ es: 'vue-konva.js', cjs: 'vue-konva.cjs', umd: 'vue-konva.umd.js' })[format] ??
            `vue-konva.${format}.js`,
        },
    rollupOptions: {
      external: ['vue', /^konva/],
      output: {
        globals: {
          vue: 'Vue',
          konva: 'Konva',
          'konva/lib/Core': 'Konva',
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    typecheck: {
      enabled: true,
      // src/ is fully type-checked by `tsc -p tsconfig.build.json` during the
      // build. The runtime suite still has pre-existing `wrapper.vm` typing
      // errors from @vue/test-utils, so only *.test-d.ts errors fail this run.
      ignoreSourceErrors: true,
    },
  },
});
