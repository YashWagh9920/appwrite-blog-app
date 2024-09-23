import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './Store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Post,Addpost,Editpost,Allpost,Login,Signup,Home} from "./pages/pages.js";
import { Protected } from "./components/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <Protected authentication={false}>
                    <Login />
                </Protected>
            ),
        },
        {
            path: "/signup",
            element: (
                <Protected authentication={false}>
                    <Signup />
                </Protected>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <Protected authentication>
                    {" "}
                    <Allpost />
                </Protected>
            ),
        },
        {
            path: "/add-post",
            element: (
                <Protected authentication>
                    {" "}
                    <Addpost />
                </Protected>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <Protected authentication>
                    {" "}
                    <Editpost />
                </Protected>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>  
   </Provider>
  </StrictMode>,
)
