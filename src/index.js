const http = require('http')

const path = require('path')

const express = require('express')

const socketio = require('socket.io')

const app = express()

const server = http.createServer(app)

const io = socketio(server)

const Filter = require('bad-words')

const { generateMessage, generateLocationMessage } = require('./utils/messages')



const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


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

     socket.on('join', ({ username, room }) => {

      socket.join(room)

      socket.emit('message', generateMessage('Welcome!'))

    socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined!`))

    


      // socket.emit, io.emit, socket.broadcast.emit

      // io.to.emit, socket.broadcast.to.emit

     })


    // socket.on('sendMessage', (message) => {
     socket.on('sendMessage', (message, callback) => {

        const filter = new Filter()

        if (filter.isProfane(message)) {

            return callback('Profanity is not allowed!')

        }

     	// io.emit('message', message)
        io.emit('message', generateMessage(message))

        // callback('Delivered!')
         callback()
      
    })

     socket.on('disconnect', () => {
     
       // io.emit('message', 'A user has left!')
       io.emit('message', generateMessage('A user has left!'))

     })

     // socket.on('sendLocation', (coords) => {
  socket.on('sendLocation', (coords, callback) => {

      // io.emit('message', `Location: ${coords.latitude},${coords.longitude}`)
      // io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)

   // io.emit('locationMessage', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
   io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))


     callback()

     

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





