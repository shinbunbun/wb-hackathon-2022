import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { FileSelectPage } from './pages/FileSelectPage'
import { Start } from './pages/Start'

export enum routes {}

const router = createBrowserRouter([
  {
    path: '/',
    element: <FileSelectPage />,
  },
  {
    path: '/start',
    element: <Start />,
  },
])

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />
}
