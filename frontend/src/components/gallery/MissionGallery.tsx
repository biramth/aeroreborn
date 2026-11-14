import { useEffect, useId, useState } from 'react'
import { BookOpenText, ListOrdered } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { api } from '@/api/client'
import type { DestinationDetail } from '@/api/types'
import { paths } from '@/app/paths'
import { LoadState } from '@/components/common/LoadState'
import { Reveal } from '@/components/motion/Reveal'
import { MachineJourney } from '@/components/journey/MachineJourney'
import { MissionScene } from '@/components/journey/MissionScene'
import { useApi, type ApiState } from '@/hooks/useApi'
import { useTranslation } from '@/i18n'
import { formatPartialDate } from '@/lib/formatDate'
import { bestStill } from '@/lib/journey'
import { ctaGhost, ctaPrimary, eyebrow } from '@/lib/styles'
import { cn } from '@/lib/utils'
import { MissionTimeline } from './MissionTimeline'

interface MissionGalleryProps {
  state: ApiState<DestinationDetail> & { retry: () => void }
}

/**
 * EQUIP-001 / EQUIP-006: the destination's machines grouped by mission, each mission a
 * scene of the descent (US-5.6). Works on its own, without the map (SYNC-003).
 */
export function MissionGallery({ state }: MissionGalleryProps) {
  const { t } = useTranslation()

  return (
    <section aria-labelledby="missions-title" className="mx-auto max-w-6xl px-5 pb-12">
      <h2 id="missions-title" tabIndex={-1} className="scroll-mt-24 font-heading text-3xl font-bold outline-none sm:text-5xl">
        {t('destination.missionsTitle')}
      </h2>
      {state.status !== 'success' ? (
        <LoadState status={state.status} onRetry={state.retry} variant="cards" className="mt-6" />
      ) : (
        <GalleryContent destination={state.data} />
      )}
    </section>
  )
}

function GalleryContent({ destination }: { destination: DestinationDetail }) {
  const { t } = useTranslation()
  const { hash } = useLocation()

  // The anchor (#mission-…, #machine-… from "Exit story") only exists once the data has
  // arrived, so the browser cannot jump to it by itself: do it now, then focus the target.
  useEffect(() => {
    if (!hash) return
    const target = document.getElementById(decodeURIComponent(hash.slice(1)))
    if (!target) return
    target.scrollIntoView({ block: 'start' })
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
  }, [hash])

  const total = destination.missions.length

  return (
    <>
      <p className="mt-3 max-w-2xl text-moon-dust sm:text-lg">{destination.intro}</p>
      <p className={cn(eyebrow, 'mt-2 text-moon-dust')}>
        {t('destination.missionsCount', { missions: destination.missionCount, machines: destination.machineCount })}
      </p>

      {/* The orbital track: one node per mission along a glowing line. */}
      <div className="relative mt-8 border-l border-world/25 pl-6 sm:pl-10">
        <div aria-hidden="true" className="absolute top-0 bottom-0 -left-px w-px bg-gradient-to-b from-world via-world/30 to-transparent" />
        {destination.missions.map((mission, index) => (
          <MissionSection key={mission.id} mission={mission} number={index + 1} total={total} />
        ))}
      </div>
    </>
  )
}

interface MissionSectionProps {
  mission: DestinationDetail['missions'][number]
  number: number
  total: number
}

function MissionSection({ mission, number, total }: MissionSectionProps) {
  const { t, locale } = useTranslation()
  const [timelineOpen, setTimelineOpen] = useState(false)
  const timelineId = useId()
  const titleId = `mission-${mission.id}-title`
  const period = mission.period?.value
  const padded = String(number).padStart(2, '0')
  // Photos and timeline of the mission feed the scroll journey (mission photo, then each
  // machine in 3D with what it did). Until they arrive, each machine shows its plain card.
  const detail = useApi(`mission:${mission.id}`, (lang, signal) => api.mission(mission.id, lang, signal))
  const missionDetail = detail.status === 'success' ? detail.data : null

  return (
    <section
      id={`mission-${mission.id}`}
      aria-labelledby={titleId}
      className="relative flex min-h-[85dvh] scroll-mt-20 flex-col justify-center py-16 sm:py-24"
    >
      <span
        aria-hidden="true"
        className="absolute top-[4.6rem] -left-[calc(1.5rem+7px)] size-3.5 rounded-full border-2 border-world bg-void shadow-[0_0_16px_var(--world-accent)] sm:top-[6.6rem] sm:-left-[calc(2.5rem+7px)]"
      />
      <span
        aria-hidden="true"
        className="text-outline pointer-events-none absolute top-6 right-0 font-heading text-[30vw] leading-none font-bold select-none sm:text-[13rem]"
      >
        {padded}
      </span>

      <MissionScene cover={missionDetail ? bestStill(missionDetail.media) : undefined}>
      <Reveal>
        <p className={cn(eyebrow, 'text-world')}>
          {t('destination.missionNumber', { number: padded, total: String(total).padStart(2, '0') })}
        </p>
        <h3 id={titleId} tabIndex={-1} className="mt-2 font-heading text-4xl font-bold outline-none sm:text-6xl">
          {mission.name}
        </h3>
        {period && (
          <p className="mt-2 font-mono text-sm text-stellar-cyan">
            {period.end
              ? t('destination.period', { start: formatPartialDate(period.start, locale), end: formatPartialDate(period.end, locale) })
              : t('destination.since', { start: formatPartialDate(period.start, locale) })}
          </p>
        )}
        <p className="mt-4 max-w-3xl text-starlight/90 sm:text-lg">{mission.summary}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          {mission.mainStory && (
            <Link to={paths.story(mission.mainStory.id)} className={ctaPrimary}>
              <BookOpenText aria-hidden="true" className="size-4" />
              {t('destination.readStory', { title: mission.mainStory.title })}
            </Link>
          )}
          <button
            type="button"
            aria-expanded={timelineOpen}
            aria-controls={timelineId}
            onClick={() => setTimelineOpen((v) => !v)}
            className={ctaGhost}
          >
            <ListOrdered aria-hidden="true" className="size-4" />
            {timelineOpen ? t('destination.timelineHide') : t('destination.timelineShow')}
          </button>
        </div>
      </Reveal>
      </MissionScene>

      <div id={timelineId} hidden={!timelineOpen} className="mt-8">
        {timelineOpen && <MissionTimeline missionId={mission.id} />}
      </div>

      <h4 className="sr-only">{t('destination.machinesTitle')}</h4>
      <div className="mt-12 space-y-24">
        {mission.machines.map((machine) => (
          <MachineJourney key={machine.id} machine={machine} mission={missionDetail} story={mission.mainStory} />
        ))}
      </div>
    </section>
  )
}
