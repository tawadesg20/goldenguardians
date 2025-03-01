import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Heart } from 'lucide-react';
import AccessibleButton from '../components/AccessibleButton';
import EventCalendar from '../components/calendar/EventCalendar';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Events = () => {
  const [activeTab, setActiveTab] = useState('Festivals');

  const events = {
    'Festivals': [
      {
        title: "Holi Celebration",
        date: "March 25, 2024",
        time: "10:00 AM - 2:00 PM",
        location: "Community Center",
        image: "../images/hol.jpg",
        description: "Join us for a vibrant Holi celebration filled with colors, music, and joy. Special arrangements for senior citizens with gentle colors and assistance.",
        participants: "45+ registered"
      }
    ],
    'Workshops': [
      {
        title: "Gentle Yoga & Meditation",
        date: "Weekly - Every Tuesday",
        time: "9:00 AM - 10:00 AM",
        location: "Golden Gardens Studio",
        image: "./images/yoga.jpg",
        description: "Experience peace and wellness with our specialized yoga sessions designed for seniors. Professional instructors ensure safe and comfortable practice.",
        participants: "20+ registered"
      }
    ],
    'Parties': [
      {
        title: "Monthly Birthday Bash",
        date: "Last Sunday of every month",
        time: "4:00 PM - 7:00 PM",
        location: "Celebration Hall",
        image: "./images/dance.jpg",
        description: "A joyous celebration for all birthdays of the month. Enjoy music, cake, and create beautiful memories with your Golden Guardian family.",
        participants: "30+ registered"
      }
    ],
    'Seminar/Sessions': [
      {
        title: "Wellness Workshop",
        date: "December 15, 2023",
        time: "11:00 AM - 12:30 PM",
        location: "Health Center",
        image: "./images/training.jpg",
        description: "Learn about healthy living, nutrition, and wellness tips from expert healthcare professionals. Interactive Q&A session included.",
        participants: "25+ registered"
      }
    ]
  };

  return (
    <><Navbar /><div className="flex flex-col min-h-screen bg-[#faedcd]">
    <div className="px-4 md:px-8 lg:px-16 flex-grow">
    {/* Hero Section */}
    <div className="text-center py-8 md:py-12">
      <h1 className="text-4xl font-bold text-[#8B4513] mb-3">
        Join Our Vibrant Community Events
      </h1>
      <p className="text-lg text-[#A0522D] max-w-3xl mx-auto">
        Discover joy, make new friends, and create lasting memories with our carefully curated events designed for your comfort and enjoyment.
      </p>
    </div>

    {/* Navigation Tabs */}
    <div className="py-4 flex justify-center flex-wrap gap-3">
      {Object.keys(events).map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-2 text-lg rounded-full transition-all ${activeTab === tab 
            ? 'bg-[#8B4513] text-white' 
            : 'bg-white text-[#8B4513] border border-[#8B4513]'} hover:bg-[#A0522D] hover:text-white`}
        >
          {tab}
        </button>
      ))}
    </div>

    {/* Event Cards */}
    <div className="flex flex-col gap-6 py-8">
      {events[activeTab].map((event, index) => (
        <div key={index} className="bg-[#fefae0] rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row w-full transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full md:w-1/2 object-cover min-h-[250px] md:min-h-[300px] rounded-t-2xl md:rounded-l-2xl md:rounded-t-none"
          />
          <div className="p-6 flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#8B4513] mb-2">{event.title}</h3>
              <p className="text-md md:text-lg text-[#A0522D] mb-4 leading-relaxed">{event.description}</p>
              <div className="space-y-2 text-[#8B4513] text-base md:text-lg">
                <div className="flex items-center"><Calendar className="w-6 h-6 mr-3" /> {event.date}</div>
                <div className="flex items-center"><Clock className="w-6 h-6 mr-3" /> {event.time}</div>
                <div className="flex items-center"><MapPin className="w-6 h-6 mr-3" /> {event.location}</div>
                <div className="flex items-center"><Heart className="w-6 h-6 mr-3" /> {event.participants}</div>
              </div>
            </div>
            <AccessibleButton 
              variant="primary"
              size="large"
              onClick={() => {}}
              className="mt-6 w-full py-3 text-lg rounded-lg bg-[#8B4513] hover:bg-[#A0522D] text-white font-semibold shadow-md"
            >
              Register Now
            </AccessibleButton>
          </div>
        </div>
      ))}
    </div>
    </div>

    {/* Footer */}
    <Footer className="mt-auto w-full" />
  </div></>
    
  );
};

export default Events;
