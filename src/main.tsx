import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { MigraineProvider } from './context/MigraineContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MigraineProvider>
      <App />
    </MigraineProvider>
  </React.StrictMode>,
)
