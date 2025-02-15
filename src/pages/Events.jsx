import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Heart } from 'lucide-react';
import AccessibleButton from '../components/AccessibleButton';
import EventCalendar from '../components/calendar/EventCalendar';
import Footer from '../components/Footer';

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
    <div className="min-h-screen bg-[#FFF8EA]">
      {/* Hero Section */}
      <div className="bg-[#DEB887] py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#8B4513] mb-4">
            Join Our Vibrant Community Events
          </h1>
          <p className="text-xl text-[#8B4513] max-w-2xl mx-auto">
            Discover joy, make new friends, and create lasting memories with our carefully curated events designed for your comfort and enjoyment.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-[#CCD5AE]shadow-md py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center space-x-4 overflow-x-auto">
            {Object.keys(events).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-full text-lg transition-colors whitespace-nowrap
                  ${activeTab === tab 
                    ? 'bg-[#8B4513] text-[#FFF8EA] hover:bg-[#A0522D]' 
                    : 'bg-[#FFF8EA] text-[#8B4513] hover:bg-[#F5E6D3]'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Event Calendar */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <EventCalendar />
      </div>

      {/* Event Cards */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8">
          {events[activeTab].map((event, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2 gap-6">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover min-h-[300px]"
                />
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-[#8B4513] mb-4">{event.title}</h3>
                    <p className="text-lg text-[#A0522D] mb-6">{event.description}</p>
                    <div className="space-y-3">
                      <div className="flex items-center text-[#8B4513]">
                        <Calendar className="w-6 h-6 mr-3" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-[#8B4513]">
                        <Clock className="w-6 h-6 mr-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-[#8B4513]">
                        <MapPin className="w-6 h-6 mr-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-[#8B4513]">
                        <Heart className="w-6 h-6 mr-3" />
                        <span>{event.participants}</span>
                      </div>
                    </div>
                  </div>
                  <AccessibleButton 
                    variant="primary"
                    size="large"
                    onClick={() => {}}
                    className="mt-6"
                  >
                    Register Now
                  </AccessibleButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Events;