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
We need to save user data and chat history.

User : userId, name, isOnline, creationtime, status, lastSeen

ChatHistory : UserId, friendId, partition, count, messages.

Which database to use?

Column oriented database like HBase or Cassandra.

User metadata:

```
	{
	userId: user_1;
	name: Bill;
	creationTimestamp: 10000;  
	status: "Hey there I am on whatsapp";
	isOnline: 1;
	lastSeen: null
},
{
	userId: user_2;
	name: Steve;
	creationTimestamp: 10000;
	status: "Hey there I am on whatsapp";
	isOnline: 1;
	lastSeen: null
}
```
	
Bill’s chat history:
```
	{
	userId: user_1;
	friendId: user_2;
	count: 5
	partition: 1
	messages: {
		{
			sender: user1;
			text: "Hi";
			timestamp: 10001
		},
		{
			sender: user2;
			text: "Hello";
			timestamp: 10002
		},
		{
			sender: user1;
			text: "I am fine.";
			timestamp: 10003
		},
		{
			sender: user1;
			text: "How are you doing?";
			timestamp: 10004
		},
		{
			sender: user2;
			text: "I too am fine. Thanks for asking.";
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
			text: "Did you watch the movie yesterday? How was it?";
			timestamp: 10006
		},
		{
			sender: user2;
			text: "It was awesome.";
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

User 1 and 2 are chatting with each other. User 1 sends the message to the chat server which forwards the message to user 2. Similarly user 2 sends the message to chat server which forwards it to user 1. The chat server parallelly saves the message to our column oriented database.

Which communication protocol should be used by our clients?

HTTP long polling
 <br>
<p align="center">
	
<img src="https://user-images.githubusercontent.com/57604500/124807318-ec0a9080-df5d-11eb-9523-0070a622889e.jpg" width=756>
<br />
<h3 align="center">Matesapp Chat Messenger</h3>
</p>

<br/>

## Scale the design
Let us check our non-functional requirements

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
