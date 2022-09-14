const errorMiddlewareLogger = async ({ request, response, error, logger, appName }) => {
  await logger.error('Request error', [
    {
      error,
      request,
      response,
      appName,
    },
  ])
}
module.exports = { errorMiddlewareLogger }