import React from 'react';
import { Coffee, Book, Music, HeartHandshake, Footprints, Gamepad2 } from 'lucide-react';
import Footer from '../components/Footer';

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#faedcd]">
      {/* Main Content */}
      <div className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-[#8B4513] mb-4">Our Services</h1>
            <p className="text-lg text-[#A0522D] max-w-3xl mx-auto">
              We offer a range of companionship services tailored to enrich the lives of our senior community members.
            </p>
          </div>

          {/* Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          {/* Subscription Plans */}
          <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-[#8B4513] mb-4">Subscription Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <PlanCard key={index} {...plan} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const services = [
  {
    icon: <Coffee className="h-8 w-8" />,
    title: "Social Companionship",
    description: "Regular visits for conversation and companionship"
  },
  {
    icon: <Book className="h-8 w-8" />,
    title: "Reading Sessions",
    description: "Shared reading time with volunteers"
  },
  {
    icon: <Music className="h-8 w-8" />,
    title: "Music & Arts",
    description: "Creative activities and music appreciation"
  },
  {
    icon: <HeartHandshake className="h-8 w-8" />,
    title: "Emotional Support",
    description: "Compassionate listening and conversation"
  },
  {
    icon: <Footprints className="h-8 w-8" />,
    title: "Walking Companion",
    description: "Accompanied walks and outdoor activities"
  },
  {
    icon: <Gamepad2 className="h-8 w-8" />,
    title: "Games & Activities",
    description: "Board games and mental stimulation activities"
  }
];

const plans = [
  {
    name: "Trial",
    price: "Free",
    duration: "30 days",
    features: [
      "Basic companionship services",
      "2 visits per week",
      "Emergency support"
    ]
  },
  {
    name: "Basic",
    price: "$49",
    duration: "per month",
    features: [
      "All trial features",
      "4 visits per week",
      "Activity planning",
      "24/7 support line"
    ]
  },
  {
    name: "Premium",
    price: "$99",
    duration: "per month",
    features: [
      "All basic features",
      "Daily visits available",
      "Specialized activities",
      "Priority matching",
      "Dedicated coordinator"
    ]
  }
];

const ServiceCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="text-[#8B4513] mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-[#8B4513] mb-2">{title}</h3>
    <p className="text-[#A0522D]">{description}</p>
  </div>
);

const PlanCard = ({ name, price, duration, features }) => (
  <div className="bg-[#FFF8EA] p-6 rounded-lg shadow-md text-center">
    <h3 className="text-xl font-bold text-[#8B4513] mb-2">{name}</h3>
    <div className="text-2xl font-bold text-[#A0522D] mb-1">{price}</div>
    <div className="text-sm text-[#A0522D] mb-4">{duration}</div>
    <ul className="text-left space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-[#8B4513]">
          <span className="mr-2">•</span>
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

export default Services;
