import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'

dotenv.config() // load env vars from .env

export default defineConfig({
  plugins: [react()],
  define: {
    __VALUE__: `"${process.env.VALUE}"`
}})