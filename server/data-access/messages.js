import db from "../db";

async function createMessage(id, message, userId) {
  return await db.insert({
    "conversation_id": id,
    "message": message,
    "created_by": userId,
    "created_at": new Date(),
    "is_read": false
  }).into("messages")
  .returning("id");
}

async function getMessagesByConversation(id) {
  return await db.select().from("messages")
    .where({ conversation_id: id })
}

export default {
  createMessage,
  getMessagesByConversation
}
