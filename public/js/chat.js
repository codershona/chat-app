const socket = io()

socket.on('message', (message) => {

	console.log(message)

})

document.querySelector('#message-form').addEventListener('submit', (e) => {
   
   e.preventDefault()

   // const message = document.querySelector('input').value

   const message = e.target.elements.message.value



   socket.emit('sendMessage', message)


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



