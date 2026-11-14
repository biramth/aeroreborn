import { fireEvent, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderRoute } from '@/test/renderRoute'

describe('destination page (connected to the API)', () => {
  it('shows the missions and their machines', async () => {
    renderRoute('/explore/mars')
    expect(await screen.findByRole('heading', { level: 3, name: 'Test Mission' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 4, name: 'Test Rover' })).toBeInTheDocument()
    expect(screen.getByText('Mission ended')).toBeInTheDocument()
    expect(screen.getByText('Location not mapped')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Test Mission' })).toHaveAttribute('href', '#mission-mission-a')
    expect(screen.getByRole('link', { name: 'Discover its story' })).toHaveAttribute('href', '/stories/story-a?from=machine-a')
  })

  it('loads photos and sources of a machine on demand, labelling non-photos', async () => {
    const user = userEvent.setup()
    renderRoute('/explore/mars')
    const toggle = await screen.findByRole('button', { name: 'Photos, videos and sources' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(await screen.findByAltText('Drawing of a helicopter')).toBeInTheDocument()
    expect(screen.getByText('Artist’s view — not a photo')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Test source page/ })).toHaveAttribute('href', 'https://example.org/source')
  })

  it('keeps the open machine in the URL, closes it with Escape and gives the focus back (US-3.2)', async () => {
    const user = userEvent.setup()
    const { router } = renderRoute('/explore/mars')
    const toggle = await screen.findByRole('button', { name: 'Photos, videos and sources' })
    await user.click(toggle)
    expect(router.state.location.search).toBe('?machine=machine-a')
    // Relations of the machine, with both ends named.
    expect(await screen.findByText('The airbag landing system.')).toBeInTheDocument()
    expect(screen.getByText('Earlier Mission')).toBeInTheDocument()

    // Escape from a link inside the details closes them and returns the focus to the toggle.
    screen.getByRole('link', { name: /Test source page/ }).focus()
    await user.keyboard('{Escape}')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(router.state.location.search).toBe('')
    expect(toggle).toHaveFocus()

    // And from the toggle itself, right after opening.
    await user.click(toggle)
    await user.keyboard('{Escape}')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('opens the machine details directly from ?machine=', async () => {
    renderRoute('/explore/mars?machine=machine-a')
    const toggle = await screen.findByRole('button', { name: 'Hide photos and sources' })
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(await screen.findByAltText('Drawing of a helicopter')).toBeInTheDocument()
  })

  it('replaces a remote image that cannot load by a message', async () => {
    renderRoute('/explore/mars?machine=machine-a')
    fireEvent.error(await screen.findByAltText('Drawing of a helicopter'))
    expect(screen.getAllByText(/This image cannot be shown right now/).length).toBeGreaterThan(0)
  })

  it('tells each machine as a scroll journey: mission photo, machine, then what it did', async () => {
    renderRoute('/explore/mars')
    const mission = await screen.findByRole('region', { name: 'Test Mission' })
    const machineScene = await within(mission).findByRole('region', { name: 'Test Rover' })
    // The machine photo is on the 3D stage, with its credit.
    expect(within(machineScene).getAllByAltText('A rover on the ground').length).toBeGreaterThan(0)
    // "What it did": the timeline step that shows this machine, with its sourced date.
    expect(await within(machineScene).findByRole('heading', { level: 5, name: 'Landing' })).toBeInTheDocument()
    expect(within(machineScene).getByText('The rover bounces on its airbags.')).toBeInTheDocument()
  })

  it('shows every picture inside its step, without the animated stage, under reduced motion', async () => {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: query.includes('reduce'),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }))
    renderRoute('/explore/mars')
    const machineScene = await screen.findByRole('region', { name: 'Test Rover' })
    const landing = (await within(machineScene).findByRole('heading', { level: 5, name: 'Landing' })).closest('article')!
    expect(within(landing).getByAltText('A rover on the ground')).toBeInTheDocument()
    expect(machineScene.querySelector('.journey-card')).toBeNull()
  })

  it('shows the mission step by step', async () => {
    const user = userEvent.setup()
    renderRoute('/explore/mars')
    await user.click(await screen.findByRole('button', { name: 'Show the mission step by step' }))
    const timeline = await screen.findByRole('list', { name: 'Step by step' })
    expect(within(timeline).getByText('The rover bounces on its airbags.')).toBeInTheDocument()
    expect(within(timeline).getByText('4 January 2004')).toBeInTheDocument()
  })

  it('brings the visitor back to the machine they came from (anchor after loading)', async () => {
    const scrollIntoView = vi.fn()
    Element.prototype.scrollIntoView = scrollIntoView
    renderRoute('/explore/mars#machine-machine-a')
    const card = await screen.findByRole('heading', { level: 4, name: 'Test Rover' })
    const article = card.closest('article')!
    expect(article).toHaveFocus()
    expect(scrollIntoView).toHaveBeenCalled()
  })

  it('shows a clear error with a retry button when the API does not answer', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('down', { status: 503 })))
    renderRoute('/explore/moon')
    expect(await screen.findByRole('alert')).toHaveTextContent('This content could not be loaded.')
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument()
  })

  it('asks the API in French when the interface is in French', async () => {
    const fetchMock = vi.mocked(fetch)
    renderRoute('/explore/moon', 'fr')
    await screen.findByRole('heading', { level: 3, name: 'Test Mission' })
    expect(String(fetchMock.mock.calls[0]?.[0])).toContain('lang=fr')
  })
})

describe('story page (connected to the API)', () => {
  it('shows the first step with its voice, image and draft notice', async () => {
    renderRoute('/stories/story-a')
    expect(await screen.findByRole('heading', { level: 1, name: 'The test story' })).toBeInTheDocument()
    expect(screen.getByText(/still being checked/)).toBeInTheDocument()
    // All six steps are scenes of one scroll (US-5.6): check the first one's content.
    const signal = screen.getByRole('region', { name: 'Signal' })
    expect(within(signal).getByRole('heading', { level: 2, name: 'Signal' })).toBeInTheDocument()
    expect(within(signal).getByText('Fact')).toBeInTheDocument()
    expect(within(signal).getByAltText('A rover on the ground')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Previous step' })).toBeDisabled()
  })

  it('changes step with the arrow keys, and not while typing', async () => {
    const user = userEvent.setup()
    const { router } = renderRoute('/stories/story-a?step=2')
    await screen.findByRole('heading', { level: 1, name: 'The test story' })
    await user.keyboard('{ArrowRight}')
    expect(router.state.location.search).toContain('step=3')
    expect(screen.getByRole('heading', { level: 2, name: 'How' })).toHaveFocus()
    await user.keyboard('{ArrowLeft}{ArrowLeft}')
    expect(router.state.location.search).toContain('step=1')
    await user.keyboard('{ArrowLeft}')
    expect(router.state.location.search).toContain('step=1')
  })

  it('jumps to a step from the step list', async () => {
    const user = userEvent.setup()
    const { router } = renderRoute('/stories/story-a')
    const steps = await screen.findByRole('navigation', { name: 'Story steps' })
    await user.click(within(steps).getByRole('button', { name: /4\s*Discovery/ }))
    expect(router.state.location.search).toContain('step=4')
    expect(within(steps).getByRole('button', { name: /4\s*Discovery/ })).toHaveAttribute('aria-current', 'step')
    expect(screen.getByRole('heading', { level: 2, name: 'Discovery' })).toHaveFocus()
  })

  it('moves between steps with the buttons and keeps the step in the URL', async () => {
    const user = userEvent.setup()
    const { router } = renderRoute('/stories/story-a')
    await user.click(await screen.findByRole('button', { name: 'Next step' }))
    expect(router.state.location.search).toContain('step=2')
    expect(screen.getByRole('heading', { level: 2, name: 'Why' })).toHaveFocus()
    expect(screen.getByRole('button', { name: /2\s*Why/ })).toHaveAttribute('aria-current', 'step')
  })

  it('names both ends of what was passed on at the relay step', async () => {
    renderRoute('/stories/story-a?step=5')
    const relay = await screen.findByRole('region', { name: 'What was passed on' })
    expect(within(relay).getByText('Earlier Mission')).toBeInTheDocument()
    expect(within(relay).getByText('Test Mission')).toBeInTheDocument()
    expect(within(relay).getByText('From', { exact: false })).toHaveClass('sr-only')
  })

  it('offers the missions and machines of the story at the end (US-4.7)', async () => {
    renderRoute('/stories/story-a?step=6')
    expect(await screen.findByRole('heading', { level: 3, name: 'The missions of this story' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Test Mission' })).toHaveAttribute('href', '/explore/mars#mission-mission-a')
    expect(screen.getByRole('link', { name: 'Test Rover' })).toHaveAttribute('href', '/explore/mars?machine=machine-a#machine-machine-a')
  })

  it('shows what was passed on at the relay step, with its evidence', async () => {
    renderRoute('/stories/story-a?step=5')
    expect(await screen.findByRole('heading', { level: 3, name: 'What was passed on' })).toBeInTheDocument()
    expect(screen.getByText('The airbag landing system.')).toBeInTheDocument()
    expect(screen.getByText('A test document says so.')).toBeInTheDocument()
  })

  it('offers a way back to the machine and to the other destination at the end', async () => {
    renderRoute('/stories/story-a?step=6&from=machine-a')
    expect(await screen.findByText('Imagine')).toBeInTheDocument()
    // US-4.2 (3): back to the machine the visitor came from, with its details open.
    expect(screen.getByRole('link', { name: 'Back to the machines of Mars' })).toHaveAttribute(
      'href',
      '/explore/mars?machine=machine-a#machine-machine-a',
    )
    expect(screen.getByRole('link', { name: 'Explore Moon' })).toHaveAttribute('href', '/explore/moon')
    expect(screen.queryByRole('button', { name: 'Next step' })).not.toBeInTheDocument()
  })

  it('says when a story does not exist', async () => {
    renderRoute('/stories/unknown-story')
    expect(await screen.findByText('The story “unknown-story” is not available yet.')).toBeInTheDocument()
  })
})

describe('about page (connected to the API)', () => {
  it('lists every source with its consultation date', async () => {
    renderRoute('/about')
    expect(await screen.findByRole('link', { name: /Test source page/ })).toBeInTheDocument()
    expect(screen.getByText(/Consulted on 14 November 2026/)).toBeInTheDocument()
  })
})
