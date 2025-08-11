
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HeroSection_1 from './components/HeroSection_1.jsx'
import Login_2 from './components/Login_2.jsx'

import LandingPage from './components/LandingPage.jsx';
import PlanTrip from './components/PlanTrip.jsx';
import TravelPlanner from './components/Itinerary.jsx';
import TravelDashboard from './components/UserDashBoard.jsx';
import Calender from './components/Calendar.jsx'
import CommunityPage from './components/Community.jsx';
import TravelAdminDashboard from './components/AdminDashBoard.jsx';


function App() {
 

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login_2/>}/>
         <Route path='/userHome' element={<HeroSection_1/>}/>
         <Route path='/landingPage' element={<LandingPage/>}/>
          <Route path='/planTrip' element={<PlanTrip/>}/>
          <Route path='/travelPlanner' element={<TravelPlanner/>}/>
          <Route path='/travelDashboard' element={<TravelDashboard/>}/>
          <Route path='/calender' element={<Calender/>}/>
          <Route path='/community' element={<CommunityPage/>}/>
          <Route path='/travelAdmin' element={<TravelAdminDashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App
