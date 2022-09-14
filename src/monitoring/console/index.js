const winston = require('winston');

const getOptions = ({ name, level, format: space, silent }) => {
    return {
        name: name || 'console',
        level: level || 'info',
        format: winston.format.json({ space: space || 1 }),
        silent: silent || false,
    }
}

/**
 * @param {string} name - logger identifier 
 * @param {string} level - 'error', 'warn', 'info', 'verbose', 'debug', 'silly' 
 * @param {number} space - it's json by default, just inform the space ammount  
 * @param {boolean} silent - if true, no logs will be written 
 * @returns ConsoleTransportInstance 
 */
const getTransport = (consoleParams) => {
    const options = getOptions(consoleParams)
    return new winston.transports.Console(options);
}

module.exports = {
    ConsoleLoggerTransport: getTransport
}