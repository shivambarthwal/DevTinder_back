# ❤️ DEV TINDER PROJECT

A developer matchmaking platform where users can connect, explore profiles, and collaborate based on shared interests.

---

## 🔁 Flow of the Project

1. 📝 Create an Account  
2. 🔐 Login  
3. ✏️ Update Your Profile  
4. 🧭 Feed Page – Explore Developers  
5. 🤝 Send Connection Requests  
6. 💞 See Your Matches  
7. 📤 View Sent Requests  
8. 🛠️ Update Your Profile (again, if needed)

---

## 🧱 Architecture – Microservices

| Layer     | Tech Stack |
|-----------|------------|
| 🖼️ Frontend  | React       |
| 🛠️ Backend   | Node.js     |
| 🗃️ Database  | MongoDB     |

---

## 📐 LLD (Low Level Design)

### 📦 MongoDB Collections

#### 🧍‍♂️ `User` Collection
| Field      | Type   | Description              |
|------------|--------|--------------------------|
| firstName  | String | User's first name        |
| lastName   | String | User's last name         |
| email      | String | Unique email             |
| password   | String | Hashed password          |
| gender     | String | Male / Female / Other    |
| age        | Number | Age of the user          |

#### 🔗 `ConnectionRequest` Collection
| Field      | Type     | Description                         |
|------------|----------|-------------------------------------|
| fromUserId | ObjectId | ID of the user sending the request  |
| toUserId   | ObjectId | ID of the recipient user            |
| status     | String   | `pending` / `accepted` / `rejected` / `ignored` |

---

## 🌐 API Design (RESTful)

### 🔐 Auth APIs (Auth router)
| Method | Endpoint       | Description            |
|--------|----------------|------------------------|
| POST   | `/signup`      | Register a new user    |
| POST   | `/login`       | Login with credentials |
| POST   | `/logout`      | Logout with credentials|

### 👤 Profile APIs (Profile router)
| Method | Endpoint       | Description                  |
|--------|----------------|------------------------------|
| GET    | `/profile/:id` | Fetch a user's profile       |
| POST   | `/profile`     | Create a profile             |
| PATCH  | `/profile/:id` | Update user details          |
| DELETE | `/profile/:id` | Delete the profile           |
| PATCH  | `/profile/password` | Delete the profile      |

### 🤝 Connection APIs (Connection router)
### Status : ignore , intrested , accepeted , rejected 
| Method | Endpoint            | Description                         |
|--------|---------------------|-------------------------------------|
| POST   | `request/send/intrested/:userId`     | Send request (status: interested)  |
| POST   | `request/send/ignored/:userId`       | Ignore a request                   |

| POST    | `request/review/accepted/:requestId`| accepts incoming requests          |
| POST    | `request/review/rejected/:requestId`| reject incoming requests           |

### 🔐 More APIs ( User)
| Method | Endpoint       | Description            |
|--------|---------------------|--------------------------|
| GET   | `/connections`       | Register a new user      |
| GET   | `/requests/received` | Login with credentials   |
| GET   | `/feed`              | get the others profile   |
---

## ✅ Future Scope Ideas
- Chat system (Socket.IO or WebRTC)
- Notifications
- Advanced filtering in feed (by skills, interests, location)
- Admin dashboard

---
### Thought Process 

Post vs Get 

(POST API)

  const reqData = await connectionRequest.save();
  This is should be your last line , before this you should check all the validation , data sanitization .
  Never trust req.body or User data.

(GET API)

before sending any data you should be 100 percent user.


Best Industry Level approach is to use the express.router()

📌 *This document serves as a blueprint for building the Dev Tinder app with a clear flow, REST API structure, and low-level design considerations.*

