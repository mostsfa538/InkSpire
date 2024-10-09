import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { AuthProvider } from './context/authContext.tsx'

import { store } from './features/app/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </AuthProvider>
  </React.StrictMode>,
)
