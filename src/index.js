const http = require('http')

const path = require('path')

const express = require('express')

const socketio = require('socket.io')

const app = express()

const server = http.createServer(app)

const io = socketio(server)

const Filter = require('bad-words')

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


// server (emit) -> client (receive) - countUpdated

// client (emit) -> server (receive) - increment



// let count = 0

io.on('connection', (socket) => {

	console.log('New WebSocket connection!')

    socket.emit('message', 'Welcome!')

    socket.broadcast.emit('message', 'A new user has joined!')



    // socket.on('sendMessage', (message) => {
     socket.on('sendMessage', (message, callback) => {

        const filter = new Filter()

        if (filter.isProfane(message)) {

            return callback('Profanity is not allowed!')

        }

     	io.emit('message', message)

        // callback('Delivered!')
         callback()
      
    })

     socket.on('disconnect', () => {
     
       io.emit('message', 'A user has left!')

     })

     // socket.on('sendLocation', (coords) => {
  socket.on('sendLocation', (coords, callback) => {

      // io.emit('message', `Location: ${coords.latitude},${coords.longitude}`)
      io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)

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





