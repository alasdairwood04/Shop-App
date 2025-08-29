import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import CartProvider from './context/CartContext.jsx'
import NotFound from './pages/NotFound.jsx'


import { createBrowserRouter, RouterProvider } from 'react-router-dom'


// pages
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import Cart from "./pages/Cart"

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {index: true, element: <Home /> },
      {path: '/shop', element: <Shop /> },
      {path: '/cart', element: <Cart /> },
    ]
  },
])
  

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
