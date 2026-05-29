import { defineConfig, devices } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 1,
  reporter: process.env.CI
    ? [['html', { open: 'never' }], ['github']]
    : [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: BASE_URL,
    trace: process.env.CI ? 'on-first-retry' : 'on',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: !process.env.CI
    ? {
        command: 'echo "Ensure the app is running at ' + BASE_URL + '"',
        url: BASE_URL,
        reuseExistingServer: true,
      }
    : undefined,
});
