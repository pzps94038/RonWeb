import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://ronweb.zeabur.app',
  },
  env: {
    production: true,
    baseUrl: 'https://ronweb.zeabur.app',
  },
});
