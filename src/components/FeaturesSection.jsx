import React from 'react';
import { Link } from 'react-router-dom';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  return (
    <div className="py-16 bg-[#fefae0]">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-[#8B4513] text-center mb-4">
        "Listen, Share, and Laugh with GoldenGuardians!!"
        </h1>
        <p className="text-xl text-[#A0522D] text-center mb-12">
          Companionship Knows No Age – Join Us!
        </p>
        
        <div className="flex justify-center gap-4 mb-16">
          <Link
            to="/senior-registration"
            className="px-8 py-3 bg-[#8B4513] text-white rounded-md hover:bg-[#A0522D] transition-colors"
          >
            Register as Senior
          </Link>
          <Link
            to="/volunteer-registration"
            className="px-8 py-3 bg-[#DEB887] text-[#8B4513] rounded-md hover:bg-[#D2B48C] transition-colors"
          >
            Become a Volunteer
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon="heart"
            title="Companionship"
            description="Connect with caring volunteers who share your interests"
          />
          <FeatureCard
            icon="users"
            title="Community"
            description="Join a vibrant community of seniors and volunteers"
          />
          <FeatureCard
            icon="clock"
            title="Flexible Schedule"
            description="Choose times that work best for you"
          />
          <FeatureCard
            icon="location"
            title="Local Support"
            description="Connect with volunteers in your area"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;