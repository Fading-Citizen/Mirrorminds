import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html.replace(
          /<script type="module" crossorigin src="([^"]+)"><\/script>/,
          '<script crossorigin src="$1"></script>'
        );
      }
    }
  ],
  base: '/mirrorminds/',
  server: {
    proxy: {
      '/api': {
        target: 'https://7soi1605r1.execute-api.us-east-2.amazonaws.com/dev',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    },
    fs: {
      strict: false
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    target: 'es2020',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        format: 'iife',
        name: 'MirrorMinds',
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
        inlineDynamicImports: true
      }
    }
  }
})
