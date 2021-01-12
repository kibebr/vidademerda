import fastify, { FastifyInstance } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import { connect, disconnect, createRepo } from './repository'
import { fold, getOrElseW, isLeft, Either } from 'fp-ts/Either'
import { pipe, identity } from 'fp-ts/function'
import { fold as teFold } from 'fp-ts/TaskEither'
import * as dotenv from 'dotenv'

dotenv.config()

const init = async () => {
  const handleInternalError = err => {
    console.error(err)
    process.exit(1)
  }
  
  const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify()
  const result = await connect(process.env.DB_URI)()
  const client = getOrElseW(handleInternalError)(result)
  const repo = createRepo(client)

  server.get('/merdas', async (req, res) => {
    res.send(getOrElseW(identity)(await repo.findAllMerdas()))
  })

  server.post('/merdas', (req, res) => {

  })

  server.listen(process.env.PORT)
    .then(addy => {
      console.warn(`Server is online on address ${addy}.`)
    })
    .catch(handleInternalError)
}

init()
