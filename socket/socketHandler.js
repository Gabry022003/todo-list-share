module.exports = io => {
  io.on('connection', socket => {
    socket.on('add-todo', todo => {
      socket.broadcast.emit('todo-added', todo);
    });
    socket.on('delete-todo', id => {
      socket.broadcast.emit('todo-deleted', id);
    });
  });
};
