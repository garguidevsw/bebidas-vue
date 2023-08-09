import { onMounted, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import ApiServices from '../services/ApiServices';

export const useBebidasStore = defineStore('bebidas', () => {

  const categorias = ref([])
  const recetas = ref([])
  const busqueda = reactive({
    nombre: '',
    categoria: ''
  })

  onMounted(async() => {
    const { data } = await ApiServices.obtenerCategorias()

    categorias.value = data.drinks
  })

  const obtenerRecetas = async() => {
    const { data: { drinks } } = await ApiServices.obtenerRecetas(busqueda)

    recetas.value = drinks
  }

  const seleccionarBebida = async(id)  => {
    const { data: {drinks} } = await ApiServices.buscarReceta(id)
    console.log(drinks[0]);
  }

  return {
    categorias,
    busqueda,
    obtenerRecetas,
    recetas,
    seleccionarBebida
  }
})