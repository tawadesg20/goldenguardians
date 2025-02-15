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
            age="19"
            rating={5}
            type="GrandKid"
          />
          <ReviewCard
            name="Ram Patel"
            age="20"
            rating={5}
            type="GrandKid"
          />
          <ReviewCard
            name="Neela"
            age="18"
            rating={5}
            type="GrandKid"
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;