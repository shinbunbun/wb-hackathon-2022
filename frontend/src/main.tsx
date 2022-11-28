import React, { createContext, useContext } from 'react'
import ReactDOM from 'react-dom/client'
import * as Helmet from 'react-helmet-async'
import 'the-new-css-reset/css/reset.css'
import { AppRouter } from '@/Router'

const ApiUrlContext = createContext(import.meta.env.VITE_API_URL)

export const useApiUrl = (): string => useContext(ApiUrlContext)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Helmet.HelmetProvider>
      <ApiUrlContext.Provider value={import.meta.env.VITE_API_URL}>
        <AppRouter />
      </ApiUrlContext.Provider>
    </Helmet.HelmetProvider>
  </React.StrictMode>
)
