import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'vue-konva',
      fileName: 'vue-konva',
    },
    rollupOptions: {
      external: ['vue', 'konva'],
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
