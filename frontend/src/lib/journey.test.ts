import { describe, expect, it } from 'vitest'
import type { Machine, Media, MissionDetail } from '@/api/types'
import { bestStill, machineChapters, sceneMotion } from './journey'

const media = (id: string, extra: Partial<Media> = {}): Media => ({
  id,
  type: 'image',
  url: `https://example.org/${id}.jpg`,
  pageUrl: `https://example.org/${id}`,
  title: null,
  caption: null,
  alt: `Alt ${id}`,
  credit: 'Test',
  license: 'Test',
  depiction: 'photo',
  missionIds: ['m'],
  machineIds: ['rover'],
  sourceId: 's',
  ...extra,
})

const machine = { id: 'rover' } as Machine
const mission = (timeline: MissionDetail['timeline'], all: Media[]) => ({ timeline, media: all }) as MissionDetail
const event = (id: string, items: Media[]) => ({
  id,
  date: { value: '2004-01-04', sourceIds: ['s'] },
  title: `Title ${id}`,
  description: `Text ${id}`,
  mediaIds: items.map((item) => item.id),
  media: items,
})

describe('journey helpers', () => {
  it('prefers a real photo over an artist view', () => {
    expect(bestStill([media('art', { depiction: 'artwork' }), media('photo')])?.id).toBe('photo')
    expect(bestStill([media('video', { type: 'video' })])).toBeUndefined()
  })

  it('builds chapters from the timeline steps that show the machine, in order', () => {
    const other = media('other', { machineIds: ['lander'] })
    const chapters = machineChapters(
      machine,
      mission([event('a', [other]), event('b', [media('b1')]), event('c', [media('c1', { depiction: 'artwork' })])], []),
      undefined,
    )
    expect(chapters.map((c) => [c.id, c.title, c.text, c.media.id])).toEqual([
      ['b', 'Title b', 'Text b', 'b1'],
      ['c', 'Title c', 'Text c', 'c1'],
    ])
  })

  it('falls back to other photos of the machine, described by their alt text', () => {
    const cover = media('cover')
    const chapters = machineChapters(machine, mission([], [cover, media('p2'), media('model', { type: '3d-model' })]), cover)
    expect(chapters).toEqual([expect.objectContaining({ id: 'p2', date: null, text: 'Alt p2' })])
  })

  it('maps the scroll position to enter, progress and exit', () => {
    const before = sceneMotion({ top: 1000, bottom: 3000, height: 2000 }, 800)
    expect(before.enter).toBe(0)
    const inside = sceneMotion({ top: -600, bottom: 1400, height: 2000 }, 800)
    expect(inside.enter).toBe(1)
    expect(inside.progress).toBeCloseTo(0.5)
    expect(inside.exit).toBe(0)
    const leaving = sceneMotion({ top: -2000, bottom: 0, height: 2000 }, 800)
    expect(leaving.exit).toBe(1)
  })
})
