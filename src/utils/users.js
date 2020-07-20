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

const getUser = (id) => {

	return users.find((user) => user.id === id)

}

const getUsersInRoom = (room) => {

	room = room.trim().toLowerCase()

	return users.filter((user) => user.room === room)

}

module.exports = {
	
	addUser,
	removeUser,
	getUser,
	getUsersInRoom

}

// addUser({

// 	id: 22,
// 	username: 'Jonny Papa ',
// 	room: 'North America'

// })

// addUser({

// 	id: 42,
// 	username: 'Michael Mike ',
// 	room: 'South America'

// })

// addUser({

// 	id: 32,
// 	username: 'Lissa Michi ',
// 	room: 'Center City'


// })

// // const user = getUser(42)
// const user = getUser(421)
// console.log(user)

// // const userList = getUsersInRoom('South America')
// // const userList = getUsersInRoom('Center City')
// const userList = getUsersInRoom('fairmount')

// // console.log(user)  ----: this will show undefined in console.

// console.log(userList)


// console.log(users)

// const res = addUser({

// 	id: 33,
// 	// username: '',
// 	username: 'Lissa Mimi',
// 	// room: ''
// 	room: 'north vasby'

// })

// console.log(res)

// const removedUser = removeUser(24)

// const removedUser = removeUser(22)

// console.log(removedUser)
// console.log(users)


