
export default function conversationMapper(id) {
  return (conversation) => ({
    id: conversation.id,
    from: id,
    to: conversation.user_2 !== id ? conversation.user_2 : conversation.user_1
  });
}
