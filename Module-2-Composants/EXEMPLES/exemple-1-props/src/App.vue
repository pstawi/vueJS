<template>
  <div>
    <h1>👥 Gestion des Utilisateurs - Props</h1>

    <div class="users-grid">
      <UserCard
        v-for="user in users"
        :key="user.id"
        :nom="user.nom"
        :email="user.email"
        :avatar="user.avatar"
        :role="user.role"
        :actif="user.actif"
      />
    </div>
  </div>
</template>

<script>
import UserCard from './components/UserCard.vue'

export default {
  name: 'App',

  components: {
    UserCard
  },

  data() {
    return {
      users: [
        {
          id: 1,
          nom: 'Sophie Martin',
          email: 'sophie.martin@example.com',
          avatar: 'https://i.pravatar.cc/80?img=47',
          role: 'Admin',
          actif: true
        },
        {
          id: 2,
          nom: 'Thomas Dubois',
          email: 'thomas.dubois@example.com',
          avatar: 'https://i.pravatar.cc/80?img=12',
          role: 'Développeur',
          actif: true
        },
        {
          id: 3,
          nom: 'Marie Lefebvre',
          email: 'marie.lefebvre@example.com',
          avatar: 'https://i.pravatar.cc/80?img=32',
          role: 'Développeur',
          actif: false
        },
        {
          id: 4,
          nom: 'Pierre Durant',
          email: 'pierre.durant@example.com',
          avatar: 'https://i.pravatar.cc/80?img=68',
          role: 'Utilisateur',
          actif: true
        }
      ]
    }
  }
}
</script>
