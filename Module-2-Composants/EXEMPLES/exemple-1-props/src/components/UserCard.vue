<template>
  <div class="user-card">
    <img :src="avatar" :alt="nom" class="user-avatar">
    <div class="user-name">{{ nom }}</div>
    <div class="user-email">{{ email }}</div>
    <div class="user-role">{{ role }}</div>
    <div class="user-status" :class="{ active: actif, inactive: !actif }">
      {{ actif ? '✓ Actif' : '✗ Inactif' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCard',

  props: {
    nom: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default: 'https://via.placeholder.com/80'
    },
    role: {
      type: String,
      default: 'Utilisateur',
      validator(value) {
        return ['Admin', 'Développeur', 'Utilisateur'].includes(value)
      }
    },
    actif: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.user-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  padding: 25px;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.user-card:hover {
  transform: translateY(-5px);
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 15px;
  display: block;
  border: 3px solid white;
}

.user-name {
  font-size: 22px;
  font-weight: bold;
  margin: 10px 0;
  text-align: center;
}

.user-email {
  font-size: 14px;
  opacity: 0.9;
  text-align: center;
  margin: 5px 0;
}

.user-role {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 12px;
  margin-top: 10px;
}

.user-status {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
}

.user-status.active {
  background: rgba(46, 204, 113, 0.8);
}

.user-status.inactive {
  background: rgba(231, 76, 60, 0.8);
}
</style>
