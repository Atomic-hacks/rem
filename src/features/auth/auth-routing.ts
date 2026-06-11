import type { UserByEmail, UserRole } from "@/services/auth";

export type AuthIntent = "buyer" | "agent";

const AUTH_INTENT_KEY = "rem-auth-intent";
const PENDING_AUTH_CREDENTIALS_KEY = "rem-pending-auth-credentials";
const agentRoles = new Set<UserRole | "Agent">([
  "Agent",
  "Real Estate Agent",
  "Property Manager",
]);

export function isAgentRole(role?: UserRole | "Agent" | null) {
  return Boolean(role && agentRoles.has(role));
}

export function routeForAuthenticatedUser(
  user: Pick<UserByEmail, "role">,
  intent?: AuthIntent,
) {
  return isAgentRole(user.role) || intent === "agent"
    ? "/agent/dashboard"
    : "/home";
}

export function routeForAuthIntent(intent: AuthIntent) {
  return intent === "agent" ? "/agent/dashboard" : "/home";
}

export function persistAuthIntent(intent: AuthIntent) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_INTENT_KEY, intent);
}

export function getStoredAuthIntent(): AuthIntent {
  if (typeof window === "undefined") return "buyer";
  return window.localStorage.getItem(AUTH_INTENT_KEY) === "agent"
    ? "agent"
    : "buyer";
}

export function persistPendingAuthCredentials(email: string, password: string) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(
    PENDING_AUTH_CREDENTIALS_KEY,
    JSON.stringify({ email, password }),
  );
}

export function getPendingAuthCredentials() {
  if (typeof window === "undefined") return null;

  try {
    const value = window.sessionStorage.getItem(PENDING_AUTH_CREDENTIALS_KEY);
    if (!value) return null;
    const parsed = JSON.parse(value) as { email?: string; password?: string };
    return parsed.email && parsed.password
      ? { email: parsed.email, password: parsed.password }
      : null;
  } catch {
    return null;
  }
}

export function clearPendingAuthCredentials() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(PENDING_AUTH_CREDENTIALS_KEY);
}
