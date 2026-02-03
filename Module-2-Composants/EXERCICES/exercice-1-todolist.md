# Exercice 1 : Todo List avec Composants

## 🎯 Objectif
Créer une application Todo List en utilisant les composants, props et événements personnalisés.

## 🛠️ Contexte (projet build)
Réalisez cet exercice dans un **projet Vue avec Vite** (créé via `npm create vue@latest`, voir section 0 du cours). Créez les composants dans `src/components/` (TodoForm.vue, TodoList.vue, TodoItem.vue) et assemblez-les dans `App.vue`.

## 📋 Consignes

Créez une application de gestion de tâches avec les fonctionnalités suivantes :

### Architecture des Composants :

1. **App** (Composant Parent)
   - Gère la liste des tâches (data)
   - Gère les méthodes d'ajout/suppression/toggle

2. **TodoForm** (Composant Enfant)
   - Formulaire d'ajout de tâche
   - Émet un événement `add-todo` vers le parent

3. **TodoList** (Composant Enfant)
   - Reçoit la liste des tâches en prop
   - Affiche les TodoItem

4. **TodoItem** (Composant Enfant)
   - Reçoit une tâche en prop
   - Émet des événements `toggle-todo` et `delete-todo`

### Structure de données :

```javascript
// Dans le composant App
data() {
  return {
    todos: [
      { id: 1, texte: 'Apprendre VueJS', complete: false },
      { id: 2, texte: 'Créer un composant', complete: true },
      { id: 3, texte: 'Utiliser les props', complete: false }
    ]
  }
}
```

### Fonctionnalités à implémenter :

1. **Ajout de tâche** :
   - Formulaire avec input et bouton
   - Émettre un événement avec le texte
   - Ajouter la tâche dans le parent

2. **Affichage des tâches** :
   - Liste de toutes les tâches
   - Style différent pour les tâches complètes (barrées, grisées)

3. **Toggle (Compléter/Décompléter)** :
   - Cliquer sur une tâche pour changer son état
   - Émettre un événement avec l'id

4. **Suppression** :
   - Bouton de suppression par tâche
   - Émettre un événement avec l'id

5. **Statistiques** (Bonus avec Computed) :
   - Nombre total de tâches
   - Nombre de tâches complètes
   - Nombre de tâches restantes
   - Pourcentage de complétion

### Spécifications techniques :

**TodoForm.vue :**
- Props : aucune
- Événements émis : `add-todo`
- Data : `nouveauTodo` (string)

**TodoList.vue :**
- Props : `todos` (Array, required)
- Événements émis : `toggle-todo`, `delete-todo`

**TodoItem.vue :**
- Props : `todo` (Object, required)
- Événements émis : `toggle`, `delete`

## 💡 Indices

```javascript
// Ajouter une tâche
ajouterTodo(texte) {
  this.todos.push({
    id: Date.now(),
    texte: texte,
    complete: false
  });
}

// Toggle une tâche
toggleTodo(id) {
  const todo = this.todos.find(t => t.id === id);
  if (todo) {
    todo.complete = !todo.complete;
  }
}

// Supprimer une tâche
supprimerTodo(id) {
  this.todos = this.todos.filter(t => t.id !== id);
}

// Computed pour les statistiques
computed: {
  nombreTotal() {
    return this.todos.length;
  },
  nombreCompletes() {
    return this.todos.filter(t => t.complete).length;
  }
}
```

## ✅ Critères de réussite

- [ ] Les 4 composants sont créés et correctement structurés
- [ ] Les props sont définies avec validation
- [ ] Les événements sont correctement émis et écoutés
- [ ] L'ajout de tâche fonctionne
- [ ] Le toggle (compléter/décompléter) fonctionne
- [ ] La suppression fonctionne
- [ ] Le style différencie les tâches complètes
- [ ] (Bonus) Les statistiques s'affichent correctement
- [ ] (Bonus) Validation du formulaire (pas de tâche vide)
- [ ] (Bonus) Filtres (Toutes / Actives / Complètes)

## 📝 Exemple de résultat attendu

```
┌─────────────────────────────────────┐
│     📝 Ma Todo List                 │
├─────────────────────────────────────┤
│  [Ajouter une tâche...] [+ Ajouter]│
├─────────────────────────────────────┤
│  ☐ Apprendre VueJS            [🗑️] │
│  ☑ Créer un composant         [🗑️] │
│  ☐ Utiliser les props         [🗑️] │
├─────────────────────────────────────┤
│  📊 Statistiques :                  │
│  • Total : 3 tâches                 │
│  • Complètes : 1                    │
│  • Restantes : 2                    │
│  • Progression : 33%                │
└─────────────────────────────────────┘
```

## ⏱️ Temps estimé
1h30 - 2h

---

**Astuce** : Commencez par créer la structure des composants, puis implémentez les fonctionnalités une par une.

Une fois terminé, consultez le fichier de correction pour comparer votre solution.
