import db from "../db";

async function createConversation(fromId, toId) {
  await db.insert({
    "user_1": fromId,
    "user_2": toId
  }).into("conversations")
  .returning("id");
}

async function getConversationByUser(id) {
  return await db.select().from("conversations")
    .where({ user_1: id })
    .orWhere({ user_2: id })
}


export default {
  createConversation,
  getConversationByUser
}
