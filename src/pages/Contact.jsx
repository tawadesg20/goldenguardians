import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
<<<<<<< HEAD
import { useState } from 'react';
=======
>>>>>>> ff2fc50649ef227f970b4243ad08df294a5489f5

const Contact = () => {
  const [contact,setContact] = useState({name:"",email:"",message:"",file:null})

    const handleChange = (e) => {
      const { name, type, files, value } = e.target;
      setContact({ ...contact, [name]: type == "file" ? files[0] : value });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData(); 
      data.append("name", contact.name);
      data.append("email", contact.email);
      data.append("message", contact.message);
      if(contact.file)
      data.append("file",contact.file);
  
      const API_URL = "https://golden-guardians-backend.onrender.com/sendemail";
      console.log(...data.entries())
      axios({
        method: "POST",
        url: API_URL,
        data:data,
    })
    .then((response) => {
      alert(response.data.message)
    })
    .catch((err) => {
        alert(err.response.data.message)
    });
    };
  

  return (
    <><Navbar />
    <div className="min-h-screen bg-[#faedcd] flex flex-col justify-between">
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-[#8B4513] mb-4">Contact Us</h1>
            <p className="text-lg text-[#A0522D] max-w-3xl mx-auto">
              We're here to help. Reach out to us with any questions or concerns.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-[#FFF8EA] p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-[#8B4513] mb-6">Get in Touch</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#8B4513]"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    id="name"
                    className="mt-1 block w-full rounded-md border-[#DEB887] shadow-sm focus:border-[#8B4513] focus:ring focus:ring-[#8B4513] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#8B4513]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    id="email"
                    className="mt-1 block w-full rounded-md border-[#DEB887] shadow-sm focus:border-[#8B4513] focus:ring focus:ring-[#8B4513] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#8B4513]"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-[#DEB887] shadow-sm focus:border-[#8B4513] focus:ring focus:ring-[#8B4513] focus:ring-opacity-50"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#8B4513] text-white py-2 px-4 rounded-md hover:bg-[#A0522D] transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-[#FFF8EA] p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-[#8B4513] mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-6 w-6 text-[#8B4513] mr-3" />
                    <a href="tel:7718097415" target='_blank' className="text-[#A0522D]">+91 7718097415</a>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 text-[#8B4513] mr-3" />
                    <a href="mailto:contact@goldenguardians.com" target='_blank' className="text-[#A0522D]">contact@goldenguardians.com</a>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-6 w-6 text-[#8B4513] mr-3" />
                    <span className="text-[#A0522D]">
                      123 Caring Street, Compassion City, CC 12345
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-[#FFF8EA] p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-[#8B4513] mb-6">Emergency Support</h2>
                <p className="text-[#A0522D] mb-4">
                  24/7 Emergency Support Line for registered members:
                </p>
                <a href="tel:7718097415" target='_blank'  className="flex items-center justify-center bg-[#FAEDCD] p-4 rounded-md">
                  <Phone className="h-6 w-6 text-[#8B4513] mr-3" />
                  <span href="mailto:contact@goldenguardians.com" target='_blank'  className="text-xl font-bold text-[#8B4513]">1-800-GUARDIAN</span>
                </a>
              </div>
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

export default Contact;
