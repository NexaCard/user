const WEB_ALLOWED_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:', 'tg:'])
const PAYMENT_DENIED_PROTOCOLS = new Set(['javascript:', 'data:', 'vbscript:', 'file:', 'blob:'])
const TRUSTED_TELEGRAM_OAUTH_HOSTS = new Set(['oauth.telegram.org', 'telegram.org'])

const hasControlChars = (value: string) => /[\u0000-\u001F\u007F]/.test(value)

export const normalizeInternalPath = (rawUrl: unknown): string | null => {
  const value = String(rawUrl || '').trim()
  if (!value || hasControlChars(value)) return null
  if (/^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith('//')) return null
  if (value.startsWith('/')) return value
  if (value.startsWith('?') || value.startsWith('#')) return `/${value}`
  return `/${value.replace(/^\/+/, '')}`
}

export const normalizeSafeWebUrl = (rawUrl: unknown): string | null => {
  const value = String(rawUrl || '').trim()
  if (!value || hasControlChars(value)) return null
  try {
    const base = typeof window !== 'undefined' ? window.location.origin : 'https://nexacard.local'
    const url = new URL(value, base)
    if (!WEB_ALLOWED_PROTOCOLS.has(url.protocol)) return null
    return url.href
  } catch {
    return null
  }
}

export const normalizeSafePaymentUrl = (rawUrl: unknown): string | null => {
  const value = String(rawUrl || '').trim()
  if (!value || hasControlChars(value)) return null
  try {
    const base = typeof window !== 'undefined' ? window.location.origin : 'https://nexacard.local'
    const url = new URL(value, base)
    if (PAYMENT_DENIED_PROTOCOLS.has(url.protocol)) return null
    return url.href
  } catch {
    return null
  }
}

export const normalizeTrustedTelegramOAuthUrl = (rawUrl: unknown): string | null => {
  const value = String(rawUrl || '').trim()
  if (!value || hasControlChars(value)) return null
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:') return null
    if (!TRUSTED_TELEGRAM_OAUTH_HOSTS.has(url.hostname.toLowerCase())) return null
    if (url.username || url.password) return null
    return url.href
  } catch {
    return null
  }
}

export const openSafeUrl = (rawUrl: unknown, options: { payment?: boolean; newTab?: boolean } = {}) => {
  if (typeof window === 'undefined') return false
  const safeUrl = options.payment ? normalizeSafePaymentUrl(rawUrl) : normalizeSafeWebUrl(rawUrl)
  if (!safeUrl) return false

  if (options.newTab !== false) {
    const nextWindow = window.open(safeUrl, '_blank', 'noopener,noreferrer')
    if (nextWindow) {
      nextWindow.opener = null
    }
    return true
  }

  window.location.assign(safeUrl)
  return true
}
