import React, { useState } from "react";

const ProfileSenior = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    hobbies: '',
    disease: '',
    occupation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfile({ ...profile, profilePic: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", profile);
    alert("Profile updated successfully!");
  };

  return (
    <div className="bg-[#FAE6C4] min-h-screen p-6 flex justify-center">
      <div className="bg-[#F9E5C0] p-8 rounded-2xl shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-[#6D3B00] mb-6">Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <h3 className="text-xl font-semibold text-[#6D3B00]">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="firstName" value={profile.firstName} onChange={handleChange} placeholder="First Name" className="border p-2 w-full mt-2" />
            <input type="text" name="lastName" value={profile.lastName} onChange={handleChange} placeholder="Last Name" className="border p-2 w-full mt-2" />
          </div>
        
          <input type="email" name="email" value={profile.email} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="Email" readOnly />

          {/* Address */}
          <h3 className="text-xl font-semibold text-[#6D3B00]">Address</h3>
          <input type="text" name="street" value={profile.street} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="Street Address" />
          <div className="grid grid-cols-3 gap-4">
            <input type="text" name="city" value={profile.city} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="City"  />
            <input type="text" name="state" value={profile.state} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="State"/>
            <input type="text" name="zip" value={profile.zip} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="ZIP Code"/>
          </div>

          {/* Skills & Hobbies */}
          <h3 className="text-xl font-semibold text-[#6D3B00]">Skills and Hobbies</h3>
          <input type="text" name="hobbies" value={profile.hobbies} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="List your skills and hobbies"/>

          {/* disease */}
          <h3 className="text-xl font-semibold text-[#6D3B00]">Disease</h3>
          <input type="text" name="disease" value={profile.disease} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="Mention health disease/ Any Issues related to health" />

          {/* Occupation */}
          <h3 className="text-xl font-semibold text-[#6D3B00]">Experience</h3>
        <textarea name="occupation" value={profile.occupation} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="Occupation/Name od the Work Fied"></textarea>

          {/* Save Button */}
          <button type="submit" className="bg-[#6D3B00] text-white py-2 px-6 rounded-lg hover:bg-[#523000]">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSenior;
