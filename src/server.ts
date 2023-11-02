/* eslint-disable no-console */
import { Server } from 'http'
import status from 'http-status'
import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import ApiError from './errors/apiErrors'
process.on('uncaughtException', error => {
  console.log('uncaughtException')
  console.error(error)
  process.exit(1)
})

let server: Server

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log(`🛢   Database is connected successfully`)
    server = app.listen(config.port, () => {
      console.log(`Application  listening on port ${config.port}`)
    })
  } catch (err) {
    console.log('Failed to connect database', err)
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error)
        process.exit(1)
      })
      bootstrap()
    } else {
      process.exit(1)
    }
    throw new ApiError(status.NOT_ACCEPTABLE, 'Somthing Went wrong')
  })
}

bootstrap()

process.on('SIGTERM', () => {
  if (server) {
    server.close()
  }
})
// E90MjTq1GDFx6Wdv
// mdnowshad9
