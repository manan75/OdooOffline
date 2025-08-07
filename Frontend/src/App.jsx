import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/card'
import Navbar from './components/navbar'
import HeroSection from './components/HeroSection'
import CardCarousel from './components/CardCarousel'
import HeroSection_1 from './components/HeroSection_1'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
  
   <Navbar/>
   <HeroSection_1/>
   <CardCarousel/>
    </>
  )
}

export default App
