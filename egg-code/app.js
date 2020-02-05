'use strict';
const sendMsg = require('./app/utils');
module.exports = app => {
  app.sendMsg = sendMsg;
};
