export type AuthProvider = "email" | "phone" | "google";
export type AgentType = "Real Estate Agent" | "Property Manager";
export type UserRole = "Prospective Buyer/Tenant" | AgentType;

type RegisterRequest = {
  firstName: string;
  lastName: string;
  authProvider: AuthProvider;
  email?: string;
  phoneNumber?: string;
  googleToken?: string;
  password?: string;
  rePassword?: string;
  agentType?: AgentType;
};

type ActivateRequest = {
  email: string;
  token: string;
};

type LoginRequest = {
  identifier: string;
  password: string;
};

export type RegisteredUser = {
  first_name: string;
  last_name: string;
  auth_provider: AuthProvider;
  email?: string;
  phone_number?: string;
  agent_type?: AgentType;
};

export type UserByEmail = {
  id: number;
  name: string;
  first_name_field: string;
  last_name_field: string;
  email: string;
  phone_number: string;
  role: UserRole;
  auth_provider: AuthProvider;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  is_active: boolean;
};

export type TokenPair = {
  access: string;
  refresh: string;
};

export type RefreshTokenResponse = {
  access: string;
};

export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

const REGISTER_USER_ENDPOINT =
  process.env.NEXT_PUBLIC_REGISTER_USER_ENDPOINT ?? "/api/v1/users/customer_signup/";
const REGISTER_AGENT_ENDPOINT =
  process.env.NEXT_PUBLIC_REGISTER_AGENT_ENDPOINT ?? "/api/v1/users/agent_signup/";
const ACTIVATE_USER_ENDPOINT =
  process.env.NEXT_PUBLIC_ACTIVATE_USER_ENDPOINT ?? "/api/v1/users/activation/";
const RESEND_ACTIVATION_ENDPOINT =
  process.env.NEXT_PUBLIC_RESEND_ACTIVATION_ENDPOINT ?? "/api/v1/users/resend_activation/";
const USER_BY_EMAIL_ENDPOINT = "/api/v1/users/email";
const CURRENT_USER_ENDPOINT =
  process.env.NEXT_PUBLIC_CURRENT_USER_ENDPOINT ?? "/api/v1/users/me/";
const LOGIN_ENDPOINT =
  process.env.NEXT_PUBLIC_LOGIN_ENDPOINT ?? "/api/v1/jwt/login/";
const TOKEN_REFRESH_ENDPOINT =
  process.env.NEXT_PUBLIC_TOKEN_REFRESH_ENDPOINT ?? "/api/v1/jwt/refresh/";
const TOKEN_VERIFY_ENDPOINT =
  process.env.NEXT_PUBLIC_TOKEN_VERIFY_ENDPOINT ?? "/api/v1/jwt/verify/";
const DEBUG_AUTH_REQUESTS = process.env.NEXT_PUBLIC_DEBUG_AUTH_REQUESTS === "true";

function buildUrl(path: string) {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${API_BASE_URL}${path}`;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new ApiError(formatApiError(payload, response.status), response.status, payload);
  }

  return payload as T;
}

function formatApiError(payload: unknown, status?: number) {
  if (typeof payload === "string") {
    if (/<html[\s>]|<!doctype html/i.test(payload)) {
      return "Server error from API. The backend returned an HTML 500 page instead of JSON.";
    }

    return payload || `Request failed${status ? ` with status ${status}` : ""}.`;
  }

  if (!payload || typeof payload !== "object") {
    return `Request failed${status ? ` with status ${status}` : ""}.`;
  }

  const data = payload as Record<string, unknown>;

  if (typeof data.detail === "string") {
    return data.detail;
  }

  if (typeof data.message === "string") {
    return data.message;
  }

  const fieldErrors = Object.entries(data)
    .map(([field, value]) => {
      const message = Array.isArray(value) ? value.join(", ") : String(value);
      return `${field}: ${message}`;
    })
    .join(" ");

  return fieldErrors || "Request failed";
}

function appendIfPresent(formData: FormData, key: string, value?: string) {
  if (value) {
    formData.append(key, value);
  }
}

function logFormData(endpoint: string, formData: FormData) {
  if (!DEBUG_AUTH_REQUESTS) {
    return;
  }

  console.table(
    Array.from(formData.entries()).map(([key, value]) => ({
      endpoint,
      key,
      value: key.includes("password") ? "[hidden]" : String(value),
    })),
  );
}

function normalizePhoneIdentifier(identifier: string) {
  const trimmed = identifier.trim();
  const digits = trimmed.replace(/\D/g, "");

  if (trimmed.startsWith("+")) {
    return `+${digits}`;
  }

  if (digits.startsWith("234")) {
    return `+${digits}`;
  }

  return `+234${digits.replace(/^0/, "")}`;
}

export async function registerUser(request: RegisterRequest) {
  const formData = new FormData();
  formData.append("first_name", request.firstName.trim());
  formData.append("last_name", request.lastName.trim());
  formData.append("auth_provider", request.authProvider);
  appendIfPresent(formData, "email", request.email?.trim());
  appendIfPresent(formData, "phone_number", request.phoneNumber?.trim());
  appendIfPresent(formData, "google_token", request.googleToken);
  appendIfPresent(formData, "password", request.password);
  appendIfPresent(formData, "re_password", request.rePassword);
  appendIfPresent(formData, "agent_type", request.agentType);

  const endpoint = request.agentType
    ? REGISTER_AGENT_ENDPOINT
    : REGISTER_USER_ENDPOINT;

  logFormData(endpoint, formData);

  const response = await fetch(buildUrl(endpoint), {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  return parseResponse<RegisteredUser>(response);
}

export async function activateUser(request: ActivateRequest) {
  const formData = new FormData();
  formData.append("email", request.email.trim());
  formData.append("token", request.token);

  const response = await fetch(buildUrl(ACTIVATE_USER_ENDPOINT), {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  return parseResponse<ActivateRequest>(response);
}

export async function resendActivation(email: string) {
  const formData = new FormData();
  formData.append("email", email.trim());

  const response = await fetch(buildUrl(RESEND_ACTIVATION_ENDPOINT), {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  return parseResponse<{ email: string }>(response);
}

export async function getUserByEmail(email: string) {
  const response = await fetch(
    buildUrl(`${USER_BY_EMAIL_ENDPOINT}/${encodeURIComponent(email)}/`),
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  return parseResponse<UserByEmail>(response);
}

export async function getCurrentUser(accessToken: string) {
  const response = await fetch(buildUrl(CURRENT_USER_ENDPOINT), {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return parseResponse<UserByEmail>(response);
}

export async function loginUser(request: LoginRequest) {
  const identifier = request.identifier.trim();
  const isEmail = identifier.includes("@");
  const identifierValue = isEmail ? identifier : normalizePhoneIdentifier(identifier);
  const response = await fetch(buildUrl(LOGIN_ENDPOINT), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      credential: identifierValue,
      email: identifierValue,
      password: request.password,
    }),
  });

  return parseResponse<TokenPair>(response);
}

export async function refreshAccessToken(refresh: string) {
  const response = await fetch(buildUrl(TOKEN_REFRESH_ENDPOINT), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh }),
  });

  return parseResponse<RefreshTokenResponse>(response);
}

export async function verifyAccessToken(token: string) {
  const response = await fetch(buildUrl(TOKEN_VERIFY_ENDPOINT), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    await parseResponse(response);
  }
}

export function persistAuthSession(tokens: TokenPair) {
  window.localStorage.setItem("rem-authenticated", "true");
  window.localStorage.setItem("rem-access-token", tokens.access);
  window.localStorage.setItem("rem-refresh-token", tokens.refresh);
}

export function persistAuthUser(user: UserByEmail) {
  window.localStorage.setItem("rem-authenticated", "true");
  window.localStorage.setItem("rem-user", JSON.stringify(user));
}

export function getStoredAccessToken() {
  return window.localStorage.getItem("rem-access-token") ?? "";
}

export function getStoredRefreshToken() {
  return window.localStorage.getItem("rem-refresh-token") ?? "";
}

export function clearAuthSession() {
  window.localStorage.removeItem("rem-authenticated");
  window.localStorage.removeItem("rem-access-token");
  window.localStorage.removeItem("rem-refresh-token");
  window.localStorage.removeItem("rem-user");
}

export function getPendingActivationEmail() {
  return window.localStorage.getItem("rem-pending-activation-email") ?? "";
}

export function setPendingActivationEmail(email: string) {
  window.localStorage.setItem("rem-pending-activation-email", email);
}

export function clearPendingActivationEmail() {
  window.localStorage.removeItem("rem-pending-activation-email");
}
