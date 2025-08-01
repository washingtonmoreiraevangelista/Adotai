import { OngsRepository, PetRepository } from '@/repository'
import { GetPetByIdService, RegisterPet } from '@/services'
import { ListAllPets } from '@/services/get-all-pets.service'
import { UpdateByPet } from '@/services/update-pet.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import path from 'path'
import fs from 'fs'
import z from 'zod'
import { randomUUID } from 'crypto'

export async function registerPet(request: FastifyRequest, reply: FastifyReply) {
  const PetTypeEnum = z.enum(['DOG', 'CAT', 'BIRD', 'OTHER'])
  const PetSizeEnum = z.enum(['SMALL', 'MEDIUM', 'LARGE'])

  const petsSchema = z.object({
    name: z.string(),
    description: z.string(),
    type: PetTypeEnum,
    raca: z.string(),
    age: z.string(),
    city: z.string(),
    size: PetSizeEnum,
  })


  const { name, description, type, raca, age, city, size } = await petsSchema.parse(request.body)
  // Faz o upload do arquivo
  const data = await request.file()

  // Verifica se o arquivo foi enviado
  if (!data) {
    return reply.status(400).send({ error: 'Photo is required' })
  }

  // Gera um nome único para o arquivo
  const filename = `${randomUUID()}${path.extname(data.filename)}`
  const filepath = path.join(__dirname, '..', '..', 'uploads', filename)

  // Verifica o tipo da imagem
  if (data.mimetype !== 'image/jpeg' && data.mimetype !== 'image/png') {
    return reply.status(400).send({ error: 'Invalid file type. Only JPEG and PNG are allowed.' })
  }

  // Cria o diretório se não existir
  const uploadDir = path.join(__dirname, '..', '..', 'uploads')
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
  }

  // Salva o arquivo na pasta uploads/
  await new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(filepath)
    data.file.pipe(writeStream)
    data.file.on('end', resolve)
    data.file.on('error', reject)
  })

  // Caso não tenha os dados obrigatórios
  if (!name || !description || !type || !raca || !age || !city || !size) {
    return reply.status(400).send({ error: 'All fields are required' })
  }

  const ongId = request.user.sub

  const ongsRepository = new OngsRepository()
  const repository = new PetRepository()
  const service = new RegisterPet(repository, ongsRepository)

  await service.create({
    name,
    description,
    type,
    raca,
    age,
    city: city.toLowerCase().replace(/\s/g, ''),
    size,
    adopted: false,
    photoUrl: filename,
    created_At: new Date().toISOString(),
    ongId
  })

  return reply.status(201).send()
}


export async function getAllPets(request: FastifyRequest, reply: FastifyReply) {
  let { page = 1, limit = 12 } = request.query as {
    page?: string | number
    limit?: string | number
  }

  page = Number(page)
  limit = Number(limit)

  const repository = new PetRepository()
  const service = new ListAllPets(repository)

  const { pet, total } = await service.execute({ page, limit })

  return reply.send({
    pet,
    total,
    page,
    limit,
  })
}


export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }

  const repository = new PetRepository()
  const service = new GetPetByIdService(repository)

  const { pet } = await service.execute(id)

  return reply.send(pet)

}

// export async function listByPets(request: FastifyRequest, reply: FastifyReply) {
//   const querySchema = z.object({
//     city: z.string().optional(),
//     type: z.string().optional(),
//     raca: z.string().optional(),
//     idade: z.string().optional(),
//     size: z.string().optional(),
//     page: z.coerce.number().min(1).default(1), 
//     limit: z.coerce.number().min(1).max(999).default(10),  
//   })

//   const { page, limit, ...filters } = querySchema.parse(request.query)

//   const registerPetRepository = new PetRepository()
//   const petService = new ListByPets(registerPetRepository)

//   const { pet, total } = await petService.execute({ filters , page, limit })

//   return reply.status(200).send({
//     pet,
//     pagination: {
//       page,
//       limit,
//       total,
//       totalPages: Math.ceil(total / limit),
//     },
//   })
// }


export async function updatePet(request: FastifyRequest, reply: FastifyReply) {

  const paramsSchema = z.object({
    id: z.string()
  })

  const bodySchema = z.object({
    adopted: z.boolean()
  })

  //passo o id via parans para buscar 
  const { id } = paramsSchema.parse(request.params)
  // adoted via body para atualizar
  const { adopted } = bodySchema.parse(request.body)

  const repository = new PetRepository()
  const service = new UpdateByPet(repository)

  const { pet } = await service.update(id, adopted)

  return reply.send(pet)

}

// quando atualizar algo passo o id via parans e o corpo da atualização via body