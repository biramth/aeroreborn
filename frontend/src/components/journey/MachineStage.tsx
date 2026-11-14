import type { Media } from '@/api/types'
import { DepictionBadge } from '@/components/media/DepictionBadge'
import { useTranslation } from '@/i18n'

interface MachineStageProps {
  media: Media | undefined
}

/**
 * The "3D" machine: a photo card in perspective that comes in from the left, turns while the
 * visitor scrolls and leaves to the right (CSS variables from useSceneMotion), and flips to the
 * picture of each new chapter. Pure CSS transforms, no 3D library; frozen under reduced motion.
 */
export function MachineStage({ media }: MachineStageProps) {
  const { t } = useTranslation()
  if (!media) return null

  return (
    <div className="relative flex size-full items-center justify-center [perspective:1400px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(closest-side,black,transparent)]">
        <img alt="" src={media.url} className="journey-backdrop size-full object-cover opacity-30 blur-2xl" />
      </div>
      <div className="journey-card relative w-full max-w-xl">
        <figure key={media.id} className="journey-card-inner overflow-hidden rounded-2xl border border-stellar-border/70 bg-deep-space shadow-2xl shadow-black/60">
          <div className="relative">
            <img src={media.url} alt={media.alt} decoding="async" className="aspect-[4/3] w-full object-cover" />
            <div className="absolute top-2 left-2">
              <DepictionBadge depiction={media.depiction} />
            </div>
          </div>
          <figcaption className="px-3 py-2 text-xs text-moon-dust">
            {media.credit ? t('media.credit', { credit: media.credit }) : t('media.noCredit')} ·{' '}
            <a href={media.pageUrl} target="_blank" rel="noopener noreferrer" className="text-cosmic-indigo hover:underline">
              {t('media.viewOriginal')}
              <span className="sr-only"> {t('media.newTab')}</span>
            </a>
          </figcaption>
        </figure>
      </div>
    </div>
  )
}
