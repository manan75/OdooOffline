
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Form_2 from './components/Form_2'
import Form from './components/Form'
import TravelDashboard from './components/UserDashBoard.jsx'


function App() {
 

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login_2/>}/>
         <Route path='/userHome' element={<HeroSection/>}/>
         <Route path='/userDashBoard' element={<TravelDashboard/>}/>
          
      </Routes>
    </Router>
  )
}

export default App
