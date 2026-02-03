# Exercice 1 : Formulaire d'Inscription Complet

## 🎯 Objectif
Créer un formulaire d'inscription avec validation en temps réel utilisant v-model, directives conditionnelles et événements.

## 🛠️ Contexte (projet build)
Réalisez cet exercice dans un **projet Vue avec Vite** (projet du Module 2 ou nouveau projet créé avec `npm create vue@latest`, voir section 0 du cours). Vous pouvez tout mettre dans `App.vue` ou découper en composants dans `src/components/` (ex. champ avec validation).

## 📋 Consignes

Créez un formulaire d'inscription avec les champs suivants :

### Champs du formulaire :

1. **Nom d'utilisateur** (text)
   - Obligatoire
   - Minimum 3 caractères
   - Afficher le nombre de caractères

2. **Email** (email)
   - Obligatoire
   - Format email valide

3. **Mot de passe** (password)
   - Obligatoire
   - Minimum 8 caractères
   - Doit contenir au moins 1 majuscule et 1 chiffre
   - Afficher un indicateur de force

4. **Confirmation mot de passe** (password)
   - Doit correspondre au mot de passe

5. **Âge** (number)
   - Obligatoire
   - Doit être >= 18

6. **Pays** (select)
   - Liste : France, Belgique, Suisse, Canada, Autre

7. **Langues parlées** (checkbox multiple)
   - Français, Anglais, Espagnol, Allemand

8. **Genre** (radio)
   - Homme, Femme, Autre, Ne souhaite pas répondre

9. **Conditions d'utilisation** (checkbox)
   - Doit être coché pour soumettre

### Fonctionnalités à implémenter :

1. **Validation en temps réel**
   - Afficher les erreurs sous chaque champ
   - Messages d'erreur clairs
   - Style différent pour champs valides/invalides

2. **Indicateur de force du mot de passe**
   - Faible (rouge) : < 8 caractères
   - Moyen (orange) : 8+ caractères
   - Fort (vert) : 8+ caractères + majuscule + chiffre

3. **Bouton de soumission**
   - Désactivé si le formulaire est invalide
   - Afficher un message de succès après soumission

4. **Réinitialisation**
   - Bouton pour vider tous les champs

## 💡 Indices

**Validation email :**
```javascript
computed: {
  emailValide() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(this.email);
  }
}
```

**Force du mot de passe :**
```javascript
computed: {
  forceMdp() {
    if (this.motDePasse.length < 8) return 'faible';
    const aMajuscule = /[A-Z]/.test(this.motDePasse);
    const aChiffre = /[0-9]/.test(this.motDePasse);
    return (aMajuscule && aChiffre) ? 'fort' : 'moyen';
  }
}
```

## ✅ Critères de réussite

- [ ] Tous les champs sont présents et fonctionnels
- [ ] v-model lie correctement les données
- [ ] La validation fonctionne en temps réel
- [ ] Les messages d'erreur s'affichent correctement
- [ ] L'indicateur de force du mot de passe fonctionne
- [ ] Le bouton est désactivé si le formulaire est invalide
- [ ] La soumission affiche un message de succès
- [ ] Le bouton de réinitialisation fonctionne
- [ ] L'interface est claire et bien stylée

## ⏱️ Temps estimé
2h - 2h30

Une fois terminé, consultez le fichier de correction.
