import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const isCoreBuild = process.env.BUILD_CORE === '1';

// The core entry exists to be tree-shaken by a bundler, so it ships ESM only.
// The main entry adds a UMD bundle for CDN <script> users. It keeps a .js
// extension because CDNs serve .cjs as application/node, which browsers refuse
// to execute; nothing in "exports" points at it, so Node never loads it as ESM.
const mainBundles: Record<string, string> = {
  es: 'vue-konva.js',
  umd: 'vue-konva.umd.js',
};

export default defineConfig({
  build: {
    emptyOutDir: !isCoreBuild,
    lib: isCoreBuild
      ? {
          entry: fileURLToPath(new URL('src/index-core.ts', import.meta.url)),
          fileName: 'vue-konva-core',
          formats: ['es'],
        }
      : {
          entry: fileURLToPath(new URL('src/index.ts', import.meta.url)),
          // UMD global. Must be a valid identifier so CDN users can write
          // `app.use(VueKonva)` after the script tag.
          name: 'VueKonva',
          formats: ['es', 'umd'],
          fileName: (format) => mainBundles[format],
        },
    rollupOptions: {
      external: ['vue', /^konva/],
      output: {
        globals: { vue: 'Vue', konva: 'Konva', 'konva/lib/Core': 'Konva' },
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
