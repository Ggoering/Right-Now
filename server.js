const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.emit('message', `<p class="chat-message">Welcome to the chat room. We hope you enjoy talking to yourself</p>`)
  
  socket.on('new-user', (user) => {
    socket.broadcast.emit('message', `<p class="chat-message">${user.user} has connected.</p>`)
  })
  
  socket.on('change-name', (user) => {
    socket.broadcast.emit('message', `<p class="chat-message">${user.oldName} is now called ${user.newName}.</p>`)
  })
  
  socket.on('typing', (user) => {
    socket.broadcast.emit('typing1', `${user.user} is typing...`)
  })
  
  socket.on('message', (message) => {
    socket.broadcast.emit('message', `<p class="chat-message">${message.user}: ${message.text}</p>`)
  })
  
  socket.on('disconnect', (stuff) => {
    socket.broadcast.emit('message', `<p class="chat-message">a user has left the chat.</p>`)
  })
})




app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

http.listen(process.env.PORT || 3000, function(){
  console.log('Your server is up and running on Port 3000. Good job!');
});
