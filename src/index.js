const http = require('http')

const path = require('path')

const express = require('express')

const socketio = require('socket.io')


const app = express()

const server = http.createServer(app)

const io = socketio(server)

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', () => {

	console.log('New WebSocket connection!')

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





