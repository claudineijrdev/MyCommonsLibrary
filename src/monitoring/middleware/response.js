const httpContext = require('express-http-context')

const getDurationInMilliseconds = start => {
  const NS_PER_SEC = 1e9
  const NS_TO_MS = 1e6
  const diff = process.hrtime(start)

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

const responseLogger = async ({request, response, logger, appName}) => {
  const oldWrite = response.write
  const oldEnd = response.end
  const chunks = []
  let body = null
  let durationInMilliseconds = 0
  const start = request.headers['x-response-time']

  response.write = function (chunk) {
    chunks.push(chunk)
    return oldWrite.apply(response, arguments)
  }

  response.end = function (chunk) {
    if (chunk) {
      chunks.push(chunk)
    }
    if (response.statusCode === 200) {
      body = Buffer.concat(chunks).toString('utf8')
    }
    oldEnd.apply(response, arguments)
    response.body = body
  }

  response.on('close', async () => {
    const reqId = httpContext.get('reqId')
    const eventId = httpContext.get('eventId')
    durationInMilliseconds = getDurationInMilliseconds(start)
    if (request.headers.referer) {
      if (request.headers.referer.includes('/queue')) {
        next()
      }
    }
    if (!['/', '/healthz'].includes(request.originalUrl) && !request.url.includes('/queue')) {
      const reqHeaders = request.headers
      if (reqHeaders.apptoken) {
        delete reqHeaders.apptoken
      }
      await logger.info(`RESPONSE INFO: ${reqId}`, {
        startTime: new Date(),
        requestId: reqId,
        eventId,
        host: request.hostname,
        url: request.url,
        method: request.method,
        status: response.statusCode,
        requestHeader: reqHeaders,
        responseHeader: response.headers,
        responseBody: response.body,
        requestParams: request.params,
        requestBody: request.body,
        requestQuery: request.query,
        responseTime: durationInMilliseconds.toFixed(2).toLocaleString(),
        appName,
      })
    }
  })
}
module.exports = {responseLogger}
