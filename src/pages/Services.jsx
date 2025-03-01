import React from "react";
import { Coffee, Book, Music, HeartHandshake, Footprints, Gamepad2 } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Services = () => {
  return (
    <>
    <Navbar />
    <div className="min-h-screen flex flex-col bg-[#FAEDCD] text-[#5C3D2E]">
      {/* Main Content */}
      <div className="flex-grow py-16 px-6 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#8B4513] mb-3">Our Services</h1>
            <p className="text-lg text-[#A0522D] max-w-3xl mx-auto">
              Bringing joy, companionship, and meaningful experiences to seniors through our dedicated volunteer network.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          {/* Subscription Plans */}
          <div className="mt-20 bg-[#fefae0] p-8 rounded-lg shadow-lg border border-[#E2C799]">
            <h2 className="text-3xl font-semibold text-[#8B4513] text-center mb-6">Subscription Plans</h2>
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
    </>
  );
};

const services = [
  { icon: <Coffee className="h-9 w-9 text-[#8B4513]" />, title: "Social Companionship", description: "Heartfelt conversations and friendly visits to keep seniors engaged." },
  { icon: <Book className="h-9 w-9 text-[#8B4513]" />, title: "Reading Sessions", description: "Shared book readings and storytelling for a delightful experience." },
  { icon: <Music className="h-9 w-9 text-[#8B4513]" />, title: "Music & Arts", description: "Musical evenings, painting, and other creative activities." },
  { icon: <HeartHandshake className="h-9 w-9 text-[#8B4513]" />, title: "Emotional Support", description: "Empathetic listening and care for emotional well-being." },
  { icon: <Footprints className="h-9 w-9 text-[#8B4513]" />, title: "Walking Companion", description: "Accompanied strolls for fresh air and movement." },
  { icon: <Gamepad2 className="h-9 w-9 text-[#8B4513]" />, title: "Games & Activities", description: "Engaging board games and mental exercises." }
];

const plans = [
  { name: "Trial", price: "Free", duration: "30 Days", features: ["Basic companionship services", "2 visits per week", "Emergency support"] },
  { name: "Basic", price: "₹999/-", duration: "per month", features: ["All trial features", "4 visits per week", "Activity planning", "24/7 support line"] },
  { name: "Premium", price: "₹2499/-", duration: "per month", features: ["All basic features", "Daily visits available", "Specialized activities", "Priority matching", "Dedicated coordinator"] }
];

const ServiceCard = ({ icon, title, description }) => (
  <div className="bg-[#FFF8EA] p-6 rounded-lg shadow-md border border-[#E2C799] hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
    <div className="flex items-center justify-center h-14 w-14 bg-[#D4A373] rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-[#8B4513] mb-2">{title}</h3>
    <p className="text-[#5C3D2E]">{description}</p>
  </div>
);

const PlanCard = ({ name, price, duration, features }) => (
  <div className="bg-[#FFF8EA] p-6 rounded-lg shadow-md border border-[#E2C799] text-center hover:shadow-lg transition-shadow">
    <h3 className="text-2xl font-bold text-[#8B4513] mb-2">{name}</h3>
    <div className="text-3xl font-bold text-[#A0522D] mb-1">{price}</div>
    <div className="text-sm text-[#A0522D] mb-4">{duration}</div>
    <ul className="text-left space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-[#8B4513]">
          <span className="mr-2 black-tick"></span> {feature}
        </li>
      ))}
    </ul>
  </div>
);

export default Services;
