import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' // ✅ Correct import
import './index.css'
import App from './App.jsx'
import Focus from './components/Focus.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom' // ✅ Must use react-router-dom
import Home from './components/Home.jsx'

// ✅ Create router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path:"/",
        element:<Home/>
      },
      {
        path: 'Focus',
        element: <Focus />,
      },
    ],
  },
])

// ✅ Render to the root div
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
