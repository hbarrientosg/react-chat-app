import api from "../data-access";
import { Router } from "express";
import conversationMapper from "../mappers/conversations";
import userMapper from "../mappers/user";
import messagesMapper from "../mappers/messages";

const router = Router();

router.get('/users/:id/users', function(req, res) {
    api.users.getUsersNotThis(req.params.id)
      .then(users => users.map(userMapper))
      .then(users => res.json(users));
});

router.get('/users', function(req, res) {
  const email = req.query.email;
  if (!email) {
    api.users.getUsers()
      .then(users => users.map(userMapper))
      .then(users => res.json(users));
  } else {
    api.users.getUsersByEmail(email)
      .then(users => users.map(userMapper))
      .then(users => res.json(users));
  }

});

router.get('/users/:id/conversations', function(req, res) {
  const fromId = parseInt(req.params.id, 10);

  api.conversations.getConversationByUser(fromId)
    .then(c => c.map(conversationMapper(fromId)))
    .then(c => res.json(c));
});

router.post('/conversations', function(req, res) {
  const conversation = req.body;

  api.conversations.createConversation(conversation.from, conversation.to)
    .then(id => res.status(203).json(id));

});

router.get('/conversations/:id/messages', function(req, res) {
  const conversationId = req.params.id;

  api.messages.getMessagesByConversation(conversationId)
    .then(msgs => msgs.map(messagesMapper))
    .then(msgs => res.json(msgs))
});

router.post('/messages', function(req, res) {
  const msg = req.body;

  api.messages.createMessage(
    msg.conversationId,
    msg.message,
    msg.userId)
    .then(id => res.status(203).json(id));
});

export default router;
