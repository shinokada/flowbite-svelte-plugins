import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4173',
    port: 4173,
    timeout: 180 * 1000,
    reuseExistingServer: !process.env.CI
  },
  testDir: 'e2e'
});
