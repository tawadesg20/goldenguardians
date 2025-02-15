import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Careers = () => {
  const [user, setUser] = useState({message:"Searching"});
  
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
    if (user.message!="Searching" && user.message=="Not Found") {
      // If user is not authenticated, redirect to login
      return <Navigate to="/login" replace />;
    }
  
    // If user is authenticated, render the child component
    if(user.message!="Searching" && user.message=="Found but not Volunteer")
      return <Navigate to="/dashboard" replace />;
    else
    return  (
    <div className="min-h-screen flex flex-col bg-">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#5A3D1A] text-center mb-8">
            Join Our Team
          </h1>
          <p className="text-xl text-[#3A6625] mb-6 text-center leading-relaxed">
            At <strong>Golden Guardians</strong>, we are always looking for passionate and
            dedicated individuals to join our team. If you are interested in making a
            difference in the lives of senior citizens, we would love to hear from you.
          </p>
          <p className="text-xl text-[#3A6625] mb-6 text-center leading-relaxed">
            We offer various opportunities in departments such as Marketing, Finance, Psychology, Operations, HR and Training, Events, Legal, and Business Development.
          </p>
          <p className="text-xl text-[#3A6625] mb-8 text-center leading-relaxed">
            Fill out our application form by clicking the button below. Let’s create a brighter
            future together!
          </p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-[#FFF8E1] p-6 rounded-lg shadow-md flex flex-col items-center">
              <img src="./images/read.jpg" alt="Marketing" className="w-16 h-16 mb-4" />
              <h3 className="text-lg font-semibold text-[#5A3D1A]">Sessions</h3>
              <p className="text-sm text-[#3A6625] text-center">
                Craft campaigns to spread joy and awareness.
              </p>
            </div>
            <div className="bg-[#FFF8E1] p-6 rounded-lg shadow-md flex flex-col items-center">
              <img src="./images/finance.jpg" alt="Finance" className="w-16 h-16 mb-4" />
              <h3 className="text-lg font-semibold text-[#5A3D1A]">Finance</h3>
              <p className="text-sm text-[#3A6625] text-center">
                Ensure seamless financial operations.
              </p>
            </div>
            <div className="bg-[#FFF8E1] p-6 rounded-lg shadow-md flex flex-col items-center">
              <img src="./images/events.jpg" alt="Events" className="w-16 h-16 mb-4" />
              <h3 className="text-lg font-semibold text-[#5A3D1A]">Managing Events</h3>
              <p className="text-sm text-[#3A6625] text-center">
                Promote mental well-being for our seniors.
              </p>
            </div>
            <div className="bg-[#FFF8E1] p-6 rounded-lg shadow-md flex flex-col items-center">
              <img src="./images/training.jpg" alt="HR" className="w-16 h-16 mb-4" />
              <h3 className="text-lg font-semibold text-[#5A3D1A]">Training</h3>
              <p className="text-sm text-[#3A6625] text-center">
                Build and nurture a compassionate team.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/apply"
              className="inline-block bg-[#D4A373] text-[#58391B] px-10 py-4 rounded-full shadow-lg text-xl font-bold hover:bg-[#8B4513] transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Careers;
