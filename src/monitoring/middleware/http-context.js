const { v4: uuidv4 } = require('uuid')
const httpContextHelper = require('../helpers/http-context-helper')

const httpContext = httpContextHelper.contextMiddleware

const setContext = (req, res, next) => {
  const eventId = req.headers['x-event-id'] || uuidv4()
  httpContextHelper.setContext('reqId', uuidv4())
  httpContextHelper.setContext('eventId', eventId)
  next()
}

module.exports = { httpContext, setContext }
