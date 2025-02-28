import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Clock, MessageSquare, Bell, Settings, User, Heart, MapPin, Award } from 'lucide-react';
import Navbar from '../components/Navbar';

const timeAgo =(timestamp) => {
  const now = new Date();
  const past = new Date(timestamp);
  let diff = Math.floor((now - past) / 1000); // Difference in seconds

  if (diff < 60) return "just now"; // Less than a minute

  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let result = [];

  if (days > 0) result.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours % 24 > 0) result.push(`${hours % 24} hour${hours % 24 > 1 ? "s" : ""}`);
  if (minutes % 60 > 0) result.push(`${minutes % 60} min${minutes % 60 > 1 ? "s" : ""}`);

  return result.join(" ");
};

const calculateDuration = (startTime, endTime) => {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  let totalMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
  if (totalMinutes < 0) totalMinutes += 24 * 60; // Handles cases where endTime is past midnight

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours} hours and ${minutes} minutes`;
};

const formatTime = (time) => {
  const [hour, minute] = time.split(":");
  const formattedHour = ((hour % 12) || 12).toString().padStart(2, "0");
  const period = hour >= 12 ? "PM" : "AM";
  return `${formattedHour}:${minute} ${period}`;
};

const Dashboard = () => {
  const [user, setUser] = useState({ message: "Searching",data:{} });
  const [request,setRequested] = useState(false);
  const [senior,setSenior] = useState({});
  const [volunteer,setVolunteer] = useState({})
  const [matches, setMatches] = useState([]);
  const [upcomingVisits,setUpcommingVisits] = useState([])
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    hoursVolunteered: 24,
    peopleHelped: 5,
    skillsOffered: 3
  });


  const matchingAlgorithm = async (type) => {
    try {
      const response = await axios.post(
        `https://golden-guardians-backend.onrender.com/${type=="skills" ? "volunteer" : "senior"}/matches`,
        { email: user.data.email }
      );
      console.log(response.data.matches)
      setMatches(response.data.matches);
    } catch (err) {
      console.error("Error fetching matches:", err);
    }
  };

  useEffect(() => {
    if (user.message !== "Searching") {
      const userData = JSON.parse(Cookies.get("user") || "{}");
      const fetchData = async () => {
        if(userData.skills)
        await matchingAlgorithm("skills");
        if(userData.interests)
          await matchingAlgorithm("interests")
      };

      fetchData();
      const interval = setInterval(fetchData, 5000);
      return () => clearInterval(interval);
    }
  }, [user]);

  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData && JSON.parse(userData).skills) {
      let user = JSON.parse(userData)
      axios.get(`https://golden-guardians-backend.onrender.com/volunteer/${user.email}`).then(response=>{
        if(response.data.volunteer)
        {
          if(response.data.volunteer.senior && response.data.volunteer.senior.email)
            setSenior(response.data.volunteer.senior)
        }
        setUser({ message: "Found", data: response.data.volunteer })
      }).catch(err=>{alert(err.response.data.message)})

      setUser({ message: "Found", data: JSON.parse(userData) });
      setSenior(JSON.parse(userData).senior?JSON.parse(userData).senior:{})
    } else if (userData) {
      let user = JSON.parse(userData)
      axios.get(`https://golden-guardians-backend.onrender.com/senior/${user.email}`).then(response=>{
        if(response.data.senior)
        {
          if(response.data.senior.volunteer && response.data.senior.volunteer.email)
            setVolunteer(response.data.senior.volunteer)
        }
        console.log(response.data.senior.volunteer)
        setUser({ message: "Found", data: response.data.senior })
      }).catch(err=>alert(err.response.data.message))
      setUser({ message: "Found but not Volunteer", data: JSON.parse(userData) });
    } else {
      setUser({ message: "Not Found" });
    }
  }, []);

  if (user.message !== "Searching" && user.message === "Not Found") {
    return <Navigate to="/login" replace />;
  }

  const requestSenior = async (senior) => {
    try {
      const response = await axios.post(
        `https://golden-guardians-backend.onrender.com/volunteer/volunteer/connect`,
        { volunteerEmail: user.data.email,seniorEmail:senior.email }
      );
      console.log(response.data)
     Cookies.set("user",JSON.stringify(response.data.volunteer))
     setSenior(senior)
      alert(response.data.message)
    } catch (err) {
      console.error("Error fetching matches:", err);
    }
  }

  
  return (
    <><Navbar />
     <div className="min-h-screen bg-[#FAEDCD] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#8B4513] mb-2">
            Welcome back, {user.data?.name || 'Volunteer'}
          </h1>
          <p className="text-[#A0522D] text-lg">
            Making a difference in your community
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {(senior.data)?<div className="bg-[#FFF8EA] p-6 rounded-lg shadow-md flex items-center">
            <div className="rounded-full bg-[#FFF8EA] p-3 mr-4">
              <Clock className="h-6 w-6 text-[#8B4513]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#8B4513]">{(senior.date)?calculateDuration(senior.startTime,senior.endTime):"0 hours"}</h3>
              <p className="text-[#A0522D]">Volunteered</p>
            </div>
          </div>:null}
          {/* <div className="bg-[#FFF8EA] p-6 rounded-lg shadow-md flex items-center">
            <div className="rounded-full bg-[#FFF8EA] p-3 mr-4">
              <Heart className="h-6 w-6 text-[#8B4513]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#8B4513]">{stats.peopleHelped}</h3>
              <p className="text-[#A0522D]">People Helped</p>
            </div>
          </div> */}
          <div className="bg-[#FFF8EA] p-6 rounded-lg shadow-md flex items-center">
            <div className="rounded-full bg-[#FFF8EA] p-3 mr-4">
              <Award className="h-6 w-6 text-[#8B4513]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#8B4513]">{(user.data && user.data.skills)?user.data.skills.length:(user.data && user.data.interests)?user.data.interests.length:0}</h3>
              <p className="text-[#A0522D]">Skills Offered</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upcoming Visits */}
          <div className="bg-[#FFF8EA] p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#8B4513]">Upcoming Visits</h2>
              <Calendar className="h-5 w-5 text-[#8B4513]" />
            </div>
            <div className="space-y-4">
              
               {(senior.date)? <div className="border-b border-[#DEB887] pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-[#8B4513]">{senior.task}</h3>
                    <span className="text-sm font-medium text-[#A0522D] bg-[#FFF8EA] px-2 py-1 rounded">
                      {senior.date}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-[#A0522D] mb-1">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatTime(senior.startTime)} -  {formatTime(senior.endTime)}
                  </div>
                  <div className="flex items-center text-sm text-[#A0522D]">
                    <MapPin className="h-4 w-4 mr-1" />
                    {senior.city}
                  </div>
                </div>:(volunteer.date)?<div className="border-b border-[#DEB887] pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-[#8B4513]">{volunteer.task}</h3>
                    <span className="text-sm font-medium text-[#A0522D] bg-[#FFF8EA] px-2 py-1 rounded">
                      {volunteer.date}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-[#A0522D] mb-1">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatTime(volunteer.startTime)} -  {formatTime(volunteer.endTime)}
                  </div>
                  <div className="flex items-center text-sm text-[#A0522D]">
                    <MapPin className="h-4 w-4 mr-1" />
                    {volunteer.city}
                  </div>
                </div>:<div>No upcomming events</div>}
        
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-[#FFF8EA] p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#8B4513]">Notifications</h2>
              <Bell className="h-5 w-5 text-[#8B4513]" />
            </div>
            <div className="space-y-4">
                {(senior.task)?<div className="border-b border-[#DEB887] pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[#8B4513] font-medium">task assigned by admin: {senior.task}</p>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      // notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                      // notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      High
                    </span>
                  </div>
                  <p className="text-sm text-[#A0522D]">{(senior.assTime)?timeAgo(senior.assTime):"Just now"}</p>
                </div>:null
                }
                {(volunteer.task)?<div className="border-b border-[#DEB887] pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[#8B4513] font-medium">task assigned by admin: {volunteer.task}</p>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      // notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                      // notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      High
                    </span>
                  </div>
                  <p className="text-sm text-[#A0522D]">{(volunteer.assTime)?timeAgo(volunteer.assTime):"Just now"}</p>
                </div>:null
                }
                {(senior.email || volunteer.email)?<div className="border-b border-[#DEB887] pb-4">
                  <div className="flex items-center justify-between mb-2">
                  <p className="text-[#8B4513] font-medium">Your {senior.email?"Senior":"Volunteer"}:{senior.email?senior.email:volunteer.email} {(senior.status=="Assigned")?"Approved"+" by admin":senior.status} {(volunteer.status=="Assigned")?"Approved"+" by admin":volunteer.status} </p>
                  
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      // notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                      // notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      High
                    </span>
                  </div>
                  {/* <p className="text-sm text-[#A0522D]">{(volunteer.time)?timeAgo(volunteer.time):"Just now"}</p> */}
                  <p className="text-sm text-[#A0522D]">{(volunteer.status=="Requested")?timeAgo(volunteer.reqTime):(senior.status=="Requested")?timeAgo(senior.reqTime):(volunteer.status=="Assigned")?timeAgo(volunteer.assTime):(senior.status=="Assigned")?timeAgo(senior.assTime):"Just now"}</p>
                </div>:null}
                {!(senior.task || volunteer.task || senior.email || volunteer.email)?<div> <p className="text-sm text-[#A0522D]">No Notifications recieved</p></div>:null}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#FFF8EA] p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-[#8B4513] mb-6">Quick Actions</h2>
            <div className="grid grid-rows-2-gap-2">
              {/* <button className="flex flex-col items-center justify-center p-4 bg-[#FFF8EA] rounded-lg hover:bg-[#DEB887] transition-colors duration-200">
                <MessageSquare className="h-6 w-6 text-[#8B4513] mb-2" />
                <span className="text-sm font-medium text-[#8B4513]">Messages</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-[#FFF8EA] rounded-lg hover:bg-[#DEB887] transition-colors duration-200">
                <Calendar className="h-6 w-6 text-[#8B4513] mb-2" />
                <span className="text-sm font-medium text-[#8B4513]">Schedule</span>
              </button> */}
              <Link to="/profile" className="flex flex-col items-center justify-center p-4 bg-[#FFF8EA] rounded-lg hover:bg-[#DEB887] transition-colors duration-200">
                <User className="h-6 w-6 text-[#8B4513] mb-2" />
                <button className="text-sm font-medium text-[#8B4513]">Profile</button>
              </Link>
              {/* <button className="flex flex-col items-center justify-center p-4 bg-[#FFF8EA] rounded-lg hover:bg-[#DEB887] transition-colors duration-200">
                <Settings className="h-6 w-6 text-[#8B4513] mb-2" />
                <span className="text-sm font-medium text-[#8B4513]">Call</span>
              </button> */}
            </div>
          </div>
        </div>

        {/* Matches Section */}
        {(user.data.interests)?  <div className="mt-8">
          <h2 className="text-2xl font-semibold text-[#8B4513] mb-4">Your Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.length === 0 ? (
              <div className="bg-[#FFF8EA] p-6 rounded-lg shadow-md">
                <p className="text-[#A0522D] text-center">No matches found yet. We'll notify you when we find someone!</p>
              </div>
            ) : (
              matches.map((match, id) => (
                <div key={id} className="bg-[#FFF8EA] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-[#FFF8EA] p-3 mr-4">
                      <User className="h-6 w-6 text-[#8B4513]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#8B4513]">{match.name}</h3>
                      <p className="text-sm text-[#A0522D]">{match.email}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>:null}
        {(!senior.email && user.data.skills)? <div className="mt-8">
          <h2 className="text-2xl font-semibold text-[#8B4513] mb-4">Your Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.length === 0 ? (
              <div className="bg-[#FFF8EA] p-6 rounded-lg shadow-md">
                <p className="text-[#A0522D] text-center">No matches found yet. We'll notify you when we find someone!</p>
              </div>
            ) : (
              matches.map((match, id) => (
                <div key={id} className="bg-[#FFF8EA] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-[#FFF8EA] p-3 mr-4">
                      <User className="h-6 w-6 text-[#8B4513]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#8B4513]">{match.name}</h3>
                      <p className="text-sm text-[#A0522D]">{match.email}</p>
                    </div>
                  </div>
                  <button className="w-full bg-[#8B4513] text-white py-2 rounded-lg hover:bg-[#A0522D] transition-colors duration-200" onClick={()=>{requestSenior(match)}}>
                    Connect
                  </button>
                </div>
              ))
            )}
          </div>
        </div>:null}
      </div>
    </div>
    </>
   
  );
};

export default Dashboard;