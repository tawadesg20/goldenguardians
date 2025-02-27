import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import FeaturesSection from '../components/FeaturesSection.jsx';
import ReviewsSection from '../components/ReviewsSection.jsx';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';

const Home = () => {
 const [user, setUser] = useState({message:"Searching"});
 const [admin, setAdmin] = useState({message:"Searching"});
      
        useEffect(() => {
          const userData = Cookies.get("user");
          if (userData) {
            setUser({message:"Found",data:JSON.parse(userData)}); // Parse the stringified object
          }
          else
          setUser({message:"Not Found"})
          const adminData = Cookies.get("adminkey");
          if (adminData) {
            setAdmin({message:"Found",data:adminData}); // Parse the stringified object
          }
          else
          setAdmin({message:"Not Found"})
        }, []);
        if (user.message!="Searching" && user.message=="Found") {
          // If user is not authenticated, redirect to login
          return <Navigate to="/dashboard" replace />;
        }
        if (admin.message!="Searching" && admin.message=="Found") {
          // If user is not authenticated, redirect to login
          return <Navigate to="/admin" replace />;
        }

  return (
    <><Navbar />
    <div className="min-h-screen bg-[#faedcd]">
      {/* Hero Section */}
      <div className="relative py-16 px-6 sm:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#58391B] mb-4">
              "Silver Hairs,<br />Golden Hearts"
            </h1>
            <p className="text-xl text-[#2E7502] mb-6">
              Companionship with GrandKids!!
            </p>
            <p className="text-lg font-italic text-[#58391B]  mb-8">
              Energetic, friendly young people spend time with elderly, create special nostalgic moments.
            </p>
            <Link
              to="/register"
              className="inline-block bg-[#D4A373] text-[#58391B] px-8 py-3 rounded-md hover:bg-[#8B4513] transition-colors font-semibold"
            >
              JOIN THE TRIAL
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/images/g2.jpg"
              alt="Elderly and young person sharing a moment"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <FeaturesSection />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Footer */}
      <Footer />
    </div></>
  );
};

export default Home;