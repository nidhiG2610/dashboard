import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'

// https://vite.dev/config/
export default defineConfig((mode) => {
    const env = loadEnv(mode, process.cwd() + '/backend', '')

    return {
        envDir: 'backend',
        server: {
            proxy: {
                // '/': {
                //     target: 'http://127.0.0.1:8000',
                //     APP_URL: env.APP_URL,
                //     changeOrigin: true,
                // },
                // '/api': {
                //     target: 'http://127.0.0.1:8000',
                //     changeOrigin: true,
                // },
                '/api' : 'http://127.0.0.1:8000'
            },
            cors: true
        },
        plugins: [
            laravel({
                input: [
                    'frontend/main.tsx'
                ],
                publicDirectory: 'backend/public',
                hotFile: 'backend/public/hot',
                buildDirectory: 'build', // Optional: where it builds in backend/public
                refresh: true,
            }),
            react()
        ],
        resolve: {
            alias: {
                '@': '/frontend',
            },
        },
        build: {
            // Ensure the build output actually goes to the backend folder.
            outDir: 'backend/public/build',
            emptyOutDir: true,
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ['react', 'react-dom', '@inertiajs/react'],
                    },
                },
            },
        },
        define: {
            '__APP_NAME__': JSON.stringify(env.APP_NAME || 'My App'),
        }
    }
});
