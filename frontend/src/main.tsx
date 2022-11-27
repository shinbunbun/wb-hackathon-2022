import React from 'react'
import ReactDOM from 'react-dom/client'
import Helmet from 'react-helmet-async'
import 'the-new-css-reset/css/reset.css'
import { AppRouter } from '@/Router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Helmet.HelmetProvider>
      <AppRouter />
    </Helmet.HelmetProvider>
  </React.StrictMode>
)
