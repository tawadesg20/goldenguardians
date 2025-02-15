import React from 'react';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';

const EventCalendar = () => {
  const upcomingEvents = [
    {
      title: "Morning Yoga",
      date: "2024-03-20",
      time: "09:00 AM",
      location: "Community Center",
      type: "Activity"
    },
    {
      title: "Health Checkup",
      date: "2024-03-22",
      time: "11:00 AM",
      location: "Medical Center",
      type: "Healthcare"
    },
    {
      title: "Game Evening",
      date: "2024-03-25",
      time: "04:00 PM",
      location: "Recreation Room",
      type: "Social"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-[#8B4513]">Upcoming Events</h3>
        <CalendarIcon className="w-6 h-6 text-[#8B4513]" />
      </div>
      <div className="space-y-4">
        {upcomingEvents.map((event, index) => (
          <div key={index} className="border-l-4 border-[#8B4513] pl-4 py-2">
            <h4 className="font-semibold text-[#8B4513]">{event.title}</h4>
            <div className="flex items-center text-[#A0522D] text-sm mt-1">
              <Clock className="w-4 h-4 mr-1" />
              <span>{event.time}</span>
              <MapPin className="w-4 h-4 ml-4 mr-1" />
              <span>{event.location}</span>
            </div>
            <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-[#DEB887] text-[#8B4513]">
              {event.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;