import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './routes/App.tsx'

import { AuthProvider } from './context/authContext.tsx'

import { Provider } from 'react-redux'
import { store } from './features/app/store'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
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
