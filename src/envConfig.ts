export const BACKEND_BASE_URL = import.meta.env.PROD
    ? (import.meta.env.VITE_BACKEND_URL_PROD as string)
    : (import.meta.env.VITE_BACKEND_URL_DEV as string)
