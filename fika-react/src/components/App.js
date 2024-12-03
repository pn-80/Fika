import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import Homepage from './FikaWelcome';
import Login from "./Login";
import Register from "./Register";
import JoinSpace from "./JoinSpace";
import NavBar from './NavBar';
import CreateAvatar from "./CreateAvatar";
import Map from './Map';
import AccountPage from './AccountPage';
import DelAccountPage from './DelAccountPage.js';
import Draw from './Draw.js';
import Polygon from './Polygon.js';
import Gallery from './Gallery';

function App() {
  const location = useLocation();
  const noNavBarPaths = ["/", "/login", "/register"];

  return (
    <div>
      {/* Conditionally render NavBar only if not on the homepage */}
      {!noNavBarPaths.includes(location.pathname) && <NavBar />}
      <Routes>  
        <Route path="/" exact element={<Homepage />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/join-space" exact element={<JoinSpace />} />
        <Route path="/create-avatar" exact element={<CreateAvatar />} />
        <Route path="/map" exact element={<Map />} />
        <Route path="/yourAccount" exact element={<AccountPage />} />
        <Route path="/delSpace" exact element={<DelAccountPage />} />
        <Route path="/draw" exact element={<Draw />} />
        <Route path="/polygon" exact element={<Polygon />} />
        <Route path="/test" exact element={<Test />} />
        <Route path="/gallery" exact element={<Gallery />} />
      </Routes>
    </div>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}