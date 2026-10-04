// AI-generated module by Claude Sonnet 5.5 (GitHub Copilot): msw browser worker setup for local development mocking.
import { setupWorker } from "msw/browser"
import { handlers } from "./handlers"

export const worker = setupWorker(...handlers)
