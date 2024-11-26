import { defineStore } from 'pinia'

export const useUsuarioStore = defineStore('usuario', {
  state: () => ({
    rol: localStorage.getItem('userRole') || '',  // Obtener el rol desde localStorage
    authenticated: !!localStorage.getItem('userRole'), // Verificar si hay un rol para autenticar
  }),
  actions: {
    // Establecer el rol del usuario y autenticarlo
    setRol(rol: string) {
      this.rol = rol
      this.authenticated = true
      localStorage.setItem('userRole', rol)  // Guardar el rol en localStorage
    },
    // Cerrar sesión
    logout() {
      this.rol = ''
      this.authenticated = false
      localStorage.removeItem('userRole')  // Limpiar el rol del localStorage
    },
  },
})
