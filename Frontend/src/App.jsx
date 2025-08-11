
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HeroSection_1 from './components/HeroSection_1.jsx'
import Login_2 from './components/Login_2.jsx'

import LandingPage from './components/LandingPage.jsx';
import PlanTrip from './components/PlanTrip.jsx';
import TravelPlanner from './components/Itinerary.jsx';
import TravelDashboard from './components/UserDashBoard.jsx';
import TripDetailsPage from './components/TripDetails.jsx';
import CommunityPage from './components/TestCommunity.jsx';



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
           <Route path="/tripDetails/:tripId" element={<TripDetailsPage />} />
           <Route path="/testCommunity" element={<CommunityPage/>} />
      </Routes>
    </Router>
  )
}

export default App
