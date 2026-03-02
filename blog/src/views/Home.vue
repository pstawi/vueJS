<template>
    <div>
        <h1>Accueil</h1>
        <div v-for="article in articles" :key="article.id">
            <h2>{{ article.title }}</h2>
            <p>{{ article.content }}</p>
            <router-link :to="`/article/${article.id}`">suite</router-link>
        </div>
    </div>
    </template>

    <script setup>
    import { articles } from '@/data';
    </script>

