'use strict';
const {
  defaultSocketHandler,
  handleSocketConnect,
  handleSocketDisconnect
} = require('./src/controllers/websocket.controller');

module.exports.defaultSocketHandler = defaultSocketHandler;
module.exports.handleSocketConnect = handleSocketConnect;
module.exports.handleSocketDisconnect = handleSocketDisconnect;
