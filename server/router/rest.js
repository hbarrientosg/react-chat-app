import api from "../data-access";
import { Router } from "express";
import conversationMapper from "../mappers/conversations";
const router = Router();

router.get('/users/:id/users', function(req, res) {
    api.users.getUsersOfId(req.params.id)
      .then(users => res.json(users));
});

/*
router.post('/users', function(req, res) {
  api.users.getUsers().then(res.json);
});
*/

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

/*
router.get('/conversations/:id/messages', function(req, res) {
  console.log(req.query)
  res.json([
    { id:1, email: "alice@x.com", is_online: false },
    { id:2, email: "bob@x.com", is_online: false },
  ])
});

router.post('/messages', function(req, res) {
  console.log(req.query)
  res.json([
    { id:1, email: "alice@x.com", is_online: false },
    { id:2, email: "bob@x.com", is_online: false },
  ])
});

*/
export default router;
