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


const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML




// options:

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

const autoscroll = () => {

  const $newMessage = $messages.lastElementChild

  const newMessageStyles = getComputedStyle($newMessage)

  const newMessageMargin = parseInt(newMessageStyles.marginBottom)


  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin 


  // console.log(newMessageStyles)

  // Visible Height:

  const visibleHeight = $messages.offsetHeight

  // Height of message container:

  const containerHeight = $messages.scrollHeight

  // How far have I scrolled?

  const scrollOffset = $messages.scrollTop + visibleHeight

  if (containerHeight - newMessageHeight <= scrollOffset) {

    $messages.scrollTop = $messages.scrollHeight

  }






}



// server (emit) -> client (receive) --acknowledgement--> server

// client (emit) -> server (receive) --acknowledgement--> client

// challenge:


socket.on('message', (message) => {

	console.log(message)

	const html = Mustache.render(messageTemplate, {

    username: message.username,

		// message
      message: message.text,
      // createdAt: message.createdAt
      // createdAt: moment(message.createdAt).format('h')
      // createdAt: moment(message.createdAt).format('h:mm')
      createdAt: moment(message.createdAt).format('h:mm a')



	})

	$messages.insertAdjacentHTML('beforeend', html)

  autoscroll()


})


// challenge:

// socket.on('locationMessage', (url) => {
  socket.on('locationMessage', (message) => {

  // console.log(url)
  console.log(message)

  const html = Mustache.render(locationMessageTemplate, {

    username: message.username,
    // url 
    url: message.url,

    createdAt: moment(message.createdAt).format('h:mm a')

  })

  $messages.insertAdjacentHTML('beforeend', html)
  autoscroll()

})


  socket.on('roomData', ({ room, users }) => {

    // console.log(room)
    // console.log(users)

    const html = Mustache.render(sidebarTemplate, {

      room,
      users


    })

    document.querySelector('#sidebar').innerHTML = html



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



socket.emit('join', { username, room }, (error) => {

  if (error) {
    alert(error) 
    location.href = '/'

  }

})



