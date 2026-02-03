# Exercice 1 : Carte de Visite Interactive

## Objectif
Créer une carte de visite interactive en utilisant l'interpolation et le binding d'attributs.

## Consignes

Créez un fichier HTML contenant une carte de visite avec les éléments suivants :

### Données à utiliser :
```javascript
data() {
  return {
    personne: {
      nom: 'Votre Nom',
      prenom: 'Votre Prénom',
      poste: 'Développeur Web',
      email: 'email@example.com',
      telephone: '01 23 45 67 89',
      photo: 'https://via.placeholder.com/150',
      ville: 'Paris',
      competences: ['HTML', 'CSS', 'JavaScript', 'Vue.js']
    },
    reseauxSociaux: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      twitter: 'https://twitter.com'
    },
    estDisponible: true
  }
}
```

### Fonctionnalités à implémenter :

1. **Affichage des informations** :
   - Photo de profil (utilisez v-bind pour l'attribut src)
   - Nom complet (prénom + nom en majuscules)
   - Poste
   - Email et téléphone
   - Ville

2. **Liste des compétences** :
   - Affichez le nombre total de compétences
   - Affichez toutes les compétences (vous pouvez les séparer par des virgules)

3. **Disponibilité** :
   - Affichez un badge "Disponible" en vert si `estDisponible` est true
   - Affichez un badge "Non disponible" en rouge sinon
   - Utilisez l'opérateur ternaire et v-bind:style

4. **Liens vers réseaux sociaux** :
   - Créez 3 liens (LinkedIn, GitHub, Twitter)
   - Utilisez v-bind:href pour rendre les liens dynamiques
   - Utilisez v-bind:title pour un texte d'infobulle

5. **Mise en forme** :
   - Ajoutez du CSS pour rendre la carte attrayante
   - Utilisez des bordures, ombres, couleurs

## Indices

- Utilisez `{{ }}` pour l'interpolation
- Utilisez `:src`, `:href`, `:style` pour les bindings
- Pour la disponibilité : `:style="{ backgroundColor: estDisponible ? 'green' : 'red' }"`
- Pour les compétences : `{{ competences.length }}` et `{{ competences.join(', ') }}`


---

**Bon courage !**
