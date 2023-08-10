import { ref, watch, watchEffect } from 'vue';
import { defineStore } from 'pinia';

export const useNotificacionStore = defineStore('notificacion', () => {

  const mostrar = ref(false)
  const error = ref(false)
  const texto = ref('')

  // Se puede definir o hacer con un watch
  // function $reset() {
  //   texto.value = ''
  //   mostrar.value = false
  //   error.value = false
  // }

  watchEffect(() => {
    if(mostrar.value){
      setTimeout(() => {
        texto.value = ''
        mostrar.value = false
        error.value = false
      }, 3000);
    }
  })

  function handleClickMostrar() {
    mostrar.value = true
  }

  function handleClickCerrar() {
    mostrar.value = false
  }

  return {
    mostrar,
    error,
    texto,
    handleClickMostrar,
    handleClickCerrar,
  }

})