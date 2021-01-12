import { MongoClient, Db, Collection, Cursor, MongoError } from 'mongodb'
import { Task } from 'fp-ts/Task'
import { tryCatch, TaskEither } from 'fp-ts/TaskEither'

export const connect = (uri: string): TaskEither<string, MongoClient> => tryCatch(
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

  const findAllMerdas: TaskEither<string, any[]> = tryCatch(
    () => merdaCollection.find().toArray(),
    String
  )
  return { findAllMerdas }
}
