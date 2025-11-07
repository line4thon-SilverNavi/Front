interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_DEMO_ADMIN_ID: string;
  readonly VITE_DEMO_USER_ID: string;
  readonly VITE_DEMO_ADMIN_PASSWORD: string;
  readonly VITE_DEMO_USER_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
