import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';  // This will continue working in JavaScript

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
