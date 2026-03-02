## Exercice : Duel Smash (Vue 3 + Vue Router + Pinia + API)

### 1. Contexte

Vous allez réaliser une application web **« Duel Smash »** en **Vue 3** qui permet de choisir deux combattants issus du jeu **Super Smash Bros. Ultimate** (via une API publique) et de les faire s’affronter dans un **duel tour par tour**.

L’objectif est d’utiliser une **API REST** réelle pour récupérer des personnages, puis de coder vous‑même une **logique de combat simplifiée** dans le front, en structurant le projet avec **Vue Router** et **Pinia**.

---

### 2. Objectifs pédagogiques

- **Consommer une API REST** depuis une application Vue (fetch / Axios).
- Manipuler et afficher des **données distantes** (liste, détail).
- Gérer l’**état global** avec **Pinia** (combattants sélectionnés, stats, journal de combat…).
- Implémenter une **logique métier** simple (calcul de dégâts, tours).
- Structurer un projet Vue avec plusieurs **composants réutilisables** et un **routing** clair (Vue Router).

---

### 3. API à utiliser

**Super Smash Bros. Ultimate API (non officielle)**  
Base URL : `https://super-smash-bros-ultimate-api.onrender.com/api`

**Endpoints utiles** :

- **Tous les personnages**  
  - `GET /characters`  
  - Exemple :  
    - `https://super-smash-bros-ultimate-api.onrender.com/api/characters`

- **Personnage par id (fighterNumber)**  
  - `GET /characters/:id`  
  - Exemple :  
    - `https://super-smash-bros-ultimate-api.onrender.com/api/characters/1`

- **Personnage par nom**  
  - `GET /characters/name/:name`  
  - Exemple :  
    - `https://super-smash-bros-ultimate-api.onrender.com/api/characters/name/Mario`

Chaque personnage contient au minimum (selon la version de l’API) :

- `name`  
- `series.name`  
- `images` (dont `fullImage`, `bannerImage`, `iconImage`)  
- `fighterNumber`  
- `description`  
- `dlcCharacter` (booléen)

> **Remarque** : l’API peut être un peu lente au premier appel (hébergement gratuit). Affichez un **loader** pendant le chargement.

---

### 4. Fonctionnalités à implémenter

#### 4.1. Routing avec Vue Router

L’application doit utiliser **Vue Router** avec au minimum les routes suivantes :

- `/select` : **page de sélection** des combattants.
- `/battle` : **page de combat**.
- (Optionnel, bonus) `/` redirige vers `/select` ou affiche une page d’accueil très simple.
- (Optionnel, bonus) `/history` pour afficher l’historique des duels (stocké dans Pinia).

Contraintes :

- La navigation doit se faire avec des `<router-link>` (menu, boutons, etc.).
- Le passage de la sélection à la page de combat se fait **sans repasser par l’API** (les combattants sont stockés dans Pinia).

#### 4.2. Gestion de l’état avec Pinia

Vous devez créer au minimum **un store Pinia** (par exemple `useBattleStore`) qui gère :

- La **liste des personnages** chargés depuis l’API (ou un second store `useCharactersStore` si vous préférez séparer).
- Les **deux combattants sélectionnés** :
  - `fighterA`, `fighterB`.
- Les **stats dérivées** associées à ces combattants (HP max, attaque, défense, vitesse), ou bien les HP actuels.
- Le **journal de combat** (liste de messages texte).
- Le **vainqueur** du combat (ou une valeur `null` si le combat est en cours).

Fonctionnalités du store :

- Actions pour :
  - Charger les personnages depuis l’API (avec gestion du loading / error).
  - Sélectionner les combattants A et B.
  - Initialiser un nouveau combat (HP remis au max, tour courant défini).
  - Jouer un **tour de combat** (calcul des dégâts, mise à jour des HP, ajout au journal, détection du vainqueur).
  - Réinitialiser / rejouer un duel.

L’**état du combat** (HP, tour courant, journal, vainqueur) doit être **centralisé dans Pinia** et utilisé par les composants via le store.

#### 4.3. Écran de sélection des combattants (`/select`)

- Récupérer et afficher **la liste des personnages** depuis l’API (en utilisant une action du store Pinia).
- L’utilisateur doit pouvoir **choisir 2 combattants** :
  - Soit via **2 listes déroulantes** (select 1 pour le joueur A, select 2 pour le joueur B).
  - Soit via des **cartes cliquables** (sélection de A puis de B).
- Pour chaque personnage dans la liste, afficher au minimum :
  - Une image (par exemple `images.fullImage` ou `images.bannerImage`),
  - Le `name`,
  - Le `series.name`.
- Une fois les 2 combattants sélectionnés :
  - Appeler une action du store pour **enregistrer** A et B + initialiser les stats,
  - Rediriger vers la page `/battle` via `router.push('/battle')`.

#### 4.4. Modélisation des stats de combat (simplifiées)

L’API ne fournit pas de vraies stats chiffrées, vous devez les **dériver** à partir des données disponibles.

Pour chaque combattant, vous devez calculer au minimum :

- **HP (points de vie max)**  
  Exemple de règle (vous pouvez l’adapter, mais documentez-la) :  
  `hpMax = 100 + (Number(fighterNumber) % 50)`

- **Attaque**  
  Exemple :  
  `attaque = 20 + (name.length % 15)`

- **Défense**  
  Exemple :  
  `defense = 10 + (series.name.length % 10)`

- **Vitesse** (sert à déterminer qui commence)  
  Exemple :  
  `vitesse = 5 + (nombre de voyelles dans le name)`

Contraintes sur vos règles :

- Elles doivent être **déterministes** (même perso → mêmes stats).
- Elles doivent être **simples à comprendre et expliquer**.
- Elles doivent être **raisonnables** (éviter qu’un seul coup tue toujours l’adversaire).

Vous expliquerez brièvement vos règles dans le `README.md`.

#### 4.5. Logique de combat (page `/battle`)

- Le combat est **tour par tour**.
- Le combattant qui a la **vitesse la plus élevée** commence.  
  En cas d’égalité, vous pouvez choisir arbitrairement (ex. joueur A commence).

À chaque tour (logique implémentée dans une **action Pinia**, pas dans le composant directement) :

1. Un combattant est **attaquant**, l’autre est **défenseur**.
2. On calcule les **dégâts** infligés, par exemple :

   \[
   \text{dégâts} = \max\big(1,\ \text{attaque\_attaquant} - \frac{\text{defense\_défenseur}}{2}\big)
   \]

3. On décrémente les **HP** du défenseur.
4. On enregistre dans le **journal de combat** une phrase du type :  
   « Mario attaque Link et inflige 12 dégâts. Link a 78 HP restants. »
5. On **change de tour**.

Le combat s’arrête lorsque :

- L’un des combattants atteint **0 HP ou moins**.

On met à jour dans le store Pinia le **vainqueur** (nom du personnage).  
La page de combat affiche alors un message de **victoire** :

- « Victoire de Mario ! »

Un bouton **« Rejouer le duel »** doit :

- Appeler une action du store pour réinitialiser les HP, le tour courant et le journal,
- Optionnel : permettre de revenir à `/select` pour changer de combattants.

#### 4.6. Interface utilisateur

Composants minimum :

- `CharacterCard` (fiche personnage) :
  - Image + nom + série + éventuellement aperçu des stats dérivées.
- `CharacterSelector` (vue ou composant principal de `/select`) :
  - Utilise les données du store Pinia pour afficher la liste,
  - Gère la sélection des 2 combattants.
- `BattleArena` (vue ou composant principal de `/battle`) :
  - Affiche les 2 combattants face à face,
  - Affiche leurs **HP actuels** (barres de vie ou valeurs numériques),
  - Bouton **« Tour suivant »** qui déclenche l’action Pinia qui joue un tour,
  - Journal de combat (liste des messages),
  - Message de victoire.

UX attendue :

- **Loader** visible pendant les appels API (au moins sur le chargement initial de la liste).
- **Messages d’erreur** si l’API ne répond pas.
- Boutons **« Lancer le duel »**, **« Tour suivant »**, **« Rejouer »** fonctionnels et clairs.
- Navigation visible (par exemple une barre de navigation avec liens `/select` et `/battle`).

---

### 5. Contraintes techniques

- **Framework** : Vue 3.
- **Obligatoire** :
  - **Vue Router** (au moins `/select` et `/battle`),
  - **Pinia** (au moins un store pour le combat).
- **Organisation minimale** :
  - `App.vue` comme racine,
  - `router/index.js` ou `router/index.ts` pour déclarer les routes,
  - `stores/` pour Pinia (`useBattleStore`, etc.),
  - `views/` pour les vues routées (`SelectView`, `BattleView`, …),
  - `components/` pour les composants réutilisables (`CharacterCard`, etc.).
- **Appels HTTP** :
  - Avec **Axios** ou `fetch`,
  - Logique de chargement dans le store Pinia (ou dans un composable), pas dupliquée dans plusieurs composants.
- **Logique métier** :
  - Calcul des stats et des dégâts factorisé (store ou utilitaire),
  - Pas de duplication de la logique de combat dans plusieurs composants.

---

### 6. Livrables

Vous devez fournir :

- Le **code source complet** du projet Vue (idéalement dans un dépôt Git).
- Un fichier **`README.md`** contenant :
  - Les **instructions d’installation** et de lancement (`npm install`, `npm run dev`, etc.),
  - Une **description rapide des règles de combat** (HP, attaque, défense, vitesse, dégâts, qui commence),
  - Une mention de l’architecture (usage de Vue Router et Pinia : quelles pages, quels stores).

L’application doit **se lancer et fonctionner** sans modification côté correcteur (hormis l’installation des dépendances).

---

### 7. Barème indicatif (sur 30 points)

- **Structure du projet & composants ( /6)**  
  - Composants clairs, bien nommés et réutilisables,  
  - Dossiers organisés (`views`, `components`, `stores`, `router`).

- **Vue Router ( /5)**  
  - Routes correctement déclarées (`/select`, `/battle` au minimum),  
  - Navigation fluide entre les pages,  
  - Utilisation de `<router-link>` et de `router.push`.

- **Pinia & gestion d’état ( /7)**  
  - Store(s) bien conçu(s),  
  - État global cohérent (sélection, combat, journal),  
  - Actions propres (chargement API, sélection, tour de combat, reset).

- **Logique de combat ( /6)**  
  - Règles cohérentes et documentées,  
  - Gestion correcte des tours, des HP, de la victoire,  
  - Journal de combat lisible et mis à jour à chaque tour.

- **Interface & UX ( /4)**  
  - Sélection des combattants claire,  
  - Affichage correct des stats et des HP,  
  - Loader et messages d’erreur.

- **Qualité du code & README ( /2)**  
  - Code lisible (indentation, nommage),  
  - README clair.

- **Bonus (jusqu’à +2 points)**  
  - Page d’accueil ou historique des duels,  
  - Animations / habillage Smash,  
  - Sons, thème sombre/clair, etc.

---

Fin de l’énoncé.
