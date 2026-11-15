import { DEFAULT_LOCALE, isLocale } from './translate'
import type { Locale } from './types'

const STORAGE_KEY = 'aeroreborn.locale'

/** The visitor's saved choice, if any. Storage can be unavailable (private mode): never throw. */
export function readStoredLocale(): Locale | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return isLocale(value) ? value : null
  } catch {
    return null
  }
}

export function storeLocale(locale: Locale): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // Storage blocked: the choice simply lasts until the page is closed.
  }
}

/**
 * First visit: the saved choice, else the first supported language in the browser's order of
 * preference (["en-US", "fr-FR"] → English, ["fr-SN", "en"] → French), else English.
 */
export function detectInitialLocale(): Locale {
  const stored = readStoredLocale()
  if (stored) return stored
  const languages = typeof navigator === 'undefined' ? [] : navigator.languages ?? [navigator.language]
  for (const lang of languages) {
    const base = lang?.toLowerCase().split('-')[0]
    if (isLocale(base)) return base
  }
  return DEFAULT_LOCALE
}
