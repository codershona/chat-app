const socket = io()


// Elements:

const $messageForm = document.querySelector('#message-form')

const $messageFormInput = $messageForm.querySelector('input')

const $messageFormButton = $messageForm.querySelector('button')

const $sendLocationButton = document.querySelector('#send-location')

const $messages = document.querySelector('#messages')

// Templates:

const messageTemplate = document.querySelector('#message-template').innerHTML

const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML



// server (emit) -> client (receive) --acknowledgement--> server

// client (emit) -> server (receive) --acknowledgement--> client

// challenge:


socket.on('message', (message) => {

	console.log(message)

	const html = Mustache.render(messageTemplate, {

		// message
      message: message.text,
      // createdAt: message.createdAt
      // createdAt: moment(message.createdAt).format('h')
      // createdAt: moment(message.createdAt).format('h:mm')
      createdAt: moment(message.createdAt).format('h:mm a')



	})

	$messages.insertAdjacentHTML('beforeend', html)


})


// challenge:

socket.on('locationMessage', (url) => {

  console.log(url)

  const html = Mustache.render(locationMessageTemplate, {
    url 

  })

  $messages.insertAdjacentHTML('beforeend', html)

})




// document.querySelector('#message-form').addEventListener('submit', (e) => {
$messageForm.addEventListener('submit', (e) => {
   
   e.preventDefault()

   $messageFormButton.setAttribute('disabled', 'disabled')

   // const message = document.querySelector('input').value

   const message = e.target.elements.message.value



   // socket.emit('sendMessage', message)

   // socket.emit('sendMessage', message, (message) => {
   	socket.emit('sendMessage', message, (error) => {

   		$messageFormButton.removeAttribute('disabled')

   		$messageFormInput.value = ''

   		$messageFormInput.focus()


   	// console.log('The message was delivered!', message)

   	if (error) {

   		return console.log(error)

   	}

   	console.log('Message delivered!')





   })


})


$sendLocationButton.addEventListener('click', () => {
   
   if (!navigator.geolocation) {

   	return alert('Geolocation is not supported by your browser.')

   }

   $sendLocationButton.setAttribute('disabled', 'disabled')



   navigator.geolocation.getCurrentPosition((position) => {
    
    // console.log(position)
    socket.emit('sendLocation', {

    	latitude: position.coords.latitude,
    	longitude: position.coords.longitude

       }, () => {

       	$sendLocationButton.removeAttribute('disabled')



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



