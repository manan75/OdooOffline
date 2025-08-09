import { useState } from 'react'
import './App.css'
import Card from './components/card'
import Navbar from './components/navbar'
import HeroSection from './components/HeroSection'
import CardCarousel from './components/CardCarousel'
import HeroSection_1 from './components/HeroSection_1'
import Login from './components/Login'
import Login_1 from './components/Login_1'
import Login_2 from './components/Login_2'
import DashBoard from './components/DashBoard'
import Dashboard2 from './components/DashBoard2'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <DashBoard/> */}
      <Dashboard2/>
     {/* <Login_2/> */}
    </>
  )
}

export default App
