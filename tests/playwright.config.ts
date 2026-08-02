import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

const testDir = defineBddConfig({
  features: "features/**/*.feature",
  steps: ["steps/**/*.ts", "support/fixtures.ts"],
  language: "nl"
});

export default defineConfig({
  testDir,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [["html", { open: "never" }], ["list"]],

  use: {
    baseURL: "http://localhost:4173",
    trace: "on-first-retry",
    screenshot: "only-on-failure"
  },

  projects: [
    {
      name: "android",
      use: { ...devices["Pixel 7"] }
    },
    {
      name: "ios",
      use: { ...devices["iPhone 14"] }
    }
  ],

  webServer: {
    command: "node support/server.mjs",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
    stdout: "ignore"
  }
});
