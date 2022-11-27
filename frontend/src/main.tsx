import React from 'react'
import ReactDOM from 'react-dom/client'
import Helmet from 'react-helmet-async'
import { AppRouter } from './Router'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Helmet.HelmetProvider>
      <AppRouter />
    </Helmet.HelmetProvider>
  </React.StrictMode>
)
