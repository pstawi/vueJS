// Données mock pour les articles du blog
export const articles = [
  {
    id: 1,
    titre: 'Introduction à Vue.js 3',
    resume: 'Découvrez les bases de Vue.js 3, le framework JavaScript progressif.',
    contenu: `Vue.js 3 est un framework JavaScript progressif pour construire des interfaces utilisateur. Contrairement à d'autres frameworks monolithiques, Vue a été conçu dès le départ pour être adopté de manière incrémentale.

La bibliothèque principale se concentre uniquement sur la couche vue, et il est facile de l'intégrer avec d'autres bibliothèques ou projets existants. D'un autre côté, Vue est également parfaitement capable de faire fonctionner des applications web monopages sophistiquées lorsqu'il est combiné avec des outils modernes et des bibliothèques de support.

Nouveautés de Vue 3 :
- Composition API : Une nouvelle façon d'organiser la logique
- Performance améliorée : Jusqu'à 2x plus rapide
- TypeScript : Support natif amélioré
- Fragments : Plusieurs éléments racine possibles
- Teleport : Rendre du contenu hors du composant parent
- Suspense : Gestion du chargement asynchrone`,
    auteur: 'Marie Dubois',
    date: '2024-01-15',
    categorie: 'Tutoriel',
    image: 'https://via.placeholder.com/800x400/667eea/ffffff?text=Vue.js+3',
    vues: 1250,
    likes: 89
  },
  {
    id: 2,
    titre: 'Vue Router : Le guide complet',
    resume: 'Maîtrisez le routage dans vos applications Vue.js avec Vue Router.',
    contenu: `Vue Router est le routeur officiel pour Vue.js. Il s'intègre profondément avec le cœur de Vue.js pour faciliter la création d'applications monopages avec Vue.js.

Les fonctionnalités incluent :
- Correspondance de routes imbriquées
- Configuration modulaire basée sur les composants
- Paramètres de route, query, wildcards
- Vue propulsée par le système de transition de Vue.js
- Contrôle de navigation fin
- Liens avec classes CSS actives automatiques
- Mode historique HTML5 ou mode hash, avec repli automatique dans IE9
- Comportement de défilement personnalisable

Le routage est essentiel pour créer des applications web modernes. Il permet de créer des URLs propres, de gérer l'historique du navigateur et d'organiser votre application en différentes vues.`,
    auteur: 'Thomas Martin',
    date: '2024-01-20',
    categorie: 'Tutoriel',
    image: 'https://via.placeholder.com/800x400/764ba2/ffffff?text=Vue+Router',
    vues: 980,
    likes: 67
  },
  {
    id: 3,
    titre: 'Composition API vs Options API',
    resume: 'Quelle API choisir pour vos projets Vue.js ? Comparaison détaillée.',
    contenu: `La Composition API est une nouvelle façon d'écrire des composants Vue, introduite dans Vue 3. Elle offre une alternative à l'Options API traditionnelle.

Options API :
- Approche familière et simple
- Organisation par type (data, methods, computed)
- Parfait pour les débutants
- Bien pour les petits composants

Composition API :
- Meilleure organisation de la logique
- Réutilisabilité via composables
- Meilleur support TypeScript
- Plus flexible pour les grands projets

Les deux APIs sont valides et coexistent dans Vue 3. Le choix dépend de vos préférences et du contexte du projet. Pour les nouveaux projets, la Composition API est recommandée, mais l'Options API reste parfaitement viable.`,
    auteur: 'Sophie Bernard',
    date: '2024-01-25',
    categorie: 'Comparaison',
    image: 'https://via.placeholder.com/800x400/2ecc71/ffffff?text=Composition+API',
    vues: 1450,
    likes: 112
  },
  {
    id: 4,
    titre: 'Gestion d\'état avec Pinia',
    resume: 'Découvrez Pinia, le nouveau gestionnaire d\'état officiel pour Vue.js.',
    contenu: `Pinia est le gestionnaire d'état officiel pour Vue.js. Il remplace Vuex en tant que solution recommandée et offre une API plus simple et intuitive.

Avantages de Pinia :
- API simple et intuitive
- Support TypeScript excellent
- DevTools intégrés
- Hot module replacement
- Plugins et extensibilité
- Taille minimale (~1kb)

Pinia est construit sur la Composition API et offre une expérience de développement moderne. Il est parfait pour gérer l'état global de votre application : authentification, panier, préférences utilisateur, etc.

La migration depuis Vuex est simple et Pinia peut coexister avec Vuex si nécessaire, permettant une migration progressive.`,
    auteur: 'Lucas Petit',
    date: '2024-02-01',
    categorie: 'State Management',
    image: 'https://via.placeholder.com/800x400/f39c12/ffffff?text=Pinia',
    vues: 876,
    likes: 54
  },
  {
    id: 5,
    titre: 'Optimiser les performances Vue.js',
    resume: 'Techniques et astuces pour améliorer les performances de vos applications.',
    contenu: `Les performances sont cruciales pour offrir une bonne expérience utilisateur. Voici quelques techniques pour optimiser vos applications Vue.js.

1. Lazy Loading des Routes :
Chargez les composants uniquement quand nécessaire avec le dynamic import.

2. Computed Properties :
Utilisez computed au lieu de methods pour bénéficier du cache.

3. v-show vs v-if :
Utilisez v-show pour des toggles fréquents, v-if pour des conditions rares.

4. Virtual Scrolling :
Pour les longues listes, utilisez le virtual scrolling.

5. Debounce et Throttle :
Limitez les appels de fonctions coûteuses.

6. Bundle Optimization :
Utilisez Vite pour un bundling optimal et le tree-shaking.

Ces optimisations peuvent significativement améliorer les performances de votre application.`,
    auteur: 'Emma Rousseau',
    date: '2024-02-05',
    categorie: 'Performance',
    image: 'https://via.placeholder.com/800x400/e74c3c/ffffff?text=Performance',
    vues: 1123,
    likes: 78
  },
  {
    id: 6,
    titre: 'Tests unitaires avec Vitest',
    resume: 'Apprenez à tester vos composants Vue.js avec Vitest.',
    contenu: `Les tests sont essentiels pour maintenir la qualité de votre code. Vitest est un framework de test moderne, rapide et compatible avec Vite.

Pourquoi Vitest ?
- Ultra rapide grâce à Vite
- Compatible avec Jest
- Support ESM natif
- Hot Module Replacement
- Concurrent par défaut

Tester un composant Vue :
1. Monter le composant
2. Simuler les interactions
3. Vérifier le résultat attendu

Avec @vue/test-utils, vous pouvez facilement monter des composants, simuler des événements et vérifier le rendu.

Les tests augmentent la confiance dans votre code et facilitent la maintenance et les refactorings.`,
    auteur: 'Alexandre Moreau',
    date: '2024-02-10',
    categorie: 'Testing',
    image: 'https://via.placeholder.com/800x400/3498db/ffffff?text=Testing',
    vues: 654,
    likes: 43
  }
]

// Fonction helper pour trouver un article par ID
export function getArticleById(id) {
  return articles.find(article => article.id === parseInt(id))
}

// Fonction helper pour filtrer par catégorie
export function getArticlesByCategorie(categorie) {
  if (categorie === 'all') return articles
  return articles.filter(article => article.categorie === categorie)
}

// Obtenir toutes les catégories uniques
export function getCategories() {
  return [...new Set(articles.map(article => article.categorie))]
}
