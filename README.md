# techChallenge-SmartLocator

Hello Friend! Here you can see my code created for the technical challenge of the Smart Locator Company.

Before you start, let me tell you something.
To create this application I used the following technologies:
1. Node.js to create the server application
2. The database was created using the postgreSQL
3. To interact in a easiest way with the postgreSQL I have used the Sequelize ORM.
4. All end-points interactions have the json web token associated.

To begin with, you need to change the following files: db.js and put the name of the database that you created. You just need to create a database with postgreSQL, the SEQUELIZE will create the corresponding table.
Moreover, you need to change the credentials to access your database created too, or you can create the same user and password that I created: root and root :)

All the application will be installed using the package.json so, be happy and try our famous npm command.

So, but, I talked a lot of things but I didn't say about what is this application haha

The application consists of a user CRUD. You can create, read, update and delete users using the following endpoints:

1. Create: post on:  "/users"
2. Read: get on: "/users"
3. Read an specific user: get on: "/users/:id"
4. Update: put on: "/users/:id"
5. Delete: delete on: "/users/:id"

To create a user you need to pass in the body of the requisition the following informations like a JSON:\n
{ 
  name: name,
  email: email,
  password: password
}
Don't worry, I'll not save your clean password, we use json web token for garantee the security :)

To update you need to do the same, but you only can update the name and email.

Once you create a user, you can make the login, but, be careful to not write wrong information, you'll not be able to sign in and you receive an alert haha.
Once logged, you can make a requisiton for the Punk API v2. You just need to pass the desired parameters and press search. If you don't want to pass parameters, you can just press search too.
The response from the api will be showed for you, and don't worry, we make our data paging to deal with big responses!

The website is not so pretty, but was designed with love haha, take care of yourself and see you soon!
