import Login from "./pages/Login"
import Signup from "./pages/Signup"
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from "./pages/Home";
import Outpass from "./pages/Outpass";
import Profile from "./pages/Profile"
import React from 'react';
import Verify from "./pages/verify";
import Resetpassword from "./pages/resetpassword";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import OutpassForm from "./pages/OutpassForm";
import Footer from "./components/Footer"


function App() {
  return (
    <>
    <ToastContainer position="top-center" autoClose="2500"/>
      <Router>
        <Navbar/>

        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/user/signup" element={<Signup />} />
          <Route exact path="/user/login" element={<Login />} />
          <Route exact path="/user/outpass" element={<Outpass />} />
          <Route exact path="/:id" element={<Profile />} />
          <Route exact path="/verify/mail" element={<Verify />} />
          <Route exact path="/verify/resetpassword" element={<Resetpassword />} />
          <Route exact path="/apply" element={<OutpassForm />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
