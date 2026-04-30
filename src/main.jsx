import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux";
import store from "./store/store.js";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home.jsx";
import { AuthLayout, Login } from "./components/index.js";

import AddPost from "./Pages/AddPost.jsx";
import SignupPage from "./Pages/signup.jsx";
import EditPost from "./Pages/Editpost.jsx";
import AllPosts from "./Pages/AllPost.jsx";
import Post from "./Pages/post.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // HOME
      {
        path: "/",
        element: <Home />,
      },

      // LOGIN
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },

      // SIGNUP
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
        ),
      },

      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
      },

      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },

      {
        path: "/edit-post/:id",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },

      {
        path: "/post/:id",
        element: <Post />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
