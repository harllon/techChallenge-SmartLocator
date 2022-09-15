# techChallenge-SmartLocator

Hello Friend! Here you can see the code I created for the Smart Locator Company technical challenge.

Before you start, let me tell you something.
In order to create this application, I used the following technologies:
1. The server application was created by using Node.js
2. The database was created by using the postgreSQL
3. I used the Sequelize ORM in order to make the interaction with the postgre SQL easier.
4. All end-points interactions are associated to the json web token. 

In the first place, you need to change the following files: db.js and put the created database`s name. You just need to create a database with postgreSQL, than the SEQUELIZE will create the corresponding table.
Moreover, you need to change the credentials to access your created database too, or you can create the same user and password that I created: root and root :)

All the application will be installed using the package.json so be happy and try the famous npm command.

So, I talked about a lot of things but I didn't say what this application is haha

The application consists of a user CRUD. You can create, read, update and delete users using the following endpoints:

1. Create: post on:  "/users"
2. Read: get on: "/users"
3. Read an specific user: get on: "/users/:id"
4. Update: put on: "/users/:id"
5. Delete: delete on: "/users/:id"

Creating a user requires you to pass in the requisition body the following informations like a JSON:<br>
{<br> 
  name: name,<br>
  email: email,<br>
  password: password<br>
}<br>
Don't worry, I'll not save your clean password, we use json web token for garantee the security :)

Updating is done by doing the same, but you can only update the name and email.

Once you create a user you can make the login, but be careful not to write wrong information. If you do it, you'll not be able to sign in and you`ll receive an alert haha.
Once logged, you can make a requisiton for the Punk API v2. You just need to write the desired parameters and press search. If you don't want to write parameters, you can just press search.
The response from the API will be showed for you. Don't worry, we make our data paging to deal with big responses!

The website is not so pretty, but it was designed with much care haha. I hope to hear from you soon!
