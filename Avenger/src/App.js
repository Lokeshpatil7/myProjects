import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Mission from './pages/Mission';
import MissionList from './pages/MissionList';
import ListAvengers from './pages/ListAvengers';
import AssignMission from './pages/AssignMission';
import UpdateMission from './pages/UpdateMission';
import { AvengerDetails } from './avengers/AvengerDetails';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/mission' element={<Mission/>} />
          <Route path='/missionList' element={<MissionList/>} />
          <Route path='/avengerDetails' element={<AvengerDetails/>} />
          <Route path='/listAvengers' element={<ListAvengers/>}/>
          <Route path='/assignMission' element={<AssignMission/>}/>
          <Route path='/updateMission' element={<UpdateMission/>}/>

        </Routes>
      </Router>
    </>
  );
}

export default App;
