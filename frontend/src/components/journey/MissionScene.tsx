import type { Media } from '@/api/types'
import { DepictionBadge } from '@/components/media/DepictionBadge'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useTranslation } from '@/i18n'
import type { ReactNode } from 'react'
import { useSceneMotion } from './useSceneMotion'

interface MissionSceneProps {
  cover: Media | undefined
  /** Mission title, period, summary and actions (rendered by the gallery). */
  children: ReactNode
}

/**
 * Opening scene of a mission: a real photo of the mission fills the background and slowly
 * comes closer while the visitor scrolls; the mission text sits on top. Credit and depiction
 * label stay visible (ABOUT-001, MEDIA-001).
 */
export function MissionScene({ cover, children }: MissionSceneProps) {
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const ref = useSceneMotion<HTMLDivElement>(!reduced)

  return (
    <div ref={ref} className="relative isolate overflow-hidden rounded-2xl border border-stellar-border/50 bg-deep-space">
      {cover && (
        <>
          <img
            src={cover.url}
            alt={cover.alt}
            loading="lazy"
            decoding="async"
            className="mission-scene-photo absolute inset-0 -z-10 size-full object-cover opacity-60"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/80 to-void/10" />
          <div className="absolute top-3 left-3">
            <DepictionBadge depiction={cover.depiction} />
          </div>
        </>
      )}
      <div className="flex min-h-[78vh] flex-col justify-end p-5 sm:p-10">
        {children}
        {cover && (
        <p className="mt-6 text-[0.65rem] text-moon-dust">
          {cover.credit ? t('media.credit', { credit: cover.credit }) : t('media.noCredit')} ·{' '}
          <a href={cover.pageUrl} target="_blank" rel="noopener noreferrer" className="text-cosmic-indigo hover:underline">
            {t('media.viewOriginal')}
            <span className="sr-only"> {t('media.newTab')}</span>
          </a>
        </p>
        )}
      </div>
    </div>
  )
}
