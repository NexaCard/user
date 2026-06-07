const canUseStorage = () => typeof window !== 'undefined'

export const getSessionItem = (key: string) => {
  if (!canUseStorage()) return ''
  const current = sessionStorage.getItem(key)
  if (current !== null) return current

  const legacy = localStorage.getItem(key)
  if (legacy !== null) {
    sessionStorage.setItem(key, legacy)
    localStorage.removeItem(key)
    return legacy
  }
  return ''
}

export const setSessionItem = (key: string, value: string) => {
  if (!canUseStorage()) return
  sessionStorage.setItem(key, value)
  localStorage.removeItem(key)
}

export const removeSessionItem = (key: string) => {
  if (!canUseStorage()) return
  sessionStorage.removeItem(key)
  localStorage.removeItem(key)
}
