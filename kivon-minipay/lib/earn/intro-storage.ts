const EARN_INTRO_DISMISSED_KEY = "kivon-earn-intro-dismissed"

export function isEarnIntroDismissed() {
  if (typeof window === "undefined") return false
  try {
    return localStorage.getItem(EARN_INTRO_DISMISSED_KEY) === "true"
  } catch {
    return false
  }
}

export function persistEarnIntroDismissed() {
  try {
    localStorage.setItem(EARN_INTRO_DISMISSED_KEY, "true")
  } catch {
    // Ignore quota / private-mode errors — sheet may reappear next visit.
  }
}
