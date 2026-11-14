import { useRef, type RefObject } from 'react'
import { useScrollFrame } from '@/hooks/useScrollFrame'
import { sceneMotion } from '@/lib/journey'

/**
 * Writes the scroll state of a scene as CSS variables on its element (--enter, --progress,
 * --exit, --spin), without re-rendering React. Off under prefers-reduced-motion (useScrollFrame).
 */
export function useSceneMotion<T extends HTMLElement>(enabled: boolean): RefObject<T | null> {
  const ref = useRef<T>(null)
  useScrollFrame(({ viewportH }) => {
    const element = ref.current
    if (!element) return
    const rect = element.getBoundingClientRect()
    if (rect.bottom < -viewportH || rect.top > viewportH * 2) return
    const { enter, progress, exit, spin } = sceneMotion(rect, viewportH)
    element.style.setProperty('--enter', enter.toFixed(4))
    element.style.setProperty('--progress', progress.toFixed(4))
    element.style.setProperty('--exit', exit.toFixed(4))
    element.style.setProperty('--spin', spin.toFixed(2))
  }, enabled)
  return ref
}
