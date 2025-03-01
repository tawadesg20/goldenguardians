import React from 'react';
import { Instagram, Linkedin, Youtube } from 'lucide-react';
import Logo from './Logo.jsx';

const Footer = () => {
  return (
    <footer className="w-full bg-[#fefae0] text-white py-6 px-4 md:px-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="mt-4 text-[#8B4513]">Golden Guardians</p>
            <p className="text-[#A0522D]">7718097415</p>
            <p className="text-[#A0522D]">goldguardians@contact.in</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-[#8B4513] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-[#A0522D] hover:text-[#8B4513]">Home</a></li>
              <li><a href="./events" className="text-[#A0522D] hover:text-[#8B4513]">Events</a></li>
              <li><a href="./careers" className="text-[#A0522D] hover:text-[#8B4513]">Careers</a></li>
              <li><a href="./contact" className="text-[#A0522D] hover:text-[#8B4513]">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-[#8B4513] mb-4">Support</h3>
            <p className="text-[#A0522D]">7718097415</p>
            <p className="text-[#A0522D] mt-2">Live life to the fullest!</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-[#8B4513] mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-[#8B4513] hover:text-[#A0522D]">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-[#8B4513] hover:text-[#A0522D]">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-[#8B4513] hover:text-[#A0522D]">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;