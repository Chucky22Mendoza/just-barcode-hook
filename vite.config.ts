/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),  // Archivo de entrada de la librería
      name: 'just-barcode-hook',  // Nombre global para la librería cuando se importe
      fileName: 'index',  // Nombre del archivo de salida
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  }
})
