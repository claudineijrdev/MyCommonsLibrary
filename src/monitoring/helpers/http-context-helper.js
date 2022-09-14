const httpContext = require('express-http-context')

const contextMiddleware = httpContext.middleware

module.exports = {
  contextMiddleware,

  setContext(key, data) {
    httpContext.set(key, data)
  },

  getContext(key) {
    return httpContext.get(key)
  },
}
