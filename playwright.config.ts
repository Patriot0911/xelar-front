import { defineConfig, devices } from '@playwright/test';

const MOCK_API_PORT = 4599;
const APP_PORT = 4010;

/**
 * UI tests against a mocked backend (`e2e/mocks/api-server.mjs`).
 * Write them for new or complex UI only — see docs/CONVENTIONS.md#ui-tests.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${APP_PORT}`,
    trace: 'retain-on-failure',
  },
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.01 },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: [
    {
      command: 'node e2e/mocks/api-server.mjs',
      url: `http://localhost:${MOCK_API_PORT}/health`,
      env: { MOCK_API_PORT: String(MOCK_API_PORT) },
      // Never reuse: a stray process on this port would silently serve different data.
      reuseExistingServer: false,
    },
    {
      command: `npx next dev -p ${APP_PORT}`,
      url: `http://localhost:${APP_PORT}`,
      env: { NEXT_PUBLIC_API_URL: `http://localhost:${MOCK_API_PORT}` },
      reuseExistingServer: false,
      timeout: 120_000,
    },
  ],
});
