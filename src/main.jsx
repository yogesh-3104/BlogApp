import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Protected} from './component/index.js'
import { createBrowserRouter, createRoutesFromElements,Route, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AllPost from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Home from './pages/Home.jsx'
import Post from './pages/Post.jsx'
const router = createBrowserRouter(
  // createRoutesFromElements([
  //   {
  //     path: "/",
  //     element: <App />,
  //     children: [
  //       {
  //         path: "/",
  //         element: <Home />,
  //       },
  //       {
  //         path: "/login",
  //         element: (
  //           <Protected authentication={false}>
  //             <Login />
  //           </Protected>
  //         ),
  //       },
  //       {
  //         path: "/signup",
  //         element: (
  //           <Protected authentication={false}>
  //             <Signup />
  //           </Protected>
  //         ),
  //       },
  //       {
  //         path: "/all-posts",
  //         element: (
  //           <Protected authentication>
  //             <AllPost />
  //           </Protected>
  //         ),
  //       },
  //       {
  //         path: "/add-post",
  //         element: (
  //           <Protected authentication={false}>
  //             <AddPost />
  //           </Protected>
  //         ),
  //       },
  //       {
  //         path: "/edit-post/:slug",
  //         element: (
  //           <Protected authentication={false}>
  //             <EditPost />
  //           </Protected>
  //         ),
  //       },
  //       {
  //         path: "/post/:slug",
  //         element: <Post />,
  //       },
  //     ],
  //   },
  // ])

  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route
          path="/login"
          element={
            <Protected authentication={false}>
              <Login />
            </Protected>
          }
        />
        <Route
          path="/signup"
          element={
            <Protected authentication={false}>
              <Signup />
            </Protected>
          }
        />
        <Route
          path="/all-posts"
          element={
            <Protected authentication={true}>
              <AllPost />
            </Protected>
          }
        />
        <Route
          path="/add-post"
          element={
            <Protected authentication={true}>
              <AddPost />
            </Protected>
          }
        />
        <Route
          path="/edit-post/:slug"
          element={
            <Protected authentication={true}>
              <EditPost />
            </Protected>
          }
        />
        <Route path="/post/:slug" element={<Post />} />
      </Route>
    </>
  )
);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
       <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
