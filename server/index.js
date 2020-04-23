const http = require('http').createServer();
const io = require('socket.io')(http);

http.listen(3000);

let users = [];

io.on('connection', socket => {
  socket.on('new_user', (name,location) => {
    users.push({
      id: socket.id,
      name,
      location
    });

    io.emit('users', users);
  });

  socket.on('new_location', (location) => {
    users.forEach(u => {
      if(u.id == socket.id) {
        u.location = location;
      }
    });

    io.emit('users', users);
  });

  socket.on('disconnect', () => {
    const index = users.indexOf(socket.id);
    users.splice(index, 1);
    
    io.emit('users', users);
  });
});