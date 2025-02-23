import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Register = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col bg-[#faedcd]">
    {/* Content Wrapper */}
    <div className="flex-grow flex flex-col py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-[#8B4513] mb-4">Welcome to Golden Guardians</h1>
          <p className="text-lg text-[#A0522D] max-w-3xl mx-auto">
            Choose your path to join our caring community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div 
            className="bg-[#FFF8EA] rounded-lg shadow-md p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Heart className="h-16 w-16 text-[#8B4513] mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-[#8B4513] mb-4">Senior Citizens</h2>
            <p className="text-[#A0522D] mb-8">
              Connect with caring volunteers and enjoy meaningful companionship
            </p>
            <ul className="text-left space-y-4 mb-8">
              {[
                'Free 30-day trial period',
                'Matched with compatible volunteers',
                'Access to various activities',
                '24/7 support system'
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center text-[#8B4513]"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <ArrowRight className="h-4 w-4 mr-2 text-[#D4A373]" />
                  {item}
                </motion.li>
              ))}
            </ul>
            <Link
              to="/senior-registration"
              className="group inline-flex items-center justify-center w-full bg-[#8B4513] text-white py-3 px-6 rounded-md hover:bg-[#A0522D] transition-all duration-300"
            >
              Register as Senior
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div 
            className="bg-[#FFF8EA] rounded-lg shadow-md p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <Users className="h-16 w-16 text-[#8B4513] mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-[#8B4513] mb-4">Volunteers</h2>
            <p className="text-[#A0522D] mb-8">
              Make a difference by sharing your time and companionship
            </p>
            <ul className="text-left space-y-4 mb-8">
              {[
                'Flexible scheduling',
                'Training provided',
                'Make meaningful connections',
                'Contribute to community'
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center text-[#8B4513]"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <ArrowRight className="h-4 w-4 mr-2 text-[#D4A373]" />
                  {item}
                </motion.li>
              ))}
            </ul>
            <Link
              to="/volunteer-registration"
              className="group inline-flex items-center justify-center w-full bg-[#D4A373] text-[#8B4513] py-3 px-6 rounded-md hover:bg-[#8B4513] hover:text-white transition-all duration-300"
            >
              Register as Volunteer
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-[#A0522D]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#8B4513] font-semibold hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>

    {/* Footer Section */}
    <Footer />
  </div></>
  );
};

export default Register;
