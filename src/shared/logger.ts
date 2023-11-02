// import path from 'path'
// import { createLogger, format, transports } from 'winston'
// import DailyRotateFile from 'winston-daily-rotate-file'

// const { combine, timestamp, label, printf, prettyPrint } = format

// const myFormat = printf(({ level, message, label, timestamp }) => {
//   const date = new Date(timestamp)
//   const hour = date.getHours()
//   const minutes = date.getMinutes()
//   const seconds = date.getSeconds()

//   return `${hour} : ${minutes} : ${seconds} => [${label}] ${level}: ${message}`
// })
// const logger = createLogger({
//   format: combine(
//     label({ label: 'right meow!' }),
//     timestamp(),
//     myFormat,
//     prettyPrint(),
//   ),
//   level: 'info',
//   defaultMeta: { service: 'user-service' },
//   transports: [
//     // new transports.Console(),
//     new DailyRotateFile({
//       filename: path.join(
//         process.cwd(),
//         'logs',
//         'winston',
//         'success',
//         'sucess-%DATE%-success.log',
//       ),
//       datePattern: 'YYYY-MM-DD-HH',
//       zippedArchive: true,
//       maxSize: '20m',
//       maxFiles: '14d',
//     }),
//   ],
// })

// const errorlogger = createLogger({
//   level: 'error',
//   format: combine(
//     label({ label: 'Error Level Log' }),
//     timestamp(),
//     myFormat,
//     prettyPrint(),
//   ),
//   defaultMeta: { service: 'user-service' },
//   transports: [
//     new transports.Console(),
//     new DailyRotateFile({
//       filename: path.join(
//         process.cwd(),
//         'logs',
//         'winston',
//         'errors',
//         'error-%DATE%-error.log',
//       ),
//       datePattern: 'YYYY-MM-DD-HH',
//       zippedArchive: true,
//       maxSize: '20m',
//       maxFiles: '14d',
//     }),
//   ],
// })

// if (process.env.NODE_ENV !== 'production') {
//   logger.add(
//     new transports.Console({
//       format: format.simple(),
//     }),
//   )
// }
const errorlogger = console.log('somthing log')
const logger = console.log('somthing log')
export { errorlogger, logger }
