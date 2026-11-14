import type { Machine, Media, MissionDetail, Sourced } from '@/api/types'

/**
 * Pure helpers of the scroll journey on a destination page (mission → machine → what it did).
 * They only reorganise content that the API already serves: no text is invented here.
 */

export interface JourneyChapter {
  id: string
  /** Sourced date of the step, when the chapter comes from the mission timeline. */
  date: Sourced<string> | null
  title: string | null
  text: string
  media: Media
}

const isStill = (media: Media) => media.type === 'image' || media.type === 'animation'

/** Best picture among `media`: a real photo first, then any still image. */
export function bestStill(media: readonly Media[]): Media | undefined {
  const stills = media.filter(isStill)
  return stills.find((item) => item.depiction === 'photo') ?? stills[0]
}

export function mediaOfMachine(mission: MissionDetail, machineId: string): Media[] {
  return mission.media.filter((item) => item.machineIds.includes(machineId))
}

/**
 * What a machine did, in order: the steps of the mission timeline whose illustrations show this
 * machine (date, title and plain-language explanation are already sourced). Without such steps,
 * fall back to other photos of the machine, described by their alt text.
 */
export function machineChapters(machine: Machine, mission: MissionDetail, cover: Media | undefined, max = 4): JourneyChapter[] {
  const fromTimeline = mission.timeline.flatMap((event) => {
    const media = bestStill(event.media.filter((item) => item.machineIds.includes(machine.id)))
    return media ? [{ id: event.id, date: event.date, title: event.title, text: event.description, media }] : []
  })
  if (fromTimeline.length > 0) return fromTimeline.slice(0, max)

  return mediaOfMachine(mission, machine.id)
    .filter((item) => isStill(item) && item.id !== cover?.id)
    .slice(0, max - 1)
    .map((item) => ({ id: item.id, date: null, title: item.title, text: item.alt, media: item }))
}

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const easeOut = (value: number) => 1 - (1 - value) ** 3

/**
 * Scroll state of a scene from its bounding box: `enter` 0→1 while it comes in, `progress` 0→1
 * while it is crossed, `exit` 0→1 while it leaves. `spin` (degrees) makes the machine turn.
 */
export function sceneMotion(rect: { top: number; bottom: number; height: number }, viewportH: number) {
  const enter = easeOut(clamp((viewportH - rect.top) / (viewportH * 0.75)))
  const progress = clamp(-rect.top / Math.max(1, rect.height - viewportH))
  const exit = clamp((viewportH * 0.55 - rect.bottom) / (viewportH * 0.55))
  const spin = Math.sin(progress * Math.PI * 2) * 16
  return { enter, progress, exit, spin }
}
