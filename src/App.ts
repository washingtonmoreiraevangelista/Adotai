import fastify from 'fastify'
import { setGlobalErrorHandler } from './error/global.error'
import { routes } from './router/routes'


export const app = fastify()

app.register(routes)


setGlobalErrorHandler(app)