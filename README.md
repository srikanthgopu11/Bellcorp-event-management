# Bellcorp Event Management Platform

A full-stack Event Management application built with the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Features
- **User Authentication:** Secure JWT-based Login and Registration.
- **Event Discovery:** Browse, search, and filter events by category.
- **Dynamic Registration:** Users can register for events with real-time capacity updates.
- **Dashboard:** Personal dashboard to track "Upcoming" and "Past" registrations.
- **Responsive UI:** Modern, clean design with mobile-friendly grid layouts.

## 🛠️ Tech Stack
- **Frontend:** React.js, Axios, React Router.
- **Backend:** Node.js, Express.js, Mongoose.
- **Database:** MongoDB Atlas.
- **Security:** Bcrypt.js for hashing and JWT for session management.

## 📦 Installation & Setup
1. Clone the repository.
2. Inside the `backend` folder, create a `.env` file and add:
   - `PORT=5000`
   - `MONGO_URI=your_mongodb_string`
   - `JWT_SECRET=your_secret_key`
3. Run `npm install` in both `backend` and `frontend` folders.
4. Start backend: `node server.js`
5. Start frontend: `npm start`