const baseLog = require('../interface/base_log');
const messageBuilder = require("../builder/message-builder");
const { messageEnum } = require('../builder/message.enum');
/**
 * @param {baseLog} logger - instance implementing baseLog interface 
 * @param {object} error - error object  
 * @param {messageEnum} messageType - message type - messageEmun 
 * @param {string} replaceString - string to replace '$$$' in the message
 */
const errorLog = async (logger, error, logInfo, { messageType, replaceString }) => {
    const message = messageType && messageBuilder(messageType, replaceString);
    await logger.error(`ERROR ALERT: ${message} - ${error.message}`, [logInfo]);
}
module.exports = {
    errorLog,
}