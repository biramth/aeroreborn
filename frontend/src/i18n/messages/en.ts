/**
 * English UI strings — source dictionary. Every other locale must provide the same keys
 * (enforced by the `Messages` type). Scientific content lives in content/, not here.
 * Placeholders use {name} syntax.
 */
export const en = {
  app: {
    name: 'AeroReborn',
    documentTitle: '{page} · AeroReborn',
    skipToContent: 'Skip to content',
    disclaimer: 'Independent project, not affiliated with or endorsed by NASA.',
  },
  nav: {
    label: 'Main',
    explore: 'Explore',
    about: 'About & Sources',
    home: 'AeroReborn — home',
  },
  lang: {
    label: 'Language',
    en: 'English',
    fr: 'Français',
  },
  footer: {
    tagline: 'Moon · Mars — the machines we left behind',
    sources: 'All sources',
  },
  explore: {
    title: 'Choose your destination',
    intro:
      'Human-made machines stayed behind on these worlds after their missions ended. Pick one to discover what they left — and what they passed on.',
    destinationsLabel: 'Destinations',
    eyebrow: 'A field guide to the machines we left behind',
    scrollHint: 'Scroll — the worlds come to you',
    journeyLabel: 'Journey',
    sceneDeparture: 'Departure',
    sceneMotto: 'Transmission',
    chapter: 'Destination {number}',
    mottoEyebrow: 'What they passed on',
    motto: 'Every machine left more than a trace: it passed something on.',
    backToStart: 'Back to the start',
  },
  bodies: {
    mercury: {
      name: 'Mercury',
      kind: 'Terrestrial planet',
      description:
        'A scorched, cratered world with almost no atmosphere to soften the Sun. Nothing has landed softly here — only impact scars and silence.',
    },
    venus: {
      name: 'Venus',
      kind: 'Terrestrial planet',
      description:
        'Under a crushing carbon-dioxide sky, heat and pressure erase almost everything. Probes lasted minutes; their stories lasted decades.',
    },
    earth: {
      name: 'Earth',
      kind: 'Home world',
      description:
        'The only world we know that kept its makers. Everything the others lost is still here — for now.',
    },
    moon: {
      name: 'Moon',
      kind: 'Natural satellite',
      description:
        'Twelve humans walked here, and their footprints, flags and rovers remain. The Moon is a museum with no visitors.',
    },
    mars: {
      name: 'Mars',
      kind: 'Terrestrial planet',
      description:
        'Rovers and landers outlived their missions. A few still answer; most sleep under the dust.',
    },
    asteroids: {
      name: 'Asteroids',
      kind: 'Small bodies',
      description:
        'A scattered archive of the Solar System’s building blocks — plus the spacecraft we sent to meet them.',
    },
    jupiter: {
      name: 'Jupiter',
      kind: 'Gas giant',
      description:
        'A giant with no ground to land on. Its storms outlast every machine we have ever sent.',
    },
    saturn: {
      name: 'Saturn',
      kind: 'Gas giant',
      description:
        'Rings of ice and rock, and a moon where a probe listened for life until its power ran out.',
    },
    uranus: {
      name: 'Uranus',
      kind: 'Ice giant',
      description:
        'A cold, tilted world visited once by Voyager 2, then left alone for decades.',
    },
    neptune: {
      name: 'Neptune',
      kind: 'Ice giant',
      description:
        'The farthest planet, measured in passing and remembered in a handful of frames.',
    },
    pluto: {
      name: 'Pluto',
      kind: 'Dwarf planet',
      description:
        'Demoted, then photographed up close. New Horizons left it behind in 2015 and kept flying.',
    },
    comets: {
      name: 'Comets',
      kind: 'Small bodies',
      description:
        'Ice and dust on long orbits. We have landed on one — and the harpoon stayed.',
    },
  },
  destinations: {
    moon: {
      name: 'Moon',
      cta: 'Explore the Moon',
      land: 'Land on the Moon',
    },
    mars: {
      name: 'Mars',
      cta: 'Explore Mars',
      land: 'Land on Mars',
    },
  },
  destination: {
    backToDestinations: 'Back to destinations',
    missionsTitle: 'Missions and machines',
    missionsCount: '{missions} missions · {machines} machines',
    jumpToMission: 'Jump to a mission',
    machinesTitle: 'Machines left by this mission',
    timelineShow: 'Show the mission step by step',
    timelineHide: 'Hide the steps',
    timelineTitle: 'Step by step',
    readStory: 'Read the story: {title}',
    discoverStory: 'Discover its story',
    location: 'Location',
    locationNotMapped: 'Location not mapped',
    detailsShow: 'Photos, videos and sources',
    detailsHide: 'Hide photos and sources',
    noMedia: 'No photo available for this machine yet.',
    period: '{start} – {end}',
    since: 'Since {start}',
    journeyLabel: 'Your descent',
    orbit: 'Orbit',
    scrollHint: 'Scroll — descend toward the surface',
    statMissions: 'missions',
    statMachines: 'machines left behind',
    missionNumber: 'Mission {number} / {total}',
    nextWorld: 'Next world',
    nextWorldTitle: 'The journey continues',
  },
  journey: {
    anotherLook: 'Another look',
  },
  machineType: {
    lander: 'Lander',
    rover: 'Rover',
    'descent-stage': 'Lunar Module descent stage',
    experiment: 'Science instrument',
    helicopter: 'Helicopter',
    impactor: 'Impactor',
    other: 'Machine',
  },
  dateLabel: {
    landing: 'Landed',
    deployment: 'Set up',
    impact: 'Impact',
    'last-contact': 'Last contact',
  },
  status: {
    label: 'Status',
    operational: 'Still working',
    'contact-lost': 'Contact lost',
    inactive: 'Inactive, still in place',
    'mission-ended': 'Mission ended',
    unknown: 'Status not confirmed',
  },
  depiction: {
    photo: 'Photo',
    artwork: 'Artist’s view — not a photo',
    simulation: 'Computer image — not a photo',
    diagram: 'Diagram or map',
    mixed: 'Contains animation',
    document: 'Document',
  },
  voice: {
    data: 'Fact',
    interpretation: 'What it means',
    imagination: 'Imagine',
  },
  media: {
    credit: 'Credit: {credit}',
    noCredit: 'Credit not shown on the source page',
    viewOriginal: 'See it on the NASA page',
    newTab: '(opens in a new tab)',
    openVideo: 'Watch the video',
    open3d: 'Open the 3D model',
    openDocument: 'Open the document',
    videoUnsupported: 'Your browser cannot play this video.',
    unavailable: 'This image cannot be shown right now. The NASA page below still has it.',
  },
  sources: {
    title: 'Sources',
    count: 'Sources ({count})',
    accessedOn: 'Consulted on {date}',
    publishedOn: 'Published on {date}',
  },
  loading: {
    message: 'Loading…',
    errorTitle: 'This content could not be loaded.',
    errorHint: 'The AeroReborn server did not answer. Make sure it is running, then try again.',
    retry: 'Try again',
    signalLost: 'Signal lost',
  },
  story: {
    title: 'Story',
    unavailable: 'The story “{storyId}” is not available yet.',
    exit: 'Exit story',
    progressLabel: 'Story steps',
    stepOf: 'Step {current} of {total}',
    previous: 'Previous step',
    next: 'Next step',
    previousShort: 'Previous',
    nextShort: 'Next',
    begin: 'Start the story',
    scrollHint: 'Scroll to follow the signal',
    keyboardHint: 'Tip: the ← and → keys change step.',
    completeEyebrow: 'Transmission complete',
    draftNotice: 'This story is still being checked by our team: some details may change.',
    relationsTitle: 'What was passed on',
    evidence: 'How we know:',
    finishTitle: 'Keep exploring',
    backToDestination: 'Back to the machines of {destination}',
    exploreOther: 'Explore {destination}',
    missionsTitle: 'The missions of this story',
    machinesTitle: 'The machines of this story',
  },
  relations: {
    from: 'From',
    to: 'to',
  },
  about: {
    title: 'About & Sources',
    eyebrow: 'Mission dossier',
    creditsTitle: 'Credits',
    sourcesTitle: 'Sources',
    sourcesIntro: 'Every fact shown on AeroReborn comes from one of these sources.',
    aiTitle: 'Use of AI',
    comingSoon: 'This section will be completed before release.',
    imagesCredit:
      'Planet and small-body photographs come from the NASA NSSDCA Image Resources and are in the public domain.',
    imagesSourceLabel: 'NSSDCA Image Resources',
  },
  notFound: {
    title: 'Page not found',
    eyebrow: 'Error 404 · Lost in space',
    message: 'This page does not exist or has moved.',
    backHome: 'Back to home',
  },
  error: {
    title: 'Something went wrong',
    message: 'An unexpected error occurred. Please go back and try again.',
  },
} as const
