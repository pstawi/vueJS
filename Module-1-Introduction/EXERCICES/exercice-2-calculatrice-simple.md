# Exercice 2 : Calculatrice Simple

## Objectif
Créer une calculatrice simple qui effectue des opérations de base en temps réel.

## Consignes

Créez une calculatrice qui permet de :
- Saisir deux nombres
- Afficher les résultats de 4 opérations (addition, soustraction, multiplication, division)
- Gérer les cas d'erreur (division par zéro)

### Structure des données :
```javascript
data() {
  return {
    nombre1: 0,
    nombre2: 0
  }
}
```

### Fonctionnalités à implémenter :

1. **Interface** :
   - 2 champs input de type number pour saisir les nombres
   - Labels clairs pour chaque champ
   - Zone d'affichage des résultats

2. **Calculs à afficher** :
   - Addition : `nombre1 + nombre2`
   - Soustraction : `nombre1 - nombre2`
   - Multiplication : `nombre1 × nombre2`
   - Division : `nombre1 ÷ nombre2` (attention à la division par zéro !)

3. **Affichage** :
   - Format : `10 + 5 = 15`
   - Pour la division par zéro, affichez "Impossible de diviser par zéro"
   - Arrondissez les résultats à 2 décimales pour la division

4. **Bonus** :
   - Ajoutez des icônes ou symboles pour chaque opération
   - Changez la couleur du résultat selon qu'il est positif (vert) ou négatif (rouge)
   - Affichez un message si les deux nombres sont égaux

## Indices

- Utilisez `v-model` pour lier les inputs aux données (on verra plus en détail dans le Module 3)
- Pour la division par zéro : `{{ nombre2 !== 0 ? (nombre1 / nombre2).toFixed(2) : 'Impossible...' }}`
- Pour les couleurs conditionnelles : `:style="{ color: resultat > 0 ? 'green' : 'red' }"`
- Les inputs de type number avec v-model retournent des strings, convertissez-les : `parseFloat(nombre1)`

---
