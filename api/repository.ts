import { MongoClient, Db, Collection, Cursor, MongoError } from 'mongodb'
import { tryCatch as teTryCatch, TaskEither } from 'fp-ts/TaskEither'
import { Task } from 'fp-ts/Task'
import { tryCatch as ioeTryCatch, IOEither } from 'fp-ts/IOEither'

export const connect = (uri: string): TaskEither<string, MongoClient> => teTryCatch(
  () => MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }),
  String
)

export const disconnect = (client: MongoClient): Task<void> => () => client.close() 

export const createRepo = (client: MongoClient) => {
  const db: Db = client.db()
  const merdaCollection: Collection = db.collection('merdas')

  const findAllMerdas: TaskEither<string, any[]> = teTryCatch(
    () => merdaCollection.find().toArray(),
    () => 'Error'
  )
  return { findAllMerdas }
}
