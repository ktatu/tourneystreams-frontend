export const BACKEND_BASE_URL =
    process.env.NODE_ENV === "production"
        ? (process.env.REACT_APP_BACKEND_URL_PROD as string)
        : (process.env.REACT_APP_BACKEND_URL_DEV as string)
