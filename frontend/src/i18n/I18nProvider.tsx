import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { I18nContext, type I18nContextValue } from './I18nContext'
import { detectInitialLocale, storeLocale } from './localeStorage'
import { translate } from './translate'
import type { Locale, MessageKey, TranslateVars } from './types'

interface I18nProviderProps {
  children: ReactNode
  /** Forces the starting language (tests). Otherwise: saved choice → browser language → English. */
  initialLocale?: Locale
}

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(() => initialLocale ?? detectInitialLocale())

  // Keep <html lang> in sync for screen readers and hyphenation (NFR-A11Y-008), and remember
  // the visitor's choice made with the EN/FR switch.
  useEffect(() => {
    document.documentElement.lang = locale
    storeLocale(locale)
  }, [locale])

  const t = useCallback(
    (key: MessageKey, vars?: TranslateVars) => translate(locale, key, vars),
    [locale],
  )

  const value = useMemo<I18nContextValue>(() => ({ locale, setLocale, t }), [locale, setLocale, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
