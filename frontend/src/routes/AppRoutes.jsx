import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ChooseRegister from '../pages/ChooseRegister';
import UserRegister from '../pages/UserRegister';
import UserLogin from '../pages/UserLogin';
import FoodPartnerRegister from '../pages/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/FoodPartnerLogin';
import Home from '../pages/Home';
import Saved from '../pages/Saved';
import CreateFood from '../pages/CreateFood';
import Profile from '../pages/Profile';
import BottomNav from '../components/BottomNav';
//import Home from '../general/home';

const AppRoutes = () => {
  return (
    <Router>
      <div className="app-shell">
        <div style={{ position: 'relative', width: '100%', maxWidth: '480px' }}>
          <Routes>
            <Route path="/register" element={<ChooseRegister />} />
            <Route path="/user/register" element={<UserRegister />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
            <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
            <Route path="/" element={<><Home /><BottomNav /></>} />
            <Route path="/saved" element={<><Saved /><BottomNav /></>} />
            <Route path="/create-food" element={<><CreateFood /><BottomNav /></>} />
            <Route path="/food-partner/:id" element={<><Profile /><BottomNav /></>} />
            //<Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRoutes;