export default function userMapper(user) {
  return {
    id: user.id,
    email: user.email,
    isOnline: user.is_online,
  };
}
