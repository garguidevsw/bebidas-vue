import { ref, watch, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useBebidasStore } from './bebidas'
import { useModalStore } from './modal'
import { useNotificacionStore } from './notificaciones'

export const useFavoritosStore = defineStore('favoritos', () => {

  const storeBebidas = useBebidasStore()
  const storeModal = useModalStore()
  const storeNotificacion = useNotificacionStore()

  const favoritos = ref([])

  onMounted(() => {
    favoritos.value = JSON.parse(localStorage.getItem('favoritos')) ?? []
  })

  watch(favoritos, () => {
    sincronizarLocalStorage()
  }, {
    deep: true
  })

  function sincronizarLocalStorage() {
    localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
  }

  function handleClickFavorito(e) {
    if(existeFavorito()){
      eliminarFavorito()
      e.target.textContent = 'Agregar a favoritos'
    }else{
      agregarFavorito()
      storeModal.modal = false
    }
  }

  function agregarFavorito() {
    favoritos.value = [storeBebidas.receta, ...favoritos.value]
    storeNotificacion.texto = 'Receta agregada éxitosamente'
    storeNotificacion.mostrar = true

    // Esto se agrego en el store de notificacion
    // setTimeout(() => {
    //   storeNotificacion.$reset()
    // }, 3000)
  }

  function eliminarFavorito() {
    favoritos.value = favoritos.value.filter( favorito => favorito.idDrink !== storeBebidas.receta.idDrink)
    storeNotificacion.texto = 'Receta eliminada éxitosamente'
    storeNotificacion.mostrar = true

    // Esto se agrego en el store de notificacion
    // setTimeout(() => {
    //   storeNotificacion.$reset()
    // }, 3000)
  }

  function existeFavorito() {
    const favoritosLocalStorage = JSON.parse(localStorage.getItem('favoritos')) ?? []

    return favoritosLocalStorage.some(favorito => favorito.idDrink === storeBebidas.receta.idDrink)
  }

  return {
    favoritos,
    handleClickFavorito,
    existeFavorito
  }
})