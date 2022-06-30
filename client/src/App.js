import Login from "./pages/Login"
import Signup from "./pages/Signup"
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from "./pages/Home";
import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
    <ToastContainer position="top-center" autoClose="2500"/>
      <Router>
        <Routes>
        <Route exact path="/" element={<Home/>} />

          <Route exact path="/user/signup" element={<Signup />} />
          <Route exact path="/user/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
