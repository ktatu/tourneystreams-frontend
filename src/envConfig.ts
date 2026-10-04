// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): switched to import.meta.env, as part of the Vite/dependency migration.
export const BACKEND_BASE_URL = import.meta.env.PROD
    ? (import.meta.env.VITE_BACKEND_URL_PROD as string)
    : (import.meta.env.VITE_BACKEND_URL_DEV as string)
