# Design Chat Messager
### 1. Introduction
 * Chat messager provide text based instant messaging to its users. Example WhatsApp, Facebook messenger, telegram.
 <br>
 <br>




1. Introduction
Chat messager provide text based instant messaging to its users. Example WhatsApp, Facebook messenger, telegram.

Prerequisites:
System design introduction : 3 principles of distributed system, 5 step guide for System design.

System design concepts & components : Horizontal scaling, Message queues, Database, Communication protocols
2. Requirement analysis
Functional requirements

There should be one-to-one conversation using the messager.
Messenger should keep track of online/ offline status.
When the user connects to network he should get all the new messages.
Messenger should save chat history on the servers.
If the user installs the app on a new device he or she should be able to download all the old messages.
If the user logs in using a browser then he or she should be able to get top 10 users messages.
Non-functional requirements

Highly available – The service should be always up.
Minimum latency – There should be minimum delay while chatting with your friends.
Highly reliable –  The messages should not be lost.
Highly consistent – The ordering of the messages should be maintained and should be the same on both the individuals chat history.
Additional requirements

Share files, photos, mp3, voice messages.
Do group chats.
Create statuses which disappear in 24 hours.
Messages should be encrypted.
3. API design
void sendMessage(senderId, recieverId, message)
boolean isOnline(userId)
LinkedHashMap<User, List<Message>>> getLatestChat(userId, isBrowser, pagination) in Java.
Equivalent of LinkedHashMap in older versions of Python is collections.OrderedDict and from CPython 3.6+ or Python 3.7+ it is the standard Dict.
List<Message> getMessages(recieverId, pagination)
4. Define data model
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


5. Back-of-the-envelope calculations
Question:

If we have 1 million messages sent each second with average message size 0.1 KB we need to calculate how much data will be generated in next 5 years?

Answer:

1 Million * 0.1KB = 100000 KB in 1 second = 100MB in 1 second
 100 * 3600 * 24 = 360000 MB * 24 =  400,000 MB * 25 = 10,000,000 MB = 10000 GB = 10TB in 1 day
In 1 year we have 365 * 10TB = 3650 TB = 4PB
In 5 years we have 4 PB * 5 = 20 PB
Considering that we should not use more that 70% of our capacity we have 20 * 100 / 70 = 200/7 = 30PB


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
