const { messageEnum } = require('./builder/message.enum');
const winston = require('winston')
const { ConsoleLoggerTransport } = require('./console');
const { ElasticsearchLoggerTransport } = require('./elasticsearch');
const Logger = require('./winston-logger');
const { errorLog, traceLog } = require('./logs');
const { requestLogger } = require('./middleware/request');
const { responseLogger } = require('./middleware/response');
const {httpContext,setContext} = require('./middleware/http-context');
const expressHttpContext = require('express-http-context')

const transports = []
let logger = null
let appName = "app"

const InitializeLoggers = (transporters, aplicationName) => {
  appName = aplicationName
  if (logger) return logger
  if (!transporters) {
    throw new Error('No transports provided')
  }
  transports.push(...transporters)
  const loggerConfiguration = {
    transports: [...transports],
  }
  const winstonlogger = winston.createLogger(loggerConfiguration) 
  logger = new Logger(winstonlogger)
  return logger
}

/**
 * 
 * @param {Error} error - Error object
 * @param {Object} logInfo - Additional information to be logged 
 * @param {{messageType, replaceString }} messageType - Type of message to be logged 
 */
const ErrorLog = async (error, logInfo, messageType) => {
  if (logger === null) {
    throw new Error('Logger not initialized')
  }
  try {
    await errorLog(logger, error, logInfo, messageType)
  } catch (error) {
    throw error
  }
}
/**
 * 
 * @param {Object[]} transports - Array of transports to be used by the logger 
 * @param {Error} error - Error object
 * @param {Object} logInfo - Additional information to be logged 
 * @param {{messageType, replaceString }} messageType - Type of message to be logged 
 */
const TraceLog = async (logInfo, messageType) => {
  if (logger === null) {
    throw new Error('Logger not initialized')
  }
  try {
    await traceLog(logger, logInfo, messageType)
  } catch (error) {
    throw error
  }
}

const RequestMiddleware = async (request, _, next) => {
  if (!logger) {
    throw new Error('Logger not initialized')
  }
  console.log("RequestMiddleware")
  await requestLogger({ request, logger, appName })
  next()
}

const ResponseMiddleware = async (request, response, next) => {
  if (!logger) {
    throw new Error('Logger not initialized')
  }
  await responseLogger({ request, response, logger, appName })
  next()
}

const ErrorMiddleware = async (error, request, response, _) => {
  if (!logger) {
    throw new Error('Logger not initialized')
  }
  const reqId = expressHttpContext.get('reqId')
  const eventId = expressHttpContext.get('eventId')
  const errorView =     {
    errorInfo: error,
    requestId: reqId,
    eventId: eventId,
    destinationInfo: request.url,
    bodyInfo: request.body,
    headersInfo: request.headers,
    queryInfo: request.query,
    statusInfo: response.status,
    originInfo: request.originalUrl,
  }
  await ErrorLog(error, errorView, { messageType: messageEnum.UNCAUGHT_EXCEPTION, replaceString: '' })
  response.status(error.status || 500).send(error.message)
}

module.exports = {
  ConsoleLoggerTransport,
  ElasticsearchLoggerTransport,
  InitializeLoggers,
  ErrorLog,
  TraceLog,
  RequestMiddleware,
  ResponseMiddleware,
  ErrorMiddleware,
  MessageEnum: messageEnum,
  httpContext, 
  setContext,

}