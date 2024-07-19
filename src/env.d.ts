/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_NAME: string;
    // Tambahkan deklarasi untuk variabel lingkungan lainnya yang Anda gunakan
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  