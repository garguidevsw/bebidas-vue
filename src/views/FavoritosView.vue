<script setup>
import { useFavoritosStore } from '../stores/favoritos';
import Receta from '../components/Receta.vue';

const storeFavoritos = useFavoritosStore()

</script>

<template>
  <h1 class="text-6xl font-extrabold">Favoritos</h1>
  
  <div v-if="storeFavoritos.favoritos.length > 0" class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
    <Receta v-for="receta in storeFavoritos.favoritos" :key="receta.idDrink" :receta="receta" />
  </div>

  <p v-else class="text-gray-600 text-2xl text-center my-10">No hay recetas en favoritos</p>
</template>

