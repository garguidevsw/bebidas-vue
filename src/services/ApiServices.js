import api from '../lib/axios';

export default {
  obtenerCategorias() {
    return api('/list.php?c=list')
  },
  obtenerRecetas({ nombre, categoria }) {
    return api(`/filter.php?i=${ nombre }&c=${ categoria }`)
  },
  buscarReceta(id) {
    return api(`/lookup.php?i=${id}`)
  }
}