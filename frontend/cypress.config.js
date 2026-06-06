import { defineConfig } from "cypress";
import { spawn } from "node:child_process";
import http from "node:http";

const baseUrl = "http://127.0.0.1:5173";

let devServer;
let startedDevServer = false;

function isServerReady(url) {
  return new Promise((resolve) => {
    const request = http.get(url, (response) => {
      response.resume();
      resolve(true);
    });

    request.on("error", () => resolve(false));
    request.setTimeout(1000, () => {
      request.destroy();
      resolve(false);
    });
  });
}

function stopDevServer() {
  if (startedDevServer && devServer && !devServer.killed) {
    devServer.kill();
  }
}

async function waitForServer(url) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (await isServerReady(url)) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Vite dev server did not start at ${url}`);
}

async function ensureDevServer() {
  if (await isServerReady(baseUrl)) {
    return;
  }

  devServer = spawn("npm", ["run", "dev"], {
    cwd: process.cwd(),
    shell: true,
    stdio: "inherit",
  });
  startedDevServer = true;

  process.once("exit", stopDevServer);
  process.once("SIGINT", stopDevServer);
  process.once("SIGTERM", stopDevServer);

  await waitForServer(baseUrl);
}

export default defineConfig({
  projectId: '8nd28s',
  allowCypressEnv: false,
  e2e: {
    baseUrl,
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    async setupNodeEvents(on, config) {
      await ensureDevServer();

      if (config.isTextTerminal) {
        on("after:run", stopDevServer);
      }

      return config;
    },
  },
});
