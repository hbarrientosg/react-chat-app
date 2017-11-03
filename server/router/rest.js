import api from "../data-access";
import { Router } from "express";

const router = Router();

router.get('/users', function(req, res) {
  const query = req.query;

  switch (query) {
    case "email":
      api.users.getUsersOfEmail(query.email)
        .then(users => res.json(users));
    default:
      api.users.getUsers()
        .then(users => res.json(users));
  }
});

/*
router.post('/users', function(req, res) {
  api.users.getUsers().then(res.json);
});

router.get('/users/:id/conversations', function(req, res) {
  console.log(req.query)
  // with=id
  res.json([
    { id:1, email: "alice@x.com", is_online: false },
    { id:2, email: "bob@x.com", is_online: false },
  ])
});

router.get('/conversations/:id/messages', function(req, res) {
  console.log(req.query)
  res.json([
    { id:1, email: "alice@x.com", is_online: false },
    { id:2, email: "bob@x.com", is_online: false },
  ])
});

router.post('/conversations', function(req, res) {
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
