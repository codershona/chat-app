# Design Chat Messager
### Basic Principles
 * This is the introduce of discussing the system design where I am going to design a chat app messenger where I can sent the text based current messages to the current users as well as it is similar like Whatsapp, Facebook Messenger and Telegram.  

### Requirement analysis
#### Functional requirements 
 * In the messenger we can use the one-to-one conversations means individual and private conversations systems.
 * The user can keep track while using the messenger whether the user is in offline status or online status.
 * The user can get all the latest new messages from another users when the users get connected to network. 
 * In the chat server the chat app messenger can able to stored or saved the users chat history.
 * The users can also download the older messages by installing the app into new device.
 * The users can get top 10 users messages by logging into any browser.

#### Non-functional requirements
 * Highly available : The chat service could be always in the top.
 * Minimum Latency : If the user chat with there friends it has least possible to delay.
 * Highly Reliable : The users message can be automatically deleted or can be hidden.
 * Highly Consistent : The users send away messages could be able to make well manageable as well as it can similarly has both one-to-one chat history. 
 * 
 #### Additional requirements

 * The users can able to share files, photos, mp3, voice messages.
 * The users can create and use group chats.
 * Create status which  can be disappeared within 24 hours.
 * The users messages needs to be encrypted.

## API design
 * void sendMessage(senderId, recieverId, message)
 * boolean isOnline(userId)
 * LinkedHashMap<User, List<Message>>> getLatestChat(userId, isBrowser, pagination) in Java.
 * Equivalent of LinkedHashMap in older versions of Python is collections.OrderedDict and from CPython 3.6+ or Python 3.7+ it is the standard Dict.
 * List<Message> getMessages(recieverId, pagination)
	
## Define data model
Here, we need to save the user data and chat history.

<b>User :</b>  userId, name, isOnline, creationtime, status, lastSeen
<br/>
<b>ChatHistory :</b> UserId, friendId, partition, count, messages.
<br/>
<b>Which database to use?</b>

<b>We can use as databse the column oriented database for example, HBase or Cassandra.</b>

<b>User metadata:</b>

```
	{
	userId: user_1;
	name: Jessica;
	creationTimestamp: 10000;  
	status: "Hey how are you and welcome to my chat app";
	isOnline: 1;
	lastSeen: null
},
{
	userId: user_2;
	name: Jerry;
	creationTimestamp: 10000;
	status: "Hey yes, I am fine and I am using your chat app";
	isOnline: 1;
	lastSeen: null
}
```
	
<b>Jessica’s chat history:</b>
```
	{
	userId: user_1;
	friendId: user_2;
	count: 5
	partition: 1
	messages: {
		{
			sender: user1;
			text: "Hello";
			timestamp: 10001
		},
		{
			sender: user2;
			text: "Hey";
			timestamp: 10002
		},
		{
			sender: user1;
			text: "I am fine by the grace of god";
			timestamp: 10003
		},
		{
			sender: user1;
			text: "How do you do?";
			timestamp: 10004
		},
		{
			sender: user2;
			text: "I am alsofine thank you";
			timestamp: 10005
		}
	}
},
{
	userId: user_1;
	friendId: user_2;
	count: 2
	partition: 2
	messages: {
		{
			sender: user1;
			text: "Did you went to college yesterday";
			timestamp: 10006
		},
		{
			sender: user2;
			text: "Yes I had went to the collenge yesterday.";
			timestamp: 10007
		}
	}
}
```


## Back-of-the-envelope calculations
##### Question:

Assuming that, we had 2 million messages which was sent by each second or every two second like if we count in average the message size will be 0.2 KB. In this case, it is required to calculate the amount of data that could be developed within the after 5 or 10 years?

##### Answer:

* 2 Million * 0.2KB = 200000 KB in 2 second = 200MB in 2 second
* 200 * 5600 * 44 = 560000 MB * 44 =  600,000 MB * 45 = 20,000,000 MB = 20000 GB = 20TB in 2 day
* In 2 year we have 730 * 20TB = 7300 TB = 7PB
* In 10 years we have 7 PB * 5 = 35 PB
* Considering that we should not use more that 70% of our capacity we have 35 * 200 / 70 = 100/7 = 14PB


## High level design
High levels design is a actually knowns as functional requirements. 
<br/>
Which communication protocol should be used by our clients or users or visitors?
* HTTP long polling
* Discussion about the HTTP long polling, it actually fulfils our first functional requirements. It has one-to-one conversation systems by using the chat messenger.
* In the second point of the view, this functional requirements has the chat messenger which keep tracks of the online status or offline status.
* Our chat app could able to systematically send an isOnline signal into the chat server during the app in open again.
* The users can able to poll the chat server to check for the users online status.
* In my third point of the view, the functional requirements can also illustrate that the users can able to make a connection with the network so that the users can get receive all the new messages. The users can able to use the getLatestChat API, to check and receive all the latest messages.
*In my fourth point of the view, the chat messenger can able to save and store the chat history into the chat servers which will actually keep users data stored in the data storage. In case the user has installed the apps into anothe phone or device the users can also able to download the old chats. The users can also get the chat history if the user login the chat web application from the browser the user can able to get top 10 users messages. In this process every time the chat server fetches the users latest or older messages from the databases.
	
<p align="center">
	
<img src="https://user-images.githubusercontent.com/57604500/124807318-ec0a9080-df5d-11eb-9523-0070a622889e.jpg" width=756>
<br />
<h3 align="center">Matesapp Chat Messenger</h3>
</p>

<br/>
	
#### Explanation:
* Here, we can see in the diagram, (Visitor 1) and (Visitor 2) can able to make a communication and sendign messages and chat woth each other. Visitor 1 sends the message to Visitor 2 where basically the message pass in to the chat server that gets forwards into the messages. When the Visitor 1 send the message as we know it goes into chat server in this case, the chat server keeps saved the that message into the database or in to data storage as well as it parelly forwards the message to Visitor 2. In this same process, when the Visitor 2 sends the  message to the chat server the chat server keeps this message saved and stored into the data storage and parelly forward to this message to Visitor 2. This is a kind of communication protocols n system design concepts. In this same process chat server keeps save and stored the message in the column of the oriented database. 

## Scale the design
Now I am going to discuss about the non-functional requirements to scale the design.

Highly available – The service should be always up. We need to use no single point of failure principle. We can have backup copies of the load balancer, chat server and databases.
Minimum latency – There should be minimum delay while chatting with your friends. We need to use no bottleneck principle to reduce latency. We can add a queue between the server and database for asynchronous processing.
Highly reliable – There should be no data loss. Having multiple backup copies will ensure that there is no data loss.
Highly consistent – The ordering of the messages should be maintained and should be the same on both the individuals chat history. Having multiple backup copies will ensure that there is no data loss.

 <br>
<p align="center">
	
<img src="https://user-images.githubusercontent.com/57604500/124809924-f9754a00-df60-11eb-9e38-c38c5d585f00.png" width=756>
<br />
<h3 align="center">Chat messenger with message queuer</h3>
</p>

<br/>
