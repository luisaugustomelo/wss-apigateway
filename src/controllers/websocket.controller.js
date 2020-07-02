
const apigatewayConnector = require('../connectors/apigateway.connector');
const dynamodbConnector = require('../connectors/dynamodb.connector');

const defaultSocketHandler = async (event, context) => {
    try {
        const data = JSON.parse(event.body);
        const action = data.action;

        const connectionId = event.requestContext.connectionId;
        switch (action.toUpperCase()) {
            case 'PING':
                const pingResponse = JSON.stringify({action: 'PING', value: 'PONG'});
                await apigatewayConnector.generateSocketMessage(connectionId, pingResponse);
                break;
            default:
                const invalidResponse = JSON.stringify({action: 'ERROR', error: 'Invalid request'});
                await apigatewayConnector.generateSocketMessage(connectionId, invalidResponse);
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*'
            },
            body: 'Default socket response.'
        };
    } catch (err) {
        console.error('Unable to generate default response', err);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*'
            },
            body: 'Default socket response error.'
        }
    }
};

const handleSocketConnect = async (event, context) => {
    try {

        const connectionId = event.requestContext.connectionId;
        console.log(event);
        const connectionType = event.queryStringParameters.connectionType;

        /* Is necessary send user params in query string **/

        await dynamodbConnector.registerSocket(connectionId, connectionType);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*'
            },
            body: 'Socket successfully registered.'
        };
    } catch (err) {
        console.error('Unable to initialize socket connection', err);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*'
            },
            body: 'Unable to register socket.'
        }
    }
};

const handleSocketDisconnect = async (event, context) => {
    try {
        const connectionId = event.requestContext.connectionId;

        await dynamodbConnector.removeSocket(connectionId);
        console.log(event);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*'
            },
            body: 'Socket successfully terminated.'
        };
    } catch (err) {
        console.error('Unable to terminate socket connection', err);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*'
            },
            body: 'Unable to terminate socket.'
        }
    }
};

module.exports = {
    defaultSocketHandler,
    handleSocketConnect,
    handleSocketDisconnect
};