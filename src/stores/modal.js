import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useFavoritosStore } from './favoritos'

export const useModalStore = defineStore('modal', () => {
  const storeFavoritos = useFavoritosStore()
  const modal = ref(false)

  function handleClickModal() {
    modal.value = !modal.value
  }

  const textoBoton = computed(() => {
    return storeFavoritos.existeFavorito() ? 'Eliminar de favoritos' : 'Agregar a Favoritos'
  })

  return {
    modal,
    handleClickModal,
    textoBoton
  }
})