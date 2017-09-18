var socket = io()
var nickName = Date.now()


$('.chat-text').on('keyup', () => {
  if($('.chat-text').val() !== '') {
    socket.emit('typing', {user: nickName})
  } 
  })
  
  socket.on('typing1', (text) => {
    $('.chat-activity').text(text)
  })

$('.chat-submit').on('click', () => {
  var chatText = $('.chat-text').val()
  $('.chat-text').val('')
  const content = `<p class="chat-message">${nickName}: ${chatText}</p>`
  $('.chat-window').append(content)
  socket.emit('message', {
    user: nickName,
    text: chatText
    })
  })
  
$('.name-submit').on('click', () => {
  var oldName = nickName
  nickName = $('.name-text').val()
  $('.name-text').val('')
  socket.emit('change-name', {
    oldName: oldName,
    newName: nickName
    })
  })

socket.on('connect', () => {
  socket.emit('new-user', {user: nickName})
})

socket.on('message', (message) => {
  $('.chat-window').append(message)
})



