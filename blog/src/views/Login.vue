<template>
<div>
    <h1>Connexion</h1>
    <div>
        <label for="email">Email:</label>
        <input  type="email" id="email" v-model="email" />

        <label for="password">Mot de passe:</label>
        <input type="password" id="password" v-model="password" />

        <button @click="login">Se connecter</button>
    </div>
</div>
</template>

<script setup>

import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';


const router = useRouter();
const route = useRoute();

const email = ref('');
const password = ref('');

function login() {
    if (email.value === 'marcel@blog.com' && password.value === 'marcel') {

        localStorage.setItem('isAdmin', 'true');

        const redirect = route.query.redirect || '/admin';
        router.push(redirect);
    } else {
        alert('Email ou mot de passe incorrect');
    }
}


</script>