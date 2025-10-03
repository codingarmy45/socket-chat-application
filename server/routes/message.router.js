const express = require('express');
const userAuth = require('../middleware/Auth.middleware.js')
const {
  sendMessage,
  getMessagesForChat,
} = require('../controller/message.controller.js');

const router = express.Router();

router.get('/message/:chatId', getMessagesForChat);
router.post('/message', userAuth, sendMessage);

module.exports = router;