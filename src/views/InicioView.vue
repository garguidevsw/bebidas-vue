<script setup>
  import Receta from '../components/Receta.vue';
import { useBebidasStore } from '../stores/bebidas'

  const store =  useBebidasStore()

  console.log(store.recetas);
</script>

<template>
  <h1 class="text-6xl font-extrabold">Recetas</h1>
  <p v-if="store.noRecetas" class="text-gray-600 text-2xl text-center my-10">No hay recetas, realice la busqueda...</p>
  <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
    <Receta v-for="receta in store.recetas" :key="receta.idDrink" :receta="receta" />
  </div>
</template>

