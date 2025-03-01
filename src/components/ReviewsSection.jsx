import React from 'react';
import ReviewCard from './ReviewCard';

const ReviewsSection = () => {
  return (
    <div className="py-16 bg-[#e9edc9]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-display font-bold text-[#8B4513] text-center mb-12">
          Latest Reviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ReviewCard
            name="Grendel Denoza"
            age="87"
            rating={5}
            type="GrandPal"
          />
          <ReviewCard
            name="Ram Patel"
            age="80"
            rating={5}
            type="GrandPal"
          />
          <ReviewCard
            name="Neela"
            age="89"
            rating={5}
            type="GrandPal"
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;