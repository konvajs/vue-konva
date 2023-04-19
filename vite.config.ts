import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({
    entryRoot: './src',
    include: ['./src/index.ts', './src/*.d.ts'],
  })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src'),
      name: 'vue-konva',
      fileName: 'vue-konva',
    },
    rollupOptions: {
      external: ['vue', 'konva'],
      output: {
        globals: {
          vue: 'Vue',
          Konva: 'Konva',
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
  },
});
