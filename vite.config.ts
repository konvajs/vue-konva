import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({
    entryRoot: './src',
    include: ['./src/index.ts', 'index.d.ts'],
  })],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src'),
      name: 'vue-konva',
      // the proper extensions will be added
      fileName: 'vue-konva',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'konva'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          Konva: 'Konva',
        },
      },
    },
  },
  test: {
    setupFiles: ['./vitest.setup.ts'],
    environment: 'jsdom',
    deps: {
      inline: ['vitest-canvas-mock'],
    },
    // For this config, check https://github.com/vitest-dev/vitest/issues/740
    threads: false,
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
  },
});
