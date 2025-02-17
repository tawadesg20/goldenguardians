import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Edit } from 'lucide-react';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    skills: [],
    hobbies: '',
    certifications: '',
    availability: [],
    experience: '',
    emergencyContact: { name: '', phone: '', relationship: '' },
    standoutDetails: '',
    cv: null,
  });

  useEffect(() => {
    const userData = Cookies.get('user');
    if (userData) {
      setProfileData(JSON.parse(userData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfileData({ ...profileData, cv: e.target.files[0] });
  };

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:5000/update-profile', profileData);
      Cookies.set('user', JSON.stringify(profileData));
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="bg-[#FAEDCD] min-h-screen flex justify-center py-10">
      <div className="bg-[#FFF8EA] p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-[#8B4513] mb-6">Edit Profile</h2>

        <h3 className="text-xl font-semibold text-[#A0522D]">Personal Information</h3>
        <input name="firstName" value={profileData.firstName} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="First Name" />
        <input name="lastName" value={profileData.lastName} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="Last Name" />
        <input name="email" value={profileData.email} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="Email" />

        <h3 className="text-xl font-semibold text-[#A0522D] mt-6">Address</h3>
        <input name="streetAddress" value={profileData.streetAddress} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="Street Address" />
        <input name="city" value={profileData.city} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="City" />
        <input name="state" value={profileData.state} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="State" />
        <input name="zipCode" value={profileData.zipCode} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="ZIP Code" />

        <h3 className="text-xl font-semibold text-[#A0522D] mt-6">Skills and Hobbies</h3>
        <textarea name="skills" value={profileData.skills} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="List your skills"></textarea>
        <textarea name="hobbies" value={profileData.hobbies} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="List your hobbies"></textarea>

        <h3 className="text-xl font-semibold text-[#A0522D] mt-6">Certification(Optional)</h3>
        <textarea name="certification" value={profileData.certifications} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="mention list of any updated certification"></textarea>

        
        <h3 className="text-xl font-semibold text-[#A0522D] mt-6">Experience</h3>
        <select name="experience" value={profileData.experience} onChange={handleChange} className="border p-2 w-full mt-2">
          <option value="">Select experience level</option>
          <option value="Fresher">Fresher</option>
          <option value="1-2 years">1-2 years</option>
          <option value="3-5 years">3-5 years</option>
          <option value="6+ years">6+ years</option>
        </select>

        <h3 className="text-xl font-semibold text-[#A0522D] mt-6">Update CV</h3>
        <input type="file" onChange={handleFileChange} className="border p-2 w-full mt-2" />
        {profileData.cv && <p className="mt-2 text-sm text-[#8B4513]">{profileData.cv.name}</p>}

        <button onClick={handleSave} className="bg-[#8B4513] text-white px-4 py-2 rounded-lg mt-4 hover:bg-[#A0522D] flex items-center">
          <Edit className="mr-2" /> Save
        </button>
      </div>
    </div>
  );
};

export default Profile;
