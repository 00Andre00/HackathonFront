import { defineStore } from 'pinia'

export const useUsuarioStore = defineStore('usuario', {
  state: () => ({
    rol: '',  // El rol del usuario ('usuario' o 'administrador')
    authenticated: false,  // Si el usuario está autenticado
  }),
  actions: {
    setRol(rol: string) {
      this.rol = rol
      this.authenticated = true
    },
    logout() {
      this.rol = ''
      this.authenticated = false
      localStorage.removeItem('userRole')  // Limpiar el rol en el localStorage
    },
  }
})