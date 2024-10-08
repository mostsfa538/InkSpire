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
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </AuthProvider>
  </React.StrictMode>,
)
