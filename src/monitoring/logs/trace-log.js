const baseLog = require('../interface/base_log');
const messageBuilder = require("../builder/message-builder");
const { messageEnum } = require('../builder/message.enum');
/**
 * @param {baseLog} logger - instance of monitoring logger 
 * @param {object} error - error object  
 * @param {messageEnum} messageType - message type - messageEmun 
 * @param {string} replaceString - string to replace '$$$' in the message
 */
const traceLog = async (logger, logInfo, { messageType, replaceString }) => {
    const message = messageType && messageBuilder(messageType, replaceString);
    await logger.info(`MONITORING STEP: ${message}`, [logInfo]);
}
module.exports = {
    traceLog,
}