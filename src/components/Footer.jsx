import React from 'react';
import { Instagram, Linkedin, Youtube } from 'lucide-react';
import Logo from './Logo.jsx';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-[#fefae0] text-white py-6 px-4 md:px-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/"><Logo /></Link>
            <p className="mt-4 text-[#8B4513]">Golden Guardians</p>
            <a href='tel:7718097415' className="text-[#A0522D]">7718097415</a><br />
            <a href='mailto:goldguardians@contact.in' className="text-[#A0522D]">goldguardians@contact.in</a>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-[#8B4513] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-[#A0522D] hover:text-[#8B4513]">Home</Link></li>
              <li><Link to="/events" className="text-[#A0522D] hover:text-[#8B4513]">Events</Link></li>
              <li><Link to="/careers" className="text-[#A0522D] hover:text-[#8B4513]">Careers</Link></li>
              <li><Link to="/contact" className="text-[#A0522D] hover:text-[#8B4513]">Contact</Link></li>
              
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-[#8B4513] mb-4">Support</h3>
            <a href='tel:7718097415' 
             className="text-[#A0522D]">7718097415</a>
            <p className="text-[#A0522D] mt-2">Live life to the fullest!</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-[#8B4513] mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-[#8B4513] hover:text-[#A0522D]">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-[#8B4513] hover:text-[#A0522D]">
              <a href="https://www.linkedin.com/in/shivani-tawade-9a051727b/" target='_blank'><Linkedin className="w-6 h-6" /></a>
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