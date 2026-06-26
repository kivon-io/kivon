import axios from "axios"

/**
 * Axios instance pointed at our own Next.js API routes (which proxy Relay).
 * Keeping the base URL relative means it works in the browser and in MiniPay's
 * webview without extra config.
 */
export const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
})

// Normalise error messages so hooks can surface `error.message` directly.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.error ?? error?.message ?? "Something went wrong"
    return Promise.reject(new Error(message))
  }
)
