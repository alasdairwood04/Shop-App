// import { useState } from 'react'
import './styles/index.css'
import { Outlet } from 'react-router-dom'

// components
import NavBar from "./components/NavBar"

// pages
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import Cart from "./pages/Cart"


function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100">
        <NavBar />
        <Outlet />
    </div>
  )
}

export default App
