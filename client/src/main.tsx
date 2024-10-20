import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './routes/App.tsx'
import SignIn from './routes/SignIn.tsx'
import SignUp from './routes/SignUp.tsx'

import { AuthProvider } from './context/authContext.tsx'

import { Provider } from 'react-redux'
import { store } from './features/app/store'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import Catalog from './routes/Catalog.tsx'
import Orders from './routes/Orders.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/signin',
        element: <SignIn />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
    {
        path: '/catalog',
        element: <Catalog />,
    },
    {
        path: '/orders',
        element: <Orders />,
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </Provider>
  </React.StrictMode>,
)
