import React from 'react';
import { useState,useEffect } from 'react';
import Cookies from "js-cookie"
import axios from 'axios';
import { Calendar, Clock, MessageSquare, Bell, Settings, User } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState({message:"Searching"});
  const [matches,setMatches] = useState([]);

  const matchingAlgorithm =async (skills) =>{
    axios({
      method: "post",
      url: `http://localhost:5000/${(skills)?"volunteer":"senior"}/matches`,
      data:{email:user.data.email},
  })
  .then((response) => {
   setMatches(response.data.matches)
  })
  .catch((err) => {
    // alert(err.response.data.message)
  });
  }


  useEffect(() => {
    if (user.message !== "Searching") {
      const userData = JSON.parse(Cookies.get("user")); // Assuming stored in localStorage
      const fetchData = async () => {
        await matchingAlgorithm(userData.skills);
      };
  
      fetchData(); // Initial call
      const interval = setInterval(fetchData, 1000);
  
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [user]);

 useEffect(() => {
      const userData =Cookies.get("user");
      if (userData && JSON.parse(userData).skills) {
        setUser({message:"Found",data:JSON.parse(userData)}); // Parse the stringified object
      }
      else if (userData) {
        
        setUser({message:"Found but not Volunteer",data:JSON.parse(userData)}); // Parse the stringified object
      }
      else
      setUser({message:"Not Found"})
  
    // if(user.message!="Searching")
    //   {
    //     matchingAlgorithm(JSON.parse(userData).skills)  
    //     setInterval(async ()=>{
    //       await matchingAlgorithm(JSON.parse(userData).skills)  
    //   },5000)
    
    // }

    }, []);
    if (user.message!="Searching" && user.message=="Not Found") {
      // If user is not authenticated, redirect to login
      return <Navigate to="/login" replace />;
    }
  // Mock data - replace with actual data from backend
  const upcomingVisits = [
    { id: 1, date: '2024-03-20', time: '10:00 AM', type: 'Reading Session' },
    { id: 2, date: '2024-03-22', time: '2:00 PM', type: 'Walking Companion' },
  ];

  const notifications = [
    { id: 1, message: 'New volunteer match available', time: '2 hours ago' },
    { id: 2, message: 'Upcoming visit reminder', time: '1 day ago' },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8EA] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#8B4513]">Welcome back, {(user.data)?user.data.name:null}</h1>
          <p className="text-[#A0522D]">Here's what's happening with your companionship services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upcoming Visits */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#8B4513]">Upcoming Visits</h2>
              <Calendar className="h-5 w-5 text-[#8B4513]" />
            </div>
            <div className="space-y-4">
              {upcomingVisits.map((visit) => (
                <div key={visit.id} className="border-b border-[#DEB887] pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#8B4513]">{visit.type}</p>
                      <div className="flex items-center text-sm text-[#A0522D]">
                        <Clock className="h-4 w-4 mr-1" />
                        {visit.time}
                      </div>
                    </div>
                    <p className="text-sm text-[#A0522D]">{visit.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#8B4513]">Notifications</h2>
              <Bell className="h-5 w-5 text-[#8B4513]" />
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="border-b border-[#DEB887] pb-3">
                  <p className="text-[#8B4513]">{notification.message}</p>
                  <p className="text-sm text-[#A0522D]">{notification.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-[#8B4513] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-4 bg-[#FFF8EA] rounded-lg hover:bg-[#DEB887] transition-colors">
                <MessageSquare className="h-6 w-6 text-[#8B4513] mb-2" />
                <span className="text-sm text-[#8B4513]">Messages</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-[#FFF8EA] rounded-lg hover:bg-[#DEB887] transition-colors">
                <Calendar className="h-6 w-6 text-[#8B4513] mb-2" />
                <span className="text-sm text-[#8B4513]">Schedule</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-[#FFF8EA] rounded-lg hover:bg-[#DEB887] transition-colors">
                <User className="h-6 w-6 text-[#8B4513] mb-2" />
                <span className="text-sm text-[#8B4513]">Profile</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-[#FFF8EA] rounded-lg hover:bg-[#DEB887] transition-colors">
                <Settings className="h-6 w-6 text-[#8B4513] mb-2" />
                <span className="text-sm text-[#8B4513]">Settings</span>
              </button>
            </div>
          </div>
        </div>
        Matches:
        <div className='flex'>
          {(matches.length==0)?"Match not found":matches.map((match,id)=><div key={id} className='bg-red-300'>
            <span>{match.name}</span><br/>
            <span>{match.email}</span>
          </div>)}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;