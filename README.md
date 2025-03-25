# Task Management Application

## 🚀 Overview
A full-stack task management system with user authentication, built with React.js frontend and Node.js/Express.js backend with MongoDB.



## ✨ Features
- **User Authentication** (Register/Login/Logout)
- **CRUD Operations** for tasks
- **JWT Authentication** with secure cookies
- **Protected Routes** for authenticated users
- **Responsive Design** works on all devices
- **Modern UI** with clean interface

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios for API calls
- Context API for state management


### Backend
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT for authentication
- Bcrypt for password hashing
- CORS middleware


### api endpoint

Endpoint	Method	Description
/api/tasks	GET	Get all tasks
/api/tasks	POST	Create new task
/api/tasks/:id	PUT	Update task
/api/tasks/:id	DELETE	Delete task

## 📦 Dependencies
```json
{
    "axios": "^1.7.9",
    "bcrypt": "^5.1.1",
    "bcryptjs": "^2.4.3",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "ejs": "^3.1.10",
    "ejs-mate": "^4.0.0",
    "express": "^4.21.2",
    
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.9.3",
   
}
```

## 🚀 How to Run Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/pankajkumar9771369/management.git
   ```
2. Navigate to the project directory:
   ```sh
   cd frontend
   cd backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables in a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
5. Start the application:
   ```sh
   npm start
   ``
## port
backend:
http://localhost:5000
fronted :
http://localhost:3001
 

## 📌 Features
- ✅ Create, edit, and delete tasks
- ✔️ Mark tasks as complete/incomplete

- 📱 Responsive design works on all devices
- 🔒 Data saved in browser (no login required)

## 🤝 Contributing
Feel free to fork the repository and submit **pull requests**!

## 📜 License
This project is licensed under the **MIT License**.

