
export default function messageMapper(msg) {
  return {
    id: msg.id,
    message: msg.message,
    createBy: msg.created_by,
    createAt: msg.created_at
  };
}
