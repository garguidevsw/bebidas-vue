import { onMounted, reactive, ref, computed } from 'vue';
import { defineStore } from 'pinia';
import ApiServices from '../services/ApiServices';
import { useModalStore } from './modal';

export const useBebidasStore = defineStore('bebidas', () => {

  const storeModal = useModalStore()

  const categorias = ref([])
  const recetas = ref([])
  const receta = ref({})
  const busqueda = reactive({
    nombre: '',
    categoria: ''
  })

  onMounted(async() => {
    const { data } = await ApiServices.obtenerCategorias()

    categorias.value = data.drinks
  })

  async function obtenerRecetas() {
    const { data: { drinks } } = await ApiServices.obtenerRecetas(busqueda)

    recetas.value = drinks
  }

  async function seleccionarBebida(id) {
    const { data: {drinks} } = await ApiServices.buscarReceta(id)
    receta.value = drinks[0]

    storeModal.handleClickModal()
  }

  const noRecetas = computed(() => recetas.value.length === 0)

  return {
    categorias,
    busqueda,
    obtenerRecetas,
    recetas,
    receta,
    seleccionarBebida,
    noRecetas
  }
})