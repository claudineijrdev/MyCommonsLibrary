const { ElasticsearchTransport } = require('winston-elasticsearch');
const elasticsearch = require('elasticsearch');
const aws = require('aws-sdk')
const httpAwsEs = require('http-aws-es')

const getOptions = ({ host, port, protocol, accessKeyId, secretAccessKey, region }) => {
    return {
        host,
        port,
        protocol: protocol || 'https',
        connectionClass: httpAwsEs,
        awsConfig: new aws.Config({
            credentials: new aws.Credentials(
                accessKeyId,
                secretAccessKey,
            ),
            region,
        }),
    }
}

/**
 * 
 * @param {string} level - 'error', 'warn', 'info', 'verbose', 'debug', 'silly' 
 * @param {string} index - log identifier - default: 'logs' 
 * @param {string} host - elasticsearch host 
 * @param {string} port - elasticsearch port 
 * @param {string} protocol - elasticsearch protocol - default: 'https' 
 * @param {string} accessKeyId - aws access key id 
 * @param {string} secretAccessKey - aws secret access key 
 * @param {string} region - aws region
 * @returns ElasticsearchTransport
 */
const getTransport = (configuration) => {
    const { level, index } = configuration;
    const loggerConfigurations = {
        transports: []
    }
    const options = getOptions(configuration)
    const elasticsearchClient = elasticsearch.Client(options);
    return new ElasticsearchTransport({
        client: elasticsearchClient,
        level: level || 'info',
        index: index || 'logs',
    });
}

module.exports = {
    ElasticsearchLoggerTransport: getTransport
}