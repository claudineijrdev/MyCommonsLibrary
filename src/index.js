const monitoring = require('./monitoring');

module.exports = {
    monitoring,

}
// const express = require('express');
// const { Router } = require('express');

// const app = express();
// app.use(httpContext)
// app.use(setContext)
// const port = 3000;
// const routes = Router();

// const transport = ConsoleLoggerTransport({ name: 'console', level: 'info', space: 1, silent: false });
// InitializeLoggers([transport], 'app');

// TraceLog({ message: 'Test Trace Log' }, { messageType: MessageEnum.DB_CONECTED, replaceString: 'Any_DB' });
// ErrorLog(new Error("Test Error Log"),{ trace : 'trace only for test' }, { messageType: MessageEnum.UNCAUGHT_EXCEPTION, replaceString: '' });

// app.use(RequestMiddleware)
// app.use(ResponseMiddleware)

// routes.get('/', (req, res) => res.send('Hello World!'));
// routes.get('/test', (req, res) => res.send('OK'));
// routes.get('/error', (req, res) => {
//     throw new Error('Test Error on Endpoint')
// });

// app.use(routes);
// app.use(ErrorMiddleware)


// app.listen(port, () => {
//     console.log(`Running at http://localhost:${port}`);
// });
