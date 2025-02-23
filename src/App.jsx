import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/UserContext.jsx";
import { PaymentProvider } from "./components/payment/PaymentContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Axios from "axios";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import VolunteerRegistration from "./pages/VolunteerRegistration.jsx";
import SeniorRegistration from "./pages/SeniorRegistration.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Events from "./pages/Events.jsx";
import Payment from "./pages/Payment.jsx";
import Apply from "./pages/Apply.jsx";
import Careers from "./pages/Careers.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ApplicationProfile from "./pages/applicationProfile.jsx";


const App = () => {
  return (
    <PaymentProvider>
      <UserProvider>
        <Router>
          <div className="min-h-screen bg-[#faedcd]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/volunteer-registration" element={<VolunteerRegistration />} />
              <Route path="/senior-registration" element={<SeniorRegistration />} />
              <Route path="/apply" element={<Apply /> }/>
              <Route path="/careers" element={<Careers />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/events" element={<Events />} />
              <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/admin" element={<AdminDashboard/>} />
              <Route path="/admin/profile" element={<ApplicationProfile />} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </PaymentProvider>
  );
};

export default App;
