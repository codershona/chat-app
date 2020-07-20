const users = []



// addUser, removeUser, getUser, getUsersIn Room 

const addUser = ({ id, username, room }) => {

	// Clean the data 
	username = username.trim().toLowerCase()

	room = room.trim().toLowerCase()


	// Validate the data

	if (!username || !room) {
      
      return {

      	error: 'Username and room are required!'

      }



	}

	// Checking for existing user:

	const existingUser = users.find((user) => {

		return user.room === room && user.username === username 


	})

	// Validate username:

	if (existingUser) {

		return {

			error: 'Username is in use!'

		}

	}

	// Storing users:

	const user = { id, username, room } 
	users.push(user)
	return { user }


}

addUser({
	id: 22,
	username: 'Jonny Papa ',
	room: 'North America'

})


console.log(users)

