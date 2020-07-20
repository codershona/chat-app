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

const removeUser = (id) => {
	// const index = users.findIndex((user) => {
     
 //     return user.id === id


	// })


	const index = users.findIndex((user) => user.id === id)

	if (index !== -1) {

		// return users.splice(0)
		return users.splice(index, 1)[0]

	}


}

addUser({
	id: 22,
	username: 'Jonny Papa ',
	room: 'North America'

})


console.log(users)

// const res = addUser({

// 	id: 33,
// 	// username: '',
// 	username: 'Lissa Mimi',
// 	// room: ''
// 	room: 'north vasby'

// })

// console.log(res)

// const removedUser = removeUser(24)

const removedUser = removeUser(22)

console.log(removedUser)
console.log(users)


