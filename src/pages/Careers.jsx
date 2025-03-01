import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";

const Careers = () => {
  const [user, setUser] = useState({ message: "Searching" });
  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData && JSON.parse(userData).skills)
    {
      setUser({message:"Found",data:JSON.parse(userData)}) // Parse the stringified object
    }
      else if(userData)
      setUser({message:"Found but not Volunteer",data:JSON.parse(userData)}) // Parse the stringified object
   else
    setUser({message:"Not Found"})
}, []);
  // if (user.message!="Searching" && user.message=="Not Found") {
  //   // If user is not authenticated, redirect to login
  //   return <Navigate to="/login" replace />;
  // }

  // If user is authenticated, render the child component
  if(user.message!="Searching" && user.message=="Found but not Volunteer")
    return <Navigate to="/dashboard" replace />;
  else {
    return (
      <><Navbar />
      <div className="min-h-screen flex flex-col bg-[#FAEDCD]">
        {/* Main Content */}
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="w-full max-w-4xl bg-[#FFF8E1] shadow-2xl rounded-2xl p-10 sm:p-12">
            <h1 className="text-center py-8 md:py-12 text-4xl font-bold text-[#8B4513] mb-3">
              Join Our Team
            </h1>
            <p className="text-lg text-[#3A6625] mb-6 text-center leading-relaxed">
            Golden Guardians seeks passionate, dedicated individuals to join their team, aiming to make a difference in the lives of senior citizens.
            </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {[
          { title: "Accounting & Funding", description: "Ensure seamless financial operations.", img: "/images/finance.jpg" },
          { title: "Sessions", description: "Campaigns to spread joy and awareness.", img: "/images/jogging.jpg" },
          { title: "Training", description: "Build and nurture a compassionate team.", img: "/images/training.jpg" },
          { title: "Managing Events", description: "Promote mental well-being for our seniors.", img: "/images/events.jpg" },
            ].map((item, index) => (
          <div
            key={index}
            className="bg-[#FAEDCD] p-6 rounded-xl shadow-md flex flex-col items-center text-center transition duration-300 hover:shadow-lg"
            >   
            <img
              src={item.img}
              alt={item.title}
              className="w-24 h-24 mb-4 rounded-lg object-cover mx-auto"
              onError={(e) => (e.target.style.display = "none")} // Hides broken images
            />
            <h3 className="text-lg font-semibold text-[#5A3D1A]">{item.title}</h3>
            <p className="text-sm text-[#3A6625]">{item.description}</p>
          </div>
          ))}
        </div>

        <div className="text-center">
              <Link
                to="/apply"
                className="inline-block bg-[#d4a373] text-white px-10 py-4 rounded-full shadow-lg text-xl font-bold hover:bg-[#8B4513] transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div></>
    );
  }
};

export default Careers;
