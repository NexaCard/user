const GUEST_ORDER_AUTH_KEY = 'guest_order_auth'
const GUEST_ORDER_SESSION_KEY = 'guest_order_session_auth'

export interface GuestOrderAuth {
  email: string
  order_password: string
}

const parseStoredAuth = (raw: string | null): Partial<GuestOrderAuth> => {
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

export const loadGuestOrderAuth = (): GuestOrderAuth => {
  const persisted = parseStoredAuth(localStorage.getItem(GUEST_ORDER_AUTH_KEY))
  const session = parseStoredAuth(sessionStorage.getItem(GUEST_ORDER_SESSION_KEY))
  return {
    email: String(persisted.email || session.email || ''),
    order_password: String(session.order_password || ''),
  }
}

export const saveGuestOrderAuth = (auth: GuestOrderAuth) => {
  const email = String(auth.email || '').trim()
  const orderPassword = String(auth.order_password || '')

  localStorage.setItem(GUEST_ORDER_AUTH_KEY, JSON.stringify({ email }))
  sessionStorage.setItem(GUEST_ORDER_SESSION_KEY, JSON.stringify({
    email,
    order_password: orderPassword,
  }))
}

export const clearGuestOrderAuth = () => {
  localStorage.removeItem(GUEST_ORDER_AUTH_KEY)
  sessionStorage.removeItem(GUEST_ORDER_SESSION_KEY)
}
