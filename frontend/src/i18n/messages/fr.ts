import type { Messages } from '../types'

/** Traduction française de l'interface. Doit fournir exactement les clés de `en`. */
export const fr: Messages = {
  app: {
    name: 'AeroReborn',
    documentTitle: '{page} · AeroReborn',
    skipToContent: 'Aller au contenu',
    disclaimer: 'Projet indépendant, ni affilié à la NASA ni approuvé par elle.',
  },
  nav: {
    label: 'Principale',
    explore: 'Explorer',
    about: 'À propos et sources',
    home: 'AeroReborn — accueil',
  },
  lang: {
    label: 'Langue',
    en: 'English',
    fr: 'Français',
  },
  footer: {
    tagline: 'Lune · Mars — les machines que nous avons laissées',
    sources: 'Toutes les sources',
  },
  explore: {
    title: 'Choisis ta destination',
    intro:
      "Des machines construites par l’humanité sont restées sur ces mondes après la fin de leur mission. Choisis-en un pour découvrir ce qu’elles ont laissé — et ce qu’elles ont transmis.",
    destinationsLabel: 'Destinations',
    eyebrow: 'Un guide de terrain des machines que nous avons laissées',
    scrollHint: 'Fais défiler — les mondes viennent à toi',
    journeyLabel: 'Voyage',
    sceneDeparture: 'Départ',
    sceneMotto: 'Transmission',
    chapter: 'Destination {number}',
    mottoEyebrow: 'Ce qu’elles ont transmis',
    motto: 'Chaque machine a laissé plus qu’une trace : elle a transmis quelque chose.',
    backToStart: 'Revenir au départ',
  },
  bodies: {
    mercury: {
      name: 'Mercure',
      kind: 'Planète tellurique',
      description:
        'Un monde brûlé et criblé de cratères, sans atmosphère pour adoucir le Soleil. Rien n’y a atterri en douceur — seulement des cicatrices d’impact et du silence.',
    },
    venus: {
      name: 'Vénus',
      kind: 'Planète tellurique',
      description:
        'Sous un ciel de dioxyde de carbone écrasant, la chaleur et la pression effacent presque tout. Les sondes ont tenu quelques minutes ; leurs histoires ont tenu des décennies.',
    },
    earth: {
      name: 'Terre',
      kind: 'Monde natal',
      description:
        'Le seul monde que nous connaissions qui ait gardé ses bâtisseurs. Tout ce que les autres ont perdu est encore ici — pour l’instant.',
    },
    moon: {
      name: 'Lune',
      kind: 'Satellite naturel',
      description:
        'Douze humains y ont marché, et leurs empreintes, drapeaux et rovers y sont toujours. La Lune est un musée sans visiteurs.',
    },
    mars: {
      name: 'Mars',
      kind: 'Planète tellurique',
      description:
        'Les rovers et les atterrisseurs ont survécu à leur mission. Quelques-uns répondent encore ; la plupart dorment sous la poussière.',
    },
    asteroids: {
      name: 'Astéroïdes',
      kind: 'Petits corps',
      description:
        'Une archive dispersée des briques du Système solaire — et des vaisseaux que nous avons envoyés à leur rencontre.',
    },
    jupiter: {
      name: 'Jupiter',
      kind: 'Géante gazeuse',
      description:
        'Une géante sans sol où atterrir. Ses tempêtes durent plus longtemps que toutes les machines que nous lui avons envoyées.',
    },
    saturn: {
      name: 'Saturne',
      kind: 'Géante gazeuse',
      description:
        'Des anneaux de glace et de roche, et une lune où une sonde a écouté la vie jusqu’à épuisement de son énergie.',
    },
    uranus: {
      name: 'Uranus',
      kind: 'Géante de glace',
      description:
        'Un monde froid et incliné, visité une fois par Voyager 2, puis laissé seul pendant des décennies.',
    },
    neptune: {
      name: 'Neptune',
      kind: 'Géante de glace',
      description:
        'La planète la plus lointaine, mesurée au passage et retenue dans une poignée d’images.',
    },
    pluto: {
      name: 'Pluton',
      kind: 'Planète naine',
      description:
        'Rétrogradée, puis photographiée de près. New Horizons l’a laissée derrière elle en 2015 et a continué son vol.',
    },
    comets: {
      name: 'Comètes',
      kind: 'Petits corps',
      description:
        'De la glace et de la poussière sur de longues orbites. Nous nous sommes posés sur l’une d’elles — et le harpon est resté.',
    },
  },
  destinations: {
    moon: {
      name: 'Lune',
      cta: 'Explorer la Lune',
      land: 'Se poser sur la Lune',
    },
    mars: {
      name: 'Mars',
      cta: 'Explorer Mars',
      land: 'Se poser sur Mars',
    },
  },
  destination: {
    backToDestinations: 'Retour aux destinations',
    missionsTitle: 'Missions et machines',
    missionsCount: '{missions} missions · {machines} machines',
    jumpToMission: 'Aller à une mission',
    machinesTitle: 'Les machines laissées par cette mission',
    timelineShow: 'Voir la mission étape par étape',
    timelineHide: 'Masquer les étapes',
    timelineTitle: 'Étape par étape',
    readStory: 'Lire le récit : {title}',
    discoverStory: 'Découvrir son histoire',
    location: 'Lieu',
    locationNotMapped: 'Position non cartographiée',
    detailsShow: 'Photos, vidéos et sources',
    detailsHide: 'Masquer les photos et les sources',
    noMedia: 'Pas encore de photo pour cette machine.',
    period: '{start} – {end}',
    since: 'Depuis le {start}',
    journeyLabel: 'Ta descente',
    orbit: 'Orbite',
    scrollHint: 'Fais défiler — descends vers la surface',
    statMissions: 'missions',
    statMachines: 'machines laissées sur place',
    missionNumber: 'Mission {number} / {total}',
    nextWorld: 'Monde suivant',
    nextWorldTitle: 'Le voyage continue',
  },
  journey: {
    anotherLook: 'Un autre regard',
  },
  machineType: {
    lander: 'Atterrisseur',
    rover: 'Rover',
    'descent-stage': 'Étage de descente du module lunaire',
    experiment: 'Instrument scientifique',
    helicopter: 'Hélicoptère',
    impactor: 'Impacteur',
    other: 'Machine',
  },
  dateLabel: {
    landing: 'Atterrissage',
    deployment: 'Installation',
    impact: 'Impact',
    'last-contact': 'Dernier contact',
  },
  status: {
    label: 'Statut',
    operational: 'Fonctionne encore',
    'contact-lost': 'Contact perdu',
    inactive: 'Inactif, toujours sur place',
    'mission-ended': 'Mission terminée',
    unknown: 'Statut non confirmé',
  },
  depiction: {
    photo: 'Photo',
    artwork: 'Vue d’artiste — pas une photo',
    simulation: 'Image de synthèse — pas une photo',
    diagram: 'Schéma ou carte',
    mixed: 'Contient des animations',
    document: 'Document',
  },
  voice: {
    data: 'Fait',
    interpretation: 'Ce que ça veut dire',
    imagination: 'Imagine',
  },
  media: {
    credit: 'Crédit : {credit}',
    noCredit: 'Crédit non indiqué sur la page source',
    viewOriginal: 'Voir sur la page de la NASA',
    newTab: '(s’ouvre dans un nouvel onglet)',
    openVideo: 'Regarder la vidéo',
    open3d: 'Ouvrir le modèle 3D',
    openDocument: 'Ouvrir le document',
    videoUnsupported: 'Ton navigateur ne peut pas lire cette vidéo.',
    unavailable: 'Cette image ne peut pas s’afficher pour le moment. La page de la NASA ci-dessous la propose toujours.',
  },
  sources: {
    title: 'Sources',
    count: 'Sources ({count})',
    accessedOn: 'Consultée le {date}',
    publishedOn: 'Publiée le {date}',
  },
  loading: {
    message: 'Chargement…',
    errorTitle: 'Ce contenu n’a pas pu être chargé.',
    errorHint: 'Le serveur d’AeroReborn n’a pas répondu. Vérifie qu’il est lancé, puis réessaie.',
    retry: 'Réessayer',
    signalLost: 'Signal perdu',
  },
  story: {
    title: 'Récit',
    unavailable: 'Le récit « {storyId} » n’est pas encore disponible.',
    exit: 'Quitter le récit',
    progressLabel: 'Étapes du récit',
    stepOf: 'Étape {current} sur {total}',
    previous: 'Étape précédente',
    next: 'Étape suivante',
    previousShort: 'Précédente',
    nextShort: 'Suivante',
    begin: 'Commencer le récit',
    scrollHint: 'Fais défiler pour suivre le signal',
    keyboardHint: 'Astuce : les touches ← et → changent d’étape.',
    completeEyebrow: 'Transmission terminée',
    draftNotice: 'Ce récit est encore en cours de vérification par notre équipe : certains détails peuvent changer.',
    relationsTitle: 'Ce qui a été transmis',
    evidence: 'Comment on le sait :',
    finishTitle: 'Continuer l’exploration',
    backToDestination: 'Retour aux machines : {destination}',
    exploreOther: 'Explorer : {destination}',
    missionsTitle: 'Les missions de ce récit',
    machinesTitle: 'Les machines de ce récit',
  },
  relations: {
    from: 'De',
    to: 'vers',
  },
  about: {
    title: 'À propos et sources',
    eyebrow: 'Dossier de mission',
    creditsTitle: 'Crédits',
    sourcesTitle: 'Sources',
    sourcesIntro: 'Chaque fait affiché sur AeroReborn provient de l’une de ces sources.',
    aiTitle: 'Utilisation de l’IA',
    comingSoon: 'Cette section sera complétée avant la mise en ligne.',
    imagesCredit:
      'Les photographies des planètes et des petits corps proviennent des ressources d’images du NSSDCA de la NASA et font partie du domaine public.',
    imagesSourceLabel: 'Ressources d’images du NSSDCA',
  },
  notFound: {
    title: 'Page introuvable',
    eyebrow: 'Erreur 404 · Perdu dans l’espace',
    message: 'Cette page n’existe pas ou a été déplacée.',
    backHome: 'Retour à l’accueil',
  },
  error: {
    title: 'Une erreur est survenue',
    message: 'Une erreur inattendue s’est produite. Reviens en arrière et réessaie.',
  },
}
