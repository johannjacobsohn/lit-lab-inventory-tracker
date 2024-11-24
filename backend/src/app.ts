import Fastify from 'fastify'
import mongodb from '@fastify/mongodb'
import { ObjectId } from '@fastify/mongodb'

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb'; // 'mongodb://mongo/mydb' // FIXME

function buildApp(opts = { logger: true }) {
  const fastify = Fastify(opts)

  fastify.register(mongodb, {
    // force to close the mongodb connection when app stopped
    // the default value is false
    forceClose: true,

    url
  })

  fastify.get('/devices', async function (request, reply) {
    const devicesCollection = this.mongo.db?.collection('devices')
    const allDevices = await devicesCollection?.find({}).toArray()
    reply.send(allDevices)
  })

  fastify.get<{ Params: { id: string } }>('/devices/:id', async function (req, reply) {
    const devicesCollection = this.mongo.db?.collection('devices')
    const id = parseInt(req.params.id, 10)
    const device = await devicesCollection?.findOne({ id })
    reply.send(device)
  })

  return fastify
}

export default buildApp




