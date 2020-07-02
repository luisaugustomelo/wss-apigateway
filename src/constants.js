'use strict'

require('dotenv').config()

const CONSTANTS = {
    ENVIRONMENT: process.env.ENVIRONMENT,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    DYNAMODB_SOCKETS_TABLE: process.env.DYNAMODB_SOCKETS_TABLE,
    WEBSOCKET_API_ENDPOINT: process.env.WEBSOCKET_API_ENDPOINT,
    API_VERSION: process.env.API_VERSION
}

module.exports = CONSTANTS;