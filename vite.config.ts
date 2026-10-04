import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [react(), svgr()],
    server: { port: 3000 },
    // Kept as "build" so the Dockerfile and downstream consumers keep working
    build: { outDir: "build" },
})
