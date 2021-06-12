# Chat-App

## Real time web applications with Socket.io (Chat App)
#### Project Can be found in here :
 **[Live version](https://nameless-wildwood-12156.herokuapp.com/)**

* NOTES :

```
    - npm init ;
    - npm i express@4.16.4 ;
    - node src/index.js ;
    - npm i nodemon@1.18.7 --save-dev ;
    - npm run start ;
    - npm run dev ;
    -  npm i socket.io@2.2.0 ;
    - npm i bad-words@3.0.0 ;
    -  Run this node src/utils/users.js ;
    * DEPLOY THE APP IN HEROKU:
    - heroku login ;
    - heroku create ;
    - git push heroku master
    
```
<p align="center">
	
<img src="https://user-images.githubusercontent.com/57604500/121774649-aab3da80-cb83-11eb-8bf9-ce406950a0fc.png" width=656>
<br />
<h3 align="center">CHAT APP</h3>
</p>

## Project Description
This project aims to use SciML to fit a differential equation to the COVID-19 Number-Of-Cases time series data. This would allow us to predict the number of cases in the future, to some degree of accuracy. This would be done separately per district or state, as per the availability of reliable data. The results would be displayed on an interactive graphical webpage.

The project also implements an interesting use case of the prediction model: a mobile application that is a personal scheduler/calendar. The user can enter where they are headed to in the next few days, and the application would warn them if those regions are predicted to have a high number of cases then.

Data sourced from https://api.covid19india.org/.

## Source organization

- Server code is present in [`Server`](Server/) directory
- Datasets and the preprocessing script used are present in [`Dataset`](Dataset/) directory
- Trained models are in [`BSON`](https://github.com/JuliaIO/BSON.jl) format in the [`Server/data`](Server/data) directory
- Source of react native application is present in the [`Application/`](Application/) directory with the build files (APK et al) in [`Application/dist`](Application/dist) directory

![webapp](Screenshots/webapp.png)

<p align="center">
	<i>Web Application Homepage</i>
</p>

## Local Setup

### Server

1. Clone repository
```
	git clone 
```

2. Install the server dependencies
```
	
```

3. Start the server
```
	
```






