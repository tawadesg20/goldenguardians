import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from 'axios';
import { Calendar, Clock, MessageSquare, Bell, Settings, User, Heart, MapPin, Award } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState({ message: "Searching" });
  const [matches, setMatches] = useState([]);
  const [stats, setStats] = useState({
    hoursVolunteered: 24,
    peopleHelped: 5,
    skillsOffered: 3
  });

  const matchingAlgorithm = async (skills) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/${skills ? "volunteer" : "senior"}/matches`,
        { email: user.data.email }
      );
      setMatches(response.data.matches);
    } catch (err) {
      console.error("Error fetching matches:", err);
    }
  };

  useEffect(() => {
    if (user.message !== "Searching") {
      const userData = JSON.parse(Cookies.get("user") || "{}");
      const fetchData = async () => {
        await matchingAlgorithm(userData.skills);
      };

      fetchData();
      const interval = setInterval(fetchData, 5000);
      return () => clearInterval(interval);
    }
  }, [user]);

  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData && JSON.parse(userData).skills) {
      setUser({ message: "Found", data: JSON.parse(userData) });
    } else if (userData) {
      setUser({ message: "Found but not Volunteer", data: JSON.parse(userData) });
    } else {
      setUser({ message: "Not Found" });
    }
  }, []);

  if (user.message !== "Searching" && user.message === "Not Found") {
    return <Navigate to="/login" replace />;
  }

  const upcomingVisits = [
    { id: 1, date: '2025-03-20', time: '10:00 AM', type: 'Reading Session', location: 'Golden Age Center' },
    { id: 2, date: '2025-03-22', time: '2:00 PM', type: 'Walking Companion', location: 'Sunset Park' },
  ];

  const notifications = [
    { id: 1, message: 'New volunteer match available', time: '2 hours ago', priority: 'high' },
    { id: 2, message: 'Upcoming visit reminder', time: '1 day ago', priority: 'medium' },
    { id: 3, message: 'Thank you message from Sarah', time: '2 days ago', priority: 'low' },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8EA] py-8 px-4 sm:px-6 lg:px-8">
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
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className="rounded-full bg-[#FFF8EA] p-3 mr-4">
              <Clock className="h-6 w-6 text-[#8B4513]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#8B4513]">{stats.hoursVolunteered}h</h3>
              <p className="text-[#A0522D]">Hours Volunteered</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className="rounded-full bg-[#FFF8EA] p-3 mr-4">
              <Heart className="h-6 w-6 text-[#8B4513]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#8B4513]">{stats.peopleHelped}</h3>
              <p className="text-[#A0522D]">People Helped</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className="rounded-full bg-[#FFF8EA] p-3 mr-4">
              <Award className="h-6 w-6 text-[#8B4513]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#8B4513]">{stats.skillsOffered}</h3>
              <p className="text-[#A0522D]">Skills Offered</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upcoming Visits */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#8B4513]">Upcoming Visits</h2>
              <Calendar className="h-5 w-5 text-[#8B4513]" />
            </div>
            <div className="space-y-4">
              {upcomingVisits.map((visit) => (
                <div key={visit.id} className="border-b border-[#DEB887] pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-[#8B4513]">{visit.type}</h3>
                    <span className="text-sm font-medium text-[#A0522D] bg-[#FFF8EA] px-2 py-1 rounded">
                      {visit.date}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-[#A0522D] mb-1">
                    <Clock className="h-4 w-4 mr-1" />
                    {visit.time}
                  </div>
                  <div className="flex items-center text-sm text-[#A0522D]">
                    <MapPin className="h-4 w-4 mr-1" />
                    {visit.location}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#8B4513]">Notifications</h2>
              <Bell className="h-5 w-5 text-[#8B4513]" />
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="border-b border-[#DEB887] pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[#8B4513] font-medium">{notification.message}</p>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                      notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {notification.priority}
                    </span>
                  </div>
                  <p className="text-sm text-[#A0522D]">{notification.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
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
              <button className="flex flex-col items-center justify-center p-4 bg-[#FFF8EA] rounded-lg hover:bg-[#DEB887] transition-colors duration-200">
                <User className="h-6 w-6 text-[#8B4513] mb-2" />
                <span className="text-sm font-medium text-[#8B4513]">Profile</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-[#FFF8EA] rounded-lg hover:bg-[#DEB887] transition-colors duration-200">
                <Settings className="h-6 w-6 text-[#8B4513] mb-2" />
                <span className="text-sm font-medium text-[#8B4513]">Call</span>
              </button>
            </div>
          </div>
        </div>

        {/* Matches Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-[#8B4513] mb-4">Your Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-[#A0522D] text-center">No matches found yet. We'll notify you when we find someone!</p>
              </div>
            ) : (
              matches.map((match, id) => (
                <div key={id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-[#FFF8EA] p-3 mr-4">
                      <User className="h-6 w-6 text-[#8B4513]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#8B4513]">{match.name}</h3>
                      <p className="text-sm text-[#A0522D]">{match.email}</p>
                    </div>
                  </div>
                  <button className="w-full bg-[#8B4513] text-white py-2 rounded-lg hover:bg-[#A0522D] transition-colors duration-200">
                    Connect
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;