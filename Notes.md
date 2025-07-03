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

### 🔐 Auth APIs
| Method | Endpoint       | Description            |
|--------|----------------|------------------------|
| POST   | `/signup`      | Register a new user    |
| POST   | `/login`       | Login with credentials |

### 👤 Profile APIs
| Method | Endpoint       | Description                  |
|--------|----------------|------------------------------|
| GET    | `/profile/:id` | Fetch a user's profile       |
| POST   | `/profile`     | Create a profile             |
| PATCH  | `/profile/:id` | Update user details          |
| DELETE | `/profile/:id` | Delete the profile           |

### 🤝 Connection APIs
| Method | Endpoint            | Description                         |
|--------|---------------------|-------------------------------------|
| POST   | `/send-request`     | Send request (status: interested)   |
| POST   | `/ignore-request`   | Ignore a request                    |
| GET    | `/sent-requests`    | View all sent requests              |
| GET    | `/matches`          | View accepted connections           |
| PATCH  | `/handle-request`   | Accept or reject incoming requests  |

---

## ✅ Future Scope Ideas
- Chat system (Socket.IO or WebRTC)
- Notifications
- Advanced filtering in feed (by skills, interests, location)
- Admin dashboard

---

📌 *This document serves as a blueprint for building the Dev Tinder app with a clear flow, REST API structure, and low-level design considerations.*

