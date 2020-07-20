const http = require('http')

const path = require('path')

const express = require('express')

const socketio = require('socket.io')

const app = express()

const server = http.createServer(app)

const io = socketio(server)

const Filter = require('bad-words')

const { generateMessage, generateLocationMessage } = require('./utils/messages')


const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')


const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

// Render username for text messages:



// server (emit) -> client (receive) - countUpdated

// client (emit) -> server (receive) - increment



// let count = 0

io.on('connection', (socket) => {

	console.log('New WebSocket connection!')

    // socket.emit('message', 'Welcome!')
    // socket.emit('message', {

    //     text: 'Welcome!',

    //     createdAt: new Date().getTime()

    // })

   //  socket.emit('message', generateMessage('Welcome!'))


    // socket.broadcast.emit('message', 'A new user has joined!')
   //  socket.broadcast.emit('message', generateMessage('A new user has joined!'))

     // socket.on('join', ({ username, room }, callback) => {
   socket.on('join', (options, callback) => {

      // const { error, user } = addUser({ id: socket.id, username, room })
       const { error, user } = addUser({ id: socket.id, ...options })

   if (error) {

       return callback(error)

   }

      socket.join(user.room)

      socket.emit('message', generateMessage('ADMIN', 'Welcome!'))

    socket.broadcast.to(user.room).emit('message', generateMessage('ADMIN', `${user.username} has joined!`))
    
    io.to(user.room).emit('roomData', {

      room: user.room,
      users: getUsersInRoom(user.room)




    })
     
     callback()


      // socket.emit, io.emit, socket.broadcast.emit

      // io.to.emit, socket.broadcast.to.emit

     })


   // Send messages to correct room :




    // socket.on('sendMessage', (message) => {
     socket.on('sendMessage', (message, callback) => {

      const user = getUser(socket.id)



        const filter = new Filter()

        if (filter.isProfane(message)) {

            return callback('Profanity is not allowed!')

        }

     	// io.emit('message', message)
        // io.to('Center City').emit('message', generateMessage(message))
  io.to(user.room).emit('message', generateMessage(user.username, message))

        // callback('Delivered!')
         callback()
      
    })



         // socket.on('sendLocation', (coords) => {
  socket.on('sendLocation', (coords, callback) => {

    const user = getUser(socket.id)

      // io.emit('message', `Location: ${coords.latitude},${coords.longitude}`)
      // io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)

   // io.emit('locationMessage', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
   // io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))

  io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))

     callback()

     

     })



     socket.on('disconnect', () => {

      const user = removeUser(socket.id)

      if (user) {

        io.to(user.room).emit('message', generateMessage('ADMIN', `${user.username} has left!`))

        io.to(user.room).emit('roomData', {
          room: user.room,
          users: getUsersInRoom(user.room)

        })


      }
     
       // io.emit('message', 'A user has left!')
       // io.emit('message', generateMessage('A user has left!'))

     })

 


	// socket.emit('countUpdated', count)

	// socket.on('increment', () => {
	// 	count++

	// 	// socket.emit('countUpdated', count)

	// 	io.emit('countUpdated', count)



	// })



})


// app.listen(port, () => {

 server.listen(port, () => {

	console.log(`Server is up on port ${port}!`)

}) 




// NOTES :  The WebSocket Protocol:


// * Websockets allow for full-duplex communication ;
// * Web socket is a seperate protocol from HTTP ;
// * Persistent connection between client and server ;
// * Client -> Server (My new message)
// * Server -> Client Others users message

// * Server -> Client Others users message

// * Server -> Client Ohter users message 





