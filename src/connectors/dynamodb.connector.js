'use strict';

const aws = require('aws-sdk');

const CHATCONNECTION_TABLE = 'chatIdTable';

class DynamoDbConnector {
    constructor() {
        this._connector = new aws.DynamoDB.DocumentClient();
    }

    get connector() {
        return this._connector;
    }

    async registerSocket(connectionId, connectionType) {
        const socketParams = {
            TableName: CHATCONNECTION_TABLE,
            Item: {
                connectionId,
                type: connectionType
            }
        };

        return await this._connector.put(socketParams).promise();
    }

    async removeSocket(connectionId) {
        const socketParams = {
            TableName: CHATCONNECTION_TABLE,
            Key: {
                connectionId
            }
        };

        return await this._connector.delete(socketParams).promise();
    }
}

const DYNAMODB_CONNECTOR = new DynamoDbConnector();
module.exports = DYNAMODB_CONNECTOR;