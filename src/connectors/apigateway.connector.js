'use strict';

const aws = require('aws-sdk');

// const CONSTANTS = require('./../constants');
// const dynamodbConnector = require('./dynamodb.connector');

class ApiGatewayConnector {
    constructor(event) {
        const CONNECTOR_OPTS = {
            endpoint: event.requestContext.domainName + "/" + event.requestContext.stage,
            apiVersion: "2018-11-29",
        };
        this._connector = new aws.ApiGatewayManagementApi(CONNECTOR_OPTS);
    }

    get connector() {
        return this._connector;
    }

    async generateSocketMessage(connectionId, data) {
        try {
            return await this._connector.postToConnection({
                ConnectionId: connectionId,
                Data: data
            }).promise();
        } catch (error) {
            console.error('Unable to generate socket message', error);
            if (error.statusCode === 410) {
                console.log(`Removing stale connector ${connectionId}`);
                await dynamodbConnector.removeSocket(connectionId);
            }
        }
    }
}

const APIGW_CONNECTOR = new ApiGatewayConnector();
module.exports = APIGW_CONNECTOR;