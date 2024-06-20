import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  const env = loadEnv(mode,process.cwd(),'');
  return{
    define:{
      'process.env':{}
    },
    server: {
      host : "0.0.0.0",
      port: 3000
    },
    plugins: [react()],
  }
})