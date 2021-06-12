# Chat-App

## Real time web applications with Socket.io (Chat Application)
#### Project Can be found in here :
 **[Live version](https://nameless-wildwood-12156.herokuapp.com/)**

<p align="center">
	
<img src="https://user-images.githubusercontent.com/57604500/121774649-aab3da80-cb83-11eb-8bf9-ce406950a0fc.png" width=656>
<br />
<h3 align="center">CHAT APP</h3>
</p>

## Project Description
This project aims to use Nodejs which is a back-end frameworks to fit a differential equation to the CHAT APPLICATION with users chat data. This would allow us to send our user message and our user also can able to receive our messages. This would be done separately per user as a sender or, as per user as a receiver. The results would be displayed on chat room.

Besides this, The project has implementation of an interesting use case of users current location history: a web application that is send location. The user can enter in the chat room then they can send there message and send location which would display sender's current location. An on the other hadn receiver can view the sender current location.


## Local Setup

### Server

1. Clone repository
```
	git clone https://github.com/codershona/chat-app.git
```

2. Install the server dependencies
```
	npm install
	OR, 
	yarn install
```

3. Start the server
```
	npm run start
	OR,
	yarn run start
```

4. Creating first npm project
```
    npm init Or, yarn init
```

5. Installing Express
```
      npm i express@4.16.4
```

6. Run in the server
```
      node src/index.js
```

7. Installing Nodemon
```
      npm i nodemon@1.18.7 --save-dev
```


8. Run the server
```
       npm run dev
```

8. Installing Socket.io
```
       npm i socket.io@2.2.0
```

8. Installing bad-words package
```
       npm i bad-words@3.0.0
```

9. Run This
```
    node src/utils/users.js
```
## DEPLOYMENT IN HEROKU:

1. In the terminal we need to log in heroku at first,
``` 
     heroku login
```

2. Creating new domain
```
     heroku create
```

3. Push your APP into Heroku
```
     git push heroku master
```



