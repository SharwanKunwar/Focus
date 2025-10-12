import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' 
import './index.css'
import App from './App.jsx'
import Focus from './components/Focus.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import Dashboard from './components/Dashboard.jsx'
import AllTask from './components/HigherTask.jsx'
import HigherTask from './components/HigherTask.jsx'
import MediumTask from './components/MediumTask.jsx'


// ✅ Create router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, // 👈 default route for "/"
        element: <Home />,
      },
      {
        path: 'focus', // 👈 lowercase, consistent naming
        element: <Focus />,
        children: [
          {
            index: true, // 👈 default route for "/focus"
            element: <Dashboard />,
          },
          {
            path: 'dashboard', // "/focus/dashboard"
            element: <Dashboard />,
          },
          {
            path:'higher',
            element: <HigherTask/>
          },
          {
            path:'medium',
            element: <MediumTask/>
          }
          
        ],
      },
     
      
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
