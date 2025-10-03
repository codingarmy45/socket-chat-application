const express = require('express');
const UserAuth = require('../middleware/Auth.middleware.js');
const {
  createChat,
  getUserChats,
  getChatById
} = require('../controller/chat.controller.js');

const router = express.Router();

router.get('/chat/:id',UserAuth, getChatById)
router.post('/chat',UserAuth, createChat)
router.get('/chat',UserAuth, getUserChats)

module.exports = router;