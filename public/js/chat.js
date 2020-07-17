const socket = io()

// server (emit) -> client (receive) --acknowledgement--> server

// client (emit) -> server (receive) --acknowledgement--> client



socket.on('message', (message) => {

	console.log(message)

})

document.querySelector('#message-form').addEventListener('submit', (e) => {
   
   e.preventDefault()

   // const message = document.querySelector('input').value

   const message = e.target.elements.message.value



   // socket.emit('sendMessage', message)

   // socket.emit('sendMessage', message, (message) => {
   	socket.emit('sendMessage', message, (error) => {

   	// console.log('The message was delivered!', message)

   	if (error) {

   		return console.log(error)

   	}

   	console.log('Message delivered!')





   })


})


document.querySelector('#send-location').addEventListener('click', () => {
   
   if (!navigator.geolocation) {

   	return alert('Geolocation is not supported by your browser.')

   }

   navigator.geolocation.getCurrentPosition((position) => {
    
    // console.log(position)
    socket.emit('sendLocation', {

    	latitude: position.coords.latitude,
    	longitude: position.coords.longitude

       }, () => {

       	console.log('Location shared!')


       })

   })

})






// socket.on('countUpdated', (count) => {

// 	console.log('The count has been updated!', count)
	
// })



// document.querySelector('#increment').addEventListener('click', () => {

//    console.log('Clicked')

//    socket.emit('increment')


// })



// Socket.io Events Challenge:

   

// Sharing your location:sss



