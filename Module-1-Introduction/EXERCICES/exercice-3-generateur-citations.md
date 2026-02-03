# Exercice 3 : Générateur de Citations

## Objectif
Créer un générateur de citations qui affiche une citation aléatoire avec son auteur.

## Consignes

Créez une page qui affiche une citation avec :
- Le texte de la citation
- L'auteur
- Un bouton pour afficher une nouvelle citation aléatoire
- Le nombre total de citations disponibles
- Le numéro de la citation actuelle

### Structure des données :
```javascript
data() {
  return {
    citations: [
      { texte: "Le code est comme l'humour. Quand vous devez l'expliquer, c'est mauvais.", auteur: "Cory House" },
      { texte: "Tout le monde devrait apprendre à programmer, car cela vous apprend à penser.", auteur: "Steve Jobs" },
      { texte: "La perfection est atteinte non quand il ne reste rien à ajouter, mais quand il ne reste rien à enlever.", auteur: "Antoine de Saint-Exupéry" },
      { texte: "La simplicité est l'ultime sophistication.", auteur: "Léonard de Vinci" },
      { texte: "Apprendre à écrire des programmes étend votre esprit et vous aide à mieux penser.", auteur: "Bill Gates" },
      { texte: "Un bon programmeur est quelqu'un qui regarde des deux côtés avant de traverser une rue à sens unique.", auteur: "Doug Linder" },
      { texte: "D'abord, résolvez le problème. Ensuite, écrivez le code.", auteur: "John Johnson" },
      { texte: "L'expérience est le nom que chacun donne à ses erreurs.", auteur: "Oscar Wilde" }
    ],
    indexActuel: 0
  }
}
```

### Fonctionnalités à implémenter :

1. **Affichage de la citation** :
   - Texte de la citation entre guillemets
   - Auteur précédé de "- "
   - Design attrayant (grande police, centré, etc.)

2. **Informations** :
   - Affichez "Citation X sur Y" (ex: "Citation 1 sur 8")
   - X = indexActuel + 1 (car les tableaux commencent à 0)
   - Y = nombre total de citations

3. **Bouton "Citation suivante"** :
   - Doit incrémenter `indexActuel`
   - Quand on arrive à la dernière citation, revenir à la première
   - Utilisez `@click` (on l'apprendra en détail au Module 3)

4. **Indicateurs visuels** :
   - Barre de progression montrant la position dans la liste
   - Changez la couleur de fond selon l'index (optionnel)

5. **Bonus** :
   - Bouton "Citation précédente"
   - Bouton "Citation aléatoire"
   - Animation de transition entre les citations
   - Possibilité de copier la citation