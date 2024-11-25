import Fastify from 'fastify'
import mongodb from '@fastify/mongodb'
import fastifyEnv from '@fastify/env'
import { FastifyRequest } from 'fastify'

import { Device } from '../types/Device'
import getTestData from './getTestData'

const schema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: {
      type: 'string',
      default: 3000
    },
    MONGO_URL: {
      type: 'string',
      default: 'mongodb://localhost:27017'
    },
    MONGO_DB_NAME: {
      type: 'string',
      default: 'mydb'
    }
  }
}

type Envs = {
  PORT: string
  MONGO_URL: string
  MONGO_DB_NAME: string
}

async function buildApp(opts = { logger: true }) {
  const fastify = Fastify(opts)

  await fastify.register(fastifyEnv, { schema, dotenv: true })
  const envs = fastify.getEnvs<Envs>() // envs will be of type Envs

  console.log(envs) // { PORT: '3000', MONGO_URL: 'mongodb://localhost:27017', MONGO_DB_NAME: 'mydb' }

  fastify
    .register(mongodb, {
      // force to close the mongodb connection when app stopped
      // the default value is false
      forceClose: true,

      url: envs.MONGO_URL + '/' + envs.MONGO_DB_NAME
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

  fastify.post('/devices', async function (req, reply) {
    const devicesCollection = this.mongo.db?.collection('devices')
    if (!devicesCollection) {
      reply.code(500).send('No collection')
      return
    }

    const device = new Device(req.body as Partial<Device>)
    const id = +new Date() // generate a unique id - TODO: use _id instead
    const result = await devicesCollection.insertOne({...device, id})
    reply.send(result)
  })

  fastify.put<{ Params: { id: string } }>('/devices/:id', async function (req, reply) {
    const devicesCollection = this.mongo.db?.collection('devices')
    const id = parseInt(req.params.id, 10)
    const device = new Device({...req.body as Partial<Device>, id})
    const result = await devicesCollection?.replaceOne({ id }, device)
    reply.send(result)
  })

  type DeleteRequest = FastifyRequest<{
    Querystring: { ids: string }
  }>
  
  fastify.delete('/devices', async function (req: DeleteRequest, reply) {
    const devicesCollection = this.mongo.db?.collection('devices')
    const ids = req.query?.ids?.split(',').map(Number)
    const q = ids ? { id: { $in: ids } } : {}
    devicesCollection?.deleteMany(q)
    reply.send()
  })

  fastify.delete<{ Params: { id: string } }>('/devices/:id', async function (req, reply) {
    const devicesCollection = this.mongo.db?.collection('devices')
    const id = parseInt(req.params.id, 10)
    const result = await devicesCollection?.deleteOne({ id })
    reply.send(result)
  })


  // helpers for testing
  fastify.get<{ Params: { id: string } }>('/create-dummy-data', async function (req, reply) {
    const devicesCollection = this.mongo.db?.collection('devices')
    devicesCollection?.insertMany(getTestData())
    reply.send()
  })


  return fastify
}

export default buildApp
