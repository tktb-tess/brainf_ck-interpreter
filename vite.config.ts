/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: resolve(__dirname, './lib/main.ts'),
      name: 'BFInterpreter',
      formats: ['es', 'iife'],
      fileName: (format) => (format === 'iife' ? 'bundle.min.js' : 'bundle.js'),
    },
  },
  worker: {
    format: 'iife',
  },
  test: {
    testTimeout: 30000,
  },
});
