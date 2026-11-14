# Parcours scrollé mission → machine (page destination)

- **Statut** : review
- **Epic** : E3 — Explorer les équipements
- **Priorité** : P2 dans SCOPE (animations scroll avancées). **Réalisé sur demande écrite de l'équipe (session du 2026-11-14)**, à acter dans SCOPE.md par le PO, comme pour US-2.1.
- **Exigences PRD** : EXPL-001, EQUIP-001/002, MEDIA-001, TIMELINE-001, NFR-A11Y-001/006, NFR-RESP-001
- **Décisions liées** : ADR-007 (pas de librairie), ADR-017 (médias par URL), ADR-018 (accueil immersif, même technique). Aucune dépendance ajoutée.
- **Branche** : `claude/storytelling-missions-images-kapdgm`, repartie de `main` (`5e81bb9`) après la fusion de #8.

## Demande de l'équipe

« Quand on arrive sur une mission, la mission s'affiche (description, photo de la mission). En scrollant, la machine apparaît avec sa description : elle passe de la gauche vers la droite, en arrière-plan, en 3D, elle tourne. En continuant, d'autres images de la machine avec l'explication correspondante : ce qu'elle faisait, ce qu'elle permet. »

Choix validés le 2026-11-14 :
- parcours **sur la page destination** ;
- **faux 3D CSS** pour toutes les machines, plus les modèles 3D NASA quand ils existent (voir « Écart » ci-dessous) ;
- textes tirés du **contenu sourcé existant**, sans fait nouveau ;
- **photo réelle** de la mission, pas d'écusson (risque de logo NASA).

## Réalisation

- **`components/journey/MissionScene.tsx`** : la meilleure photo réelle de la mission en fond. Elle se rapproche doucement au scroll (`--progress`). Le nom, la période, le résumé et les actions sont par-dessus. Crédit et badge de nature restent visibles.
- **`components/journey/MachineJourney.tsx`** : une scène par machine.
  - À gauche, une **scène sticky** (`MachineStage`) montre la photo de la machine dans un espace en perspective. Elle entre depuis la gauche et du fond (`--enter`), tourne pendant le défilement (`--spin`, rotation Y et X), puis sort vers la droite (`--exit`). À chaque chapitre, la photo se retourne (`journey-flip`) pour montrer l'image du chapitre.
  - À droite, le texte qui défile : d'abord la fiche existante (`MachineCard` : type, date, statut, lieu, résumé scientifique, note de statut, `?machine=`, sources, récit), puis **les chapitres « ce qu'elle a fait »**.
- **`lib/journey.ts`** (fonctions pures, testées) :
  - les chapitres sont les **étapes de la frise de la mission dont les images montrent la machine** : date sourcée, titre, explication simple, photo ;
  - sans étape correspondante, d'autres photos de la machine sont affichées, décrites par leur texte alternatif ;
  - une vraie photo est toujours préférée à une vue d'artiste.
- **`components/journey/useSceneMotion.ts`** : écrit les variables CSS via l'écouteur de scroll partagé (`useScrollFrame`), sans re-rendu React.
- **Image affichée** : elle suit le chapitre qui traverse le milieu de l'écran (`IntersectionObserver`).
- **Mobile** : la scène reste en haut (44 vh) et le texte défile dans la moitié basse.
- **Mouvement réduit** : aucune transformation ni animation ; chaque image s'affiche dans son étape, dans le flux normal.
- **Chargement de la frise** : la fiche reste à la même place dans l'arbre React. Elle n'est jamais remontée, et le focus n'est pas perdu.
- **`DestinationPage`** : `overflow-hidden` devient `overflow-x-clip`. L'ancienne valeur faisait de la page un conteneur de défilement et empêchait les éléments sticky.

## Fusion avec US-5.6 (2026-11-14)

`main` a reçu entre-temps US-5.6 (#9 : destination en défilement continu, planète épinglée, rail, scène « monde suivant »). La fusion a donné des conflits sur `DestinationPage.tsx` et `MissionGallery.tsx`. Résolution par merge, sans rebase ni push forcé :
- **US-5.6 conservée telle quelle** : planète épinglée, rail, numéro de mission, frise orbitale, boutons.
- **Ajouts par-dessus** :
  - le texte de la scène de mission de US-5.6 s'affiche sur la photo de la mission (`MissionScene`) ;
  - la grille de cartes machines est remplacée par le parcours `MachineJourney`, une scène par machine ;
  - `overflow-x-clip` sur le conteneur de la page, pour que l'entrée de la machine depuis la gauche ne crée pas de défilement horizontal.
- **Après fusion** :
  - frontend : typecheck OK, lint 0 erreur (2 avertissements préexistants), **45 tests passés** ;
  - navigateur 1440 et 360 px, 5 positions de défilement : variables d'animation correctes, aucun défilement horizontal.

## Écart : modèles 3D NASA retirés

Testés dans le navigateur, les deux modèles 3D du contenu ne fonctionnent pas :
- **`ingenuity-3d-model`** (`https://mars.nasa.gov/gltf_embed/25043`) répond par une **page 404 NASA qui affiche le logo NASA**, interdit par CLAUDE.md §7.
- **`mer-3d-model`** (`solarsystem.nasa.gov/gltf_embed/2370`) : domaine retiré par la NASA (redirigé), non vérifiable depuis l'environnement de l'agent.

Le bouton « La faire tourner en 3D » n'est donc **pas livré**. Pour l'ajouter proprement plus tard, il faudrait :
1. que la piste contenu remplace ces URL par les fichiers `.glb` des « 3D Resources » NASA (licence vérifiée) ;
2. un afficheur de modèle sans page NASA autour, par exemple `<model-viewer>`, ce qui est une nouvelle dépendance à justifier dans une ADR et à faire valider.

## Vérification (Verify) — sorties réelles du 2026-11-14

| Contrôle | Commande / méthode | Résultat réel |
|---|---|---|
| G1 lint | `npm run lint` | 0 erreur, 2 avertissements déjà présents sur `main` (`button.tsx`, `<video>` sans sous-titres) |
| G2 typecheck | `npm run typecheck` | OK (front, back) |
| G3 test | `npm test` | front : 5 fichiers, 42 tests passés, dont 4 pour `lib/journey.ts` et 2 pour le parcours ; stable sur 3 exécutions · back : 44 tests passés (inchangé) |
| G4 build | `npm run build` | OK (JS 429 kB, 134 kB gzip) |
| Navigateur, animations actives | Playwright, vrai backend, `/explore/mars`, 1440 × 900 et 360 × 740, 5 positions de scroll (mission, entrée, scène, chapitre, sortie) | Variables mesurées : `--enter` de 0,94 à 1, `--spin` jusqu'à −10°, `--exit` 0,36 en sortie ; aucun défilement horizontal ; aucune erreur de page |
| Mouvement réduit | Test automatisé | Images dans les étapes, pas de scène animée |
| Fluidité sur mobile bas de gamme, Safari et Firefox | — | **Non vérifiés** |
| Lecteur d'écran | — | **Non exécuté** |

## Points ouverts

- **SCOPE** : le PO doit acter la réalisation de cette animation P2 dans SCOPE.md.
- **Durée des animations** : elle dépasse la règle DESIGN_SYSTEM (≤ 200 ms). Le retournement dure 520 ms et les mouvements suivent le scroll. C'est le même écart que pour US-2.1, à valider.
- **Piste contenu** : URL des modèles 3D à corriger (voir « Écart »).
- **Personnes sur les photos** : certaines photos du contenu montrent des personnes à l'arrière-plan (ex. essais d'airbags MER). Il faut vérifier l'absence de mineurs (CLAUDE.md §7).
