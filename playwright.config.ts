import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
    testDir: "./tests",
    timeout: 40000,
    expect: {
        timeout: 30000,
    },
    retries: process.env.CI ? 1 : 1,
    workers: process.env.CI ? 2 : undefined,
    use: {
        headless: true,
        viewport: { width: 1366, height: 768 },
        ignoreHTTPSErrors: true,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
    },
    reporter: [["list"], ["allure-playwright"]],

    projects: [
        {
            name: "Chromium (Chrome)",
            use: {
                browserName: "chromium",
                channel: "chrome",
            },
        },
        {
            name: "Firefox",
            use: {
                browserName: "firefox",
            },
        },
        {
            name: "Edge (Chromium)",
            use: {
                browserName: "chromium",
                channel: "msedge",
            },
        },
    ],
});
