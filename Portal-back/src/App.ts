import fastify from 'fastify'
import { setGlobalErrorHandler } from './error/global.error'
import { routes } from './router/routes'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import fastifyMultipart from '@fastify/multipart'
import path from 'path'
import fastifyStatic from '@fastify/static'


export const app = fastify()

app.register(cors, {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false
  },
  sign: {
    expiresIn: '10m'
  }
})

app.register(fastifyMultipart, {
  limits: {
    fileSize: 5 * 1024 * 1024,
  }
})

app.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'uploads'),
  prefix: '/uploads/',
})

app.register(fastifyCookie)

app.register(routes)


setGlobalErrorHandler(app)
