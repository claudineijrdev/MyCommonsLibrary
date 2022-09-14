const httpContext = require('express-http-context')

const requestLogger = async ({request, logger, appName}) => {
  console.log('requestLogger')
  if (request.headers.referer) {
    if (request.headers.referer.includes('/queue')) {
      return;
    }
  }
  if (!['/', '/healthz'].includes(request.originalUrl) && !request.url.includes('/queue')) {
    const reqId = httpContext.get('reqId')
    const eventId = httpContext.get('eventId')
    const start = process.hrtime()
    request.headers['x-response-time'] = start
    const reqHeaders = request.headers
    if (reqHeaders.apptoken) {
      delete reqHeaders.apptoken
    }
    await logger.info(`REQUEST INFO: ${reqId}`, [
      {
        startTime: new Date(),
        requestId: reqId,
        eventId,
        host: request.hostname,
        url: request.url,
        method: request.method,
        requestHeader: reqHeaders,
        requestParams: request.params,
        requestBody: request.body,
        requestQuery: request.query,
        appName,
      },
    ])
  }
}

module.exports = {
  requestLogger,
}
