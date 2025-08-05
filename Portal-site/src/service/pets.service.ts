import type { Pet } from '../interface/pet.interface'
import { environment } from '../tools/axiosInstance'

export const petsService = {

  async createPet(data: Pet) {
    try {
      const response = await environment('/pet/register', 'POST', data)
      return response
    } catch (error) {
      throw new Error('Erro ao criar o pet')
    }
  },

  async getAllPets(page = 1, limit = 10) {
    try {
      const response = await environment(`/pet/all?page=${page}&limit=${limit}`, 'GET')
      return response
    } catch (error) {
      console.error('Erro ao buscar os pets:', error)
      throw new Error('Erro ao buscar os pets do usuário')
    }
  },

  // não atualiza

  // async updatePet(id: string, data: Omit<Pet, 'id'>) {
  //   try {
  //     const response = await environment(`/pets/${id}`, 'PUT', data)
  //     return response
  //   } catch () {
  //     throw new Error('Erro ao atualizar o pet')
  //   }
  // },

  // async deletePet(id: string) {
  //   try {
  //     const response = await environment(`/pets/${id}`, 'DELETE')
  //     return response
  //   } catch (error) {
  //     throw new Error('Erro ao deletar o pet')
  //   }
  // },
 


}