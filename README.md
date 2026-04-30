# 📝 Blog App

A modern full-stack blog application where users can create, read, update, and delete posts with authentication and rich UI. Built using **React.js**, **Redux**, and **Appwrite** backend services.

---

## 🚀 Features

* 🔐 User Authentication (Login / Signup)
* ✍️ Create, Edit, Delete Blog Posts
* 🖼️ Upload Featured Images
* 📄 Rich Text Content Rendering
* 📦 State Management with Redux
* 🌐 Routing with React Router
* 🎨 Clean and Responsive UI
* 🔒 Protected Routes (Auth Layout)

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* React Router DOM
* Tailwind CSS (or your styling choice)

### Backend

* Appwrite (Database, Auth, Storage)

---

## 📂 Project Structure

```
src/
│
├── components/       # Reusable UI components
│   ├── AuthLayout.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── ...
│
├── pages/            # Main pages
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── AddPost.jsx
│   ├── EditPost.jsx
│   └── Post.jsx
│
├── store/            # Redux store & slices
│
├── appwrite/         # Appwrite configuration
│
├── App.jsx
└── main.jsx
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/blog-app.git
cd blog-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root:

```env
VITE_APPWRITE_URL=your_appwrite_url
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
```

---

### 4. Run the App

```bash
npm run dev
```

---

## 🔐 Authentication Flow

* Users must log in to create or edit posts
* Protected routes handled via `AuthLayout`
* Session stored using Appwrite Auth

---

## 📸 Image Handling

* Images are uploaded to Appwrite Storage
* Preview fetched using file ID
* Used as featured image in blog posts

---

## 🧠 Key Concepts Used

* React Hooks (`useEffect`, `useState`, `useCallback`)
* Redux for global state
* Protected Routing
* API handling with Appwrite services
* Component-based architecture

---

## 🐞 Common Issues & Fixes

* **Image not showing?**

  * Check bucket permissions (read access)
  * Ensure correct file ID is used
  * Use correct Appwrite preview/view method

* **CORS Issues?**

  * Add your frontend URL in Appwrite platform settings

---

## 📌 Future Improvements

* 💬 Comments System
* ❤️ Like/Bookmark Feature
* 🔍 Search & Filter Posts
* 📊 Admin Dashboard
* 🌍 SEO Optimization

---

## 🤝 Contributing

Contributions are welcome!

```bash
fork -> clone -> create branch -> commit -> push -> PR
```

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Nikunj Wandile**

---

⭐ If you like this project, give it a star!

