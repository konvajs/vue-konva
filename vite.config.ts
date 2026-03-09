import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

const isCoreBuild = process.env.BUILD_CORE === '1';

export default defineConfig({
  plugins: [],
  build: {
    emptyOutDir: !isCoreBuild,
    lib: isCoreBuild
      ? {
          entry: resolve(__dirname, 'src/index-core.ts'),
          name: 'vue-konva-core',
          fileName: 'vue-konva-core',
          formats: ['es', 'cjs'],
        }
      : {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'vue-konva',
          fileName: 'vue-konva',
        },
    rollupOptions: {
      external: ['vue', /^konva/],
      output: {
        globals: {
          vue: 'Vue',
          konva: 'Konva',
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
  },
});
