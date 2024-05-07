import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const base = '/MedBench-Toolkit/';

// https://vitejs.dev/config/
export default defineConfig({
    base,
    plugins: [react(), tsconfigPaths()],
    define: {
        'process.env.BASE_URL': JSON.stringify(base),
    },
});
