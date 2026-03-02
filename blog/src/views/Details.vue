<template>
    <div>
        <h1>Détails de l'article</h1>
        <div v-if="article">
            <h2>{{ article.title }}</h2>
            <p>{{ article.content }}</p>
            <button @click="router.back()">Retour</button>
        </div>

        <div v-else>
            <p>Article non trouvé</p>
        </div>
    </div>
</template>

<script setup>
import { articles } from '@/data';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';


const route = useRoute();
const router = useRouter();

const  article = computed(() => {
    const id = parseInt(route.params.id);
    return articles.find(a => a.id === id);
});

</script>