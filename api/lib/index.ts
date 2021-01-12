import fastify, { FastifyInstance } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import { connect, disconnect, createRepo } from './repository'
import { fold, getOrElse, Either } from 'fp-ts/Either'
import * as dotenv from 'dotenv'

dotenv.config()

const init = async () => {
  const handleCriticalError = (err) => {
    console.error(err)
    process.exit(1)
  }

  const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify()
  connect(process.env.DB_URI)()
  .then(getOrElse(handleCriticalError))
  .then(client => {
    const repo = createRepo(client)

    server.get('/merdas', async (req, res) => {
      fold(
        (error) => res.send(500).send(error),
        (data) => res.code(200).send(data)
      )(await repo.findAllMerdas())
    })

    server.post('/merdas', (req, res) => {
      console.log(req)
      res.send('received')
    })

    server.listen(process.env.PORT)
    .then(addy => {
      console.warn(`Server is online on address ${addy}.`)
    })
    .catch(handleCriticalError)
  })

}

init()
