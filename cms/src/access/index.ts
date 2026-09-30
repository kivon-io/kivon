import type { Access } from 'payload'

export const authenticated: Access = ({ req }) => Boolean(req.user)

export const anyone: Access = () => true

// Public API sees published docs only; logged-in editors also see drafts.
export const publishedOrAuthenticated: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}
