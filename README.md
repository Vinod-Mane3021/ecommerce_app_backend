# ToDo App - Backend

The backend of the todo_app is built using Node.js and Express.js, with MongoDB as the database, enabling individual user task management through CRUD operations. It incorporates user authentication for personalized task tracking.

## Features

- **CRUD Operations**: Perform Create, Read, Update, and Delete operations on tasks.
- **User Authentication**: Enable personalized task management by implementing user registration, login, and logout functionalities.
- **MongoDB Database**: Utilize MongoDB for storing task data, providing flexibility and scalability.
- **Deployment**: Deploy the backend on platforms like Heroku for easy accessibility.

## Setup

1. **Clone the Repository:**
```bash
$ git clone https://github.com/Vinod-Mane3021/ecommerce_app_backend.git
$ cd ecommerce_app_backend
 ```

2. **Install Dependencies:**
```bash
$ npm install
```

3. **Environment Variables:**
```bash
# Port on which the server will run
PORT=3000
# Url for connecting to the MongoDB database
MONGODB_URL=your-mongodb-url
# cors specifies who can access the resources on your server
CORS_ORIGIN=*   # Allow requests from any origin
```
4. Start the app
```bash
npm start
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `start`         | Starts a development instance of the app |



## Tech stack

- [Node.js](https://nodejs.org/en) – JavaScript runtime for server-side development.

- [Express.js](https://expressjs.com/) – Web application framework for Node.js.

- [MongoDB](https://www.mongodb.com/) – NoSQL database for storing task data.

- [Mongoose](https://mongoosejs.com/) – ODM (Object Data Modeling) library for MongoDB and Node.js.

- [Typescript](https://www.typescriptlang.org/) – Adds static types to improved code clarity.


## Project Folder Structure


```bash
todo-app-backend/
│
├── public/
│   └── assets/
│
├── src/
│   ├── config/            # Configuration files (e.g., database connection)
│   ├── controllers/       # Request handlers for each route
│   ├── middlewares/       # Custom middleware functions
│   ├── models/            # Mongoose models for data structures
│   ├── routes/            # Express.js route definitions
│   ├── services/          # Business logic or services
│   ├── utils/             # Utility or helper functions
│   ├── constants/         # Utility or helper functions
│   ├── app.ts             # Express.js application setup
│   └── index.ts           # Entry point for the server
│
├── .env                   # Environment variables file
├── .gitignore             # Git ignore file
├── package.json           # Node.js package configuration
├── package-lock.json      # other Node.js configuration
├── tsconfig.json          # TypeScript configuration file
└── README.md              # Readme file

```






