import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import Homepage from './FikaWelcome.js';
import Login from "./Login.js";
import Register from "./Register.js";
import JoinSpace from "./JoinSpace.js";
import NavBar from './NavBar.js';
import CreateAvatar from "./CreateAvatar.js";
import Map from './Map.js';
import AccountPage from './AccountPage.js';
import EditSpaces from './EditSpaces.js';
import Draw from './Draw.js';
import Polygon from './Polygon.js';
import Gallery from './Gallery.js';
import GodPage from './GodPage.js';
import EditArts from './EditArts.js';
import ViewArt from './ViewArt.js';

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
        <Route path="/editSpace" exact element={<EditSpaces />} />
        <Route path="/editArt" exact element={<EditArts />} />
        <Route path="/draw" exact element={<Draw />} />
        <Route path="/polygon" exact element={<Polygon />} />
        <Route path="/gallery" exact element={<Gallery />} />
        <Route path='/view-art' exact element={<ViewArt />} />
        <Route path="/god" exact element={<GodPage />} />
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