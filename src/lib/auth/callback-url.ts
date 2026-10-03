const ABSOLUTE_HTTP_URL = /^https?:\/\//i

/**
 * Resolve a callback destination against an optional base URL.
 *
 * Local copy of `getAuthCallbackURL` from `@better-auth-ui/core`; the shadcn
 * sign-up component is written against an unreleased version that exports it.
 */
export function getAuthCallbackURL(baseURL: string, redirectTo: string): string {
  if (!baseURL || ABSOLUTE_HTTP_URL.test(redirectTo)) return redirectTo

  return `${baseURL.replace(/\/+$/, "")}/${redirectTo.replace(/^\/+/, "")}`
}
