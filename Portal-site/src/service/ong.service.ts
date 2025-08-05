import type { CreateOng } from '../interface/create-ong'
import { environment } from '../tools/axiosInstance'

export const ongService = {

 async register(data: CreateOng){
    try {
      const response = await environment('/register', 'POST', data)
      return response
    } catch (error) {
      console.error('Erro ao criar ONG:', error)
      throw new Error('Erro ao criar ONG')
    }
  },

  async login(data: { email: string; password: string }) {
    try {
      const response = await environment('/api/sessions', 'POST', data)
      return response
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      throw new Error('Erro ao fazer login')
    }
  }

}
