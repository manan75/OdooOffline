import { useState } from 'react'
import './App.css'
import Card from './components/card'
import Navbar from './components/navbar'
import HeroSection from './components/HeroSection'
import CardCarousel from './components/CardCarousel'
import HeroSection_1 from './components/HeroSection_1'
import Login from './components/Login'
import Login_1 from './components/Login_1'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
    <Login/>
   
    </>
  )
}

export default App
