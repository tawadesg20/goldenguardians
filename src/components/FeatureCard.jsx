import React from 'react';
import { Heart, Users, Clock, MapPin } from 'lucide-react';


const FeatureCard = ({ icon, title, description }) => {
  const getIcon = () => {
    switch (icon) {
      case 'heart':
        return <Heart className="w-8 h-8 text-[#8B4513]" />;
      case 'users':
        return <Users className="w-8 h-8 text-[#8B4513]" />;
      case 'clock':
        return <Clock className="w-8 h-8 text-[#8B4513]" />;
      case 'location':
        return <MapPin className="w-8 h-8 text-[#8B4513]" />;
    }
  };

  return (
    <div className="bg-[#faedcd] p-6 rounded-lg shadow-md">
      <div className="mb-4">{getIcon()}</div>
      <h3 className="text-xl font-semibold text-[#8B4513] mb-2">{title}</h3>
      <p className="text-[#A0522D]">{description}</p>
    </div>
  );
};

export default FeatureCard;