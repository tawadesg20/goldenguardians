import React from 'react';
import { Star } from 'lucide-react';

const ReviewCard = ({ name, age, type, rating }) => {
  return (
    <div className="bg-[#fefae0] p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
      <div className="flex gap-1 mb-2">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-[#8B4513] fill-current" />
        ))}
      </div>
      <p className="font-semibold text-[#8B4513]">{type}</p>
      <p className="text-[#A0522D]">Age: {age}</p>
      <div className="flex items-center mt-4">
        <div className="w-10 h-10 bg-[#DEB887] rounded-full flex items-center justify-center">
          <span className="text-white font-semibold">{name[0]}</span>
        </div>
        <span className="ml-3 text-[#8B4513]">{name}</span>
      </div>
    </div>
  );
};

export default ReviewCard;