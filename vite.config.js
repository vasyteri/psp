import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: './public',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: './index.html'
            }
        }
    },
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    }
});