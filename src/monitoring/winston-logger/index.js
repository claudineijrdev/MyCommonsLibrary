const BaseLog = require("../interface/base_log");

module.exports = class WinstonLogger extends BaseLog {
    constructor(logger) {
        super();
        this.logger = logger
    }
    async log(message) {
        return this.logger.log(message);
    }
    async error(message, data) {
        return this.logger.error(message, data);
    }
    async warn(message) {
        return this.logger.warn(message);
    }
    async info(message, data) {
        return this.logger.info(message, data);
    }

}