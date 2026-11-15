import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { I18nProvider, useTranslation } from '@/i18n'
import { renderRoute } from '@/test/renderRoute'
import { detectInitialLocale, readStoredLocale, storeLocale } from './localeStorage'

afterEach(() => {
  window.localStorage.clear()
  vi.restoreAllMocks()
})

function CurrentLocale() {
  const { locale } = useTranslation()
  return <p>{locale}</p>
}

describe('language switch (header) and API content', () => {
  it('reloads the content from the API in the new language', async () => {
    const user = userEvent.setup()
    const fetchMock = vi.mocked(fetch)
    renderRoute('/explore/mars')
    await screen.findByRole('heading', { level: 3, name: 'Test Mission' })
    const group = screen.getByRole('group', { name: 'Language' })
    await user.click(within(group).getByRole('button', { name: 'fr' }))
    await screen.findByRole('heading', { level: 3, name: 'Test Mission' })
    expect(fetchMock.mock.calls.some(([url]) => String(url).includes('/api/destinations/mars?lang=fr'))).toBe(true)
    expect(readStoredLocale()).toBe('fr')
  })
})

describe('initial language', () => {
  it('prefers the saved choice', () => {
    storeLocale('fr')
    expect(detectInitialLocale()).toBe('fr')
  })

  it('falls back to the browser order of preference, then to English', () => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['fr-SN', 'en'])
    expect(detectInitialLocale()).toBe('fr')
    // The browser's order of preference wins: English first means English.
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['en-US', 'fr-FR'])
    expect(detectInitialLocale()).toBe('en')
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['wo-SN', 'fr'])
    expect(detectInitialLocale()).toBe('fr')
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['de-DE'])
    expect(detectInitialLocale()).toBe('en')
  })

  it('starts a first-time French-speaking visitor in French', () => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['fr-FR', 'en'])
    render(
      <I18nProvider>
        <CurrentLocale />
      </I18nProvider>,
    )
    expect(screen.getByText('fr')).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('fr')
  })

  it('ignores an invalid saved value and never throws if storage is blocked', () => {
    window.localStorage.setItem('aeroreborn.locale', 'klingon')
    expect(readStoredLocale()).toBeNull()
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(readStoredLocale()).toBeNull()
    expect(() => storeLocale('fr')).not.toThrow()
  })
})
