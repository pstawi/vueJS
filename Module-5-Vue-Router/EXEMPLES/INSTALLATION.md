# 🚀 Installation Rapide du Projet Blog

## Méthode 1 : Nouveau Projet (Recommandée)

### Étape 1 : Créer le projet avec Vite

```bash
npm create vue@latest blog-router
```

Sélectionner :
- ✅ **Vue Router** : Oui
- ❌ Pinia : Non (pas pour cet exemple)
- ❌ TypeScript : Non
- ✅ ESLint : Oui (recommandé)
- Autres : Non

### Étape 2 : Aller dans le dossier

```bash
cd blog-router
```

### Étape 3 : Installer les dépendances

```bash
npm install
```

### Étape 4 : Copier les fichiers

Copiez tous les fichiers du dossier `projet-blog-router/src/` dans votre dossier `src/` :

- Remplacer `src/App.vue`
- Remplacer `src/main.js`
- Remplacer `src/router/index.js`
- Copier le dossier `src/views/` complet
- Copier le dossier `src/components/` complet
- Copier le dossier `src/data/` complet
- Remplacer `src/assets/main.css`

### Étape 5 : Lancer le serveur

```bash
npm run dev
```

Ouvrir http://localhost:5173 dans votre navigateur 🎉

---

## Méthode 2 : Depuis Zéro (Manuel)

Si vous voulez créer tout manuellement pour mieux comprendre :

### 1. Créer le projet

```bash
npm create vite@latest blog-router -- --template vue
cd blog-router
npm install
npm install vue-router@4
```

### 2. Créer la structure

```bash
# Créer les dossiers
mkdir src/views
mkdir src/components
mkdir src/data
mkdir src/router
```

### 3. Copier les fichiers

Copiez un par un les fichiers du dossier `projet-blog-router/src/` :

**Router :**
- `src/router/index.js`

**Data :**
- `src/data/articles.js`

**Views :**
- `src/views/Home.vue`
- `src/views/Articles.vue`
- `src/views/ArticleDetail.vue`
- `src/views/About.vue`
- `src/views/Login.vue`
- `src/views/Admin.vue`
- `src/views/NotFound.vue`

**Components :**
- `src/components/Navigation.vue`
- `src/components/ArticleCard.vue`
- `src/components/Footer.vue`

**Root :**
- `src/App.vue`
- `src/main.js`
- `src/assets/main.css`

### 4. Lancer

```bash
npm run dev
```

---

## 📋 Vérification de l'Installation

### ✅ Le projet fonctionne si :

1. **Page d'accueil** : http://localhost:5173/
   - Hero section visible
   - 3 articles récents affichés
   - Navigation fonctionne

2. **Page articles** : http://localhost:5173/articles
   - Tous les articles listés
   - Filtres par catégorie fonctionnent

3. **Détail article** : http://localhost:5173/article/1
   - Article complet affiché
   - Bouton retour fonctionne

4. **Login** : http://localhost:5173/login
   - Formulaire affiché
   - Test : admin@blog.com / admin

5. **Admin** : http://localhost:5173/admin
   - Redirection vers login si non connecté
   - Page visible après connexion

6. **404** : http://localhost:5173/page-inexistante
   - Page 404 personnalisée

---

## 🐛 Problèmes Courants

### Erreur : "Cannot find module 'vue-router'"

```bash
npm install vue-router@4
```

### Erreur : "Cannot find module '@/...''"

Vérifiez que `vite.config.js` contient l'alias :

```javascript
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url))
  }
}
```

### Port déjà utilisé

Changez le port dans `vite.config.js` :

```javascript
export default defineConfig({
  server: {
    port: 3000
  }
})
```

### Page blanche

1. Vérifiez la console du navigateur (F12)
2. Vérifiez que `src/main.js` importe bien le router
3. Vérifiez que tous les fichiers sont présents

---

## 📚 Commandes Utiles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview

# Linter
npm run lint
```

---

## 🎓 Pour Utiliser en Cours

### Option A : Projet Pré-installé

1. Installer une fois le projet complet
2. Créer un .zip du dossier
3. Distribuer aux étudiants
4. Les étudiants décompressent et font `npm install && npm run dev`

### Option B : Installation Guidée

1. Projeter les commandes étape par étape
2. Les étudiants suivent en direct
3. Résoudre les problèmes ensemble
4. Temps estimé : 15-20 minutes

### Option C : Git Repository

```bash
# Initialiser git
git init
git add .
git commit -m "Initial commit - Blog Router"

# Les étudiants clonent
git clone <repository-url>
cd blog-router
npm install
npm run dev
```

---

## 💡 Conseils pour le Formateur

1. **Testez avant le cours** : Installez le projet vous-même
2. **Préparez un backup** : Ayez une version qui fonctionne sur clé USB
3. **Vérifiez Node.js** : Assurez-vous que tous les PC ont Node 16+
4. **Connexion internet** : Nécessaire pour `npm install`
5. **Live demo** : Montrez chaque page en fonctionnement

---

Bon cours ! 🎓
