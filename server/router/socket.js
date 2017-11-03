

export default function createListeners(socket) {
  socket.on('sendMessage', ({ userId }) => {
    socket.broadcast.emit('updateMessages', { userId });
  });
}
