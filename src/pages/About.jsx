import React from 'react';
import { Award, Heart, Users } from 'lucide-react';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#faedcd]">
      {/* Main Content */}
      <div className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Heading Section */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-[#8B4513] mb-6 sm:mb-8">
              About Golden Guardians
            </h1>
            <p className="text-lg sm:text-xl text-[#A0522D] mb-10 max-w-3xl mx-auto leading-relaxed">
              Inspired by the GoodFellows initiative by Shantanu Naidu and Ratan Tata, Golden Guardians bridges the generation gap by connecting compassionate volunteers with seniors in need of companionship.
            </p>
          </div>

          {/* Mission, Community, and Values Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-6">
                  {React.cloneElement(card.icon, {
                    className: "h-12 w-12 text-[#8B4513]",
                  })}
                </div>
                <h3 className="text-xl font-bold text-[#8B4513] mb-4 text-center">
                  {card.title}
                </h3>
                <p className="text-[#A0522D] text-center leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const cards = [
  {
    icon: <Heart />,
    title: "Our Mission",
    description:
      "To create meaningful connections between generations, fostering companionship and mutual growth.",
  },
  {
    icon: <Users />,
    title: "Our Community",
    description:
      "A vibrant network of compassionate volunteers and wisdom-rich seniors creating lasting bonds.",
  },
  {
    icon: <Award />,
    title: "Our Values",
    description:
      "Respect, empathy, and dedication to enriching lives through intergenerational relationships.",
  },
];

export default About;
