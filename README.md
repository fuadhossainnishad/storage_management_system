# 📁 File Management System

This is the backend of a **File Management System** built with **Node.js, Express, and MongoDB**. It provides APIs for user authentication, file upload, folder management, duplication, renaming, deletion, and favorite marking.

## 🚀 Features

- User Authentication (Signup, Login, Password Reset)
- File Upload with **Multer**
- Folder Creation and File Management
- Copy, Duplicate, Rename, and Delete Files
- Mark Files as Favorite
- Date-wise File Retrieval
- Validation Middleware for Secure API Calls

---

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Multer** - File Upload Handling
- **fs-extra** - File System Utilities
- **JWT (JSON Web Token)** - Authentication
- **Validation Middleware** - Schema validation

---

## 📌 Installation

1️⃣ **Clone the Repository**

```sh
git clone https://github.com/fuadhossainnishad/storage_management_system.git
cd file-management-backend
```

2️⃣ **Install Dependencies**

```sh
yarn install
```

3️⃣ **Set Up Environment Variables**
Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4️⃣ **Start the Server**

```sh
yarn dev
```

The server will run at **http://localhost:5000**.

---

## 📂 API Endpoints

### **Authentication Routes** (`/auth`)

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| POST   | `/signup`         | User Signup       |
| POST   | `/login`          | User Login        |
| POST   | `/forgotPassword` | Forgot Password   |
| POST   | `/updatepassword` | Update Password   |
| POST   | `/editProfile`    | Edit User Profile |

### **File & Folder Management Routes** (`/files`)

| Method | Endpoint        | Description             |
| ------ | --------------- | ----------------------- |
| POST   | `/folderCreate` | Create a new folder     |
| POST   | `/upload`       | Upload a file           |
| PATCH  | `/`             | Rename a file or folder |
| DELETE | `/`             | Delete a file or folder |
| POST   | `/copy`         | Copy a file             |
| POST   | `/duplicate`    | Duplicate a file        |
| GET    | `/dateWise`     | Get files date-wise     |
| PATCH  | `/favourite`    | Mark a file as favorite |

---

## 🔥 Testing the APIs

You can test these APIs using **Postman**:

1. **Export the Postman Collection** from Postman.
2. Import the JSON collection into your Postman app.
3. Update the environment variables in Postman (API URL, tokens, etc.).

---

## 🛠️ Project Structure

```
file-management-backend/
├── config/               # Configuration files (Multer, DB connection)
├── controllers/          # Controllers for handling API logic
├── middleware/           # Middleware (Validation, Authentication, etc.)
├── models/               # Mongoose Models
├── routes/               # Express Routes
├── utils/                # Utility functions
├── .env                  # Environment Variables
├── server.js             # Main Server Entry File
├── package.json          # Project Dependencies
```

---

## 🛡️ Security Measures

✅ **JWT Authentication** - Secure API endpoints
✅ **Input Validation** - Prevents malformed requests
✅ **File Type Restrictions** - Only allows specific file formats
✅ **Error Handling** - Structured error messages for better debugging

---

## 👨‍💻 Contributors

- **Fuad Hossain** - Developer

---

## 📜 License

This project is **open-source** and available under the [MIT License](LICENSE).

---

## 💬 Contact

For any questions or issues, reach out via:
📧 Email: fuadhossainbk01@gmail.com
📌 GitHub Issues: [Create an Issue](https://github.com/fuadhossainnishad/storage_management_system/issues)

---

### 🎉 Happy Coding! 🚀
