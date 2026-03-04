import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // Make .env vars available on process.env for server-side code
  for (const key in env) {
    process.env[key] ??= env[key];
  }

  return {
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  };
});
