import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Edit } from 'lucide-react';

const Profile = () => {
   const [profileData, setProfileData] = useState({
     name: "",
     email:"",
     address: "",
     city: "",
     state: "",
     zipcode: "",
     skills: "",
     interests:"",
     ename:"",
     ephone:"",
     specialneeds:"",
     erelation:"",
     hobbies: "",
     certification:"",
     experience:"",
     file: null,
   });

  useEffect(() => {
    const userData = Cookies.get('user');
    if (userData) {
      let user = JSON.parse(userData);
     if(user.skills)
     {
      axios.get(`https://golden-guardians-backend.onrender.com/volunteer/${user.email}`).then(response=>
        {
          user = response.data.volunteer;
          setProfileData({name:user.name,email:user.email,address:user.address,city:user.city,state:user.state,zipcode:user.zipcode,skills:user.skills.toString(),hobbies:user.hobbies?user.hobbies:"",certification:user.certification?user.certification:"",experience:user.experience,file:null,filename:user.application.resume.filename});
        }
        ).catch(err=>alert(err.response.message))
     }
     if(user.interests)
     {
      axios.get(`https://golden-guardians-backend.onrender.com/senior/${user.email}`).then(response=>
        {
          user = response.data.senior;
          setProfileData({name:user.name,email:user.email,address:user.address,city:user.city,state:user.state,zipcode:user.zipcode,interests:user.interests.toString(),ename:user.emergencycontact.emergencyContactName,ephone:user.emergencycontact.emergencyContactPhone,erelation:user.emergencycontact.emergencyContactRelation,specialneeds:user.specialneeds});
        }
        ).catch(err=>console.log(err.response.data.message))
     }
    }
  }, []);

  

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    setProfileData({ ...profileData, [name]: type == "file" ? files[0] : value });
    console.log("")
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    profileData.interests = (profileData.interests)?profileData.interests.split(","):[]
    profileData.skills=(profileData.skills)?profileData.skills.split(","):[]
    const data = new FormData();
     data.append("name", profileData.name);
    data.append("email", profileData.email);
    data.append("address", profileData.address);
    data.append("city", profileData.city);
    data.append("state", profileData.state);
    data.append("zipcode", profileData.zipcode);
    data.append("skills", profileData.skills);
    data.append("specialneeds", profileData.specialneeds);
    data.append("interests", profileData.interests);
    data.append("hobbies",  profileData.hobbies);
    data.append("ename",  profileData.ename);
    data.append("ephone",  profileData.ephone);
    data.append("erelation",  profileData.erelation);
    data.append("certification", profileData.certification);
    data.append("experience", profileData.experience);
    if(profileData.file)
    data.append("file",profileData.file);
    profileData.interests = (profileData.interests)?profileData.interests.join(","):[]
    profileData.skills=(profileData.skills)?profileData.skills.join(","):[]

    const API_URL = "https://golden-guardians-backend.onrender.com";
    console.log(...data.entries())
    axios({
      method: "POST",
      url: API_URL+`/${profileData.skills?"volunteer":"senior/senior"}/${profileData.email}`,
      data:data,
  })
  .then((response) => {
    alert(response.data.message)
  })
  .catch((err) => {
      alert(err.response.data.message)
  });

  };

  if(profileData.skills)
  {
    return (
      <>
      <Navbar />
      <div className="bg-[#FAEDCD] min-h-screen flex justify-center py-10">
        <form className="bg-[#FFF8EA] p-8 rounded-lg shadow-lg w-full max-w-3xl" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-[#8B4513] mb-6">Edit Profile</h2>
  
          <h3 className="text-xl font-semibold text-[#A0522D]">Personal Information</h3>
          <input name="name" value={profileData.name} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="Name" />
          <input name="email" value={profileData.email} disabled={true} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="Email" />
  
          <h3 className="text-xl font-semibold text-[#A0522D] mt-6">Address</h3>
          <input name="address" value={profileData.address} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="Street Address" />
          <input name="city" value={profileData.city} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="City" />
          <input name="state" value={profileData.state} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="State" />
          <input name="zipcode" value={profileData.zipcode} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="ZIP Code" />
  
          <h3 className="text-xl font-semibold text-[#A0522D] mt-6">Skills and Hobbies</h3>
          <textarea name="skills" value={profileData.skills} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="List your skills"></textarea>
          <textarea name="hobbies" value={profileData.hobbies} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="List your hobbies"></textarea>
  
          <h3 className="text-xl font-semibold text-[#A0522D] mt-6">Certification(Optional)</h3>
          <textarea name="certification" value={profileData.certification} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="mention list of any updated certification"></textarea>
  
          
          <h3 className="text-xl font-semibold text-[#A0522D] mt-6">Experience</h3>
          <textarea name="experience" value={profileData.experience} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="mention list of any updated certification"></textarea>
  
          <h3 className="text-xl font-semibold text-[#A0522D] mt-6">Update CV</h3>
          <input type="file" name="file" onChange={handleChange} className="border p-2 w-full mt-2" />
          {(profileData.filename)?profileData.filename:""} <p className="mt-2 text-sm text-[#8B4513]"></p>
  
          <button className="bg-[#8B4513] text-white px-4 py-2 rounded-lg mt-4 hover:bg-[#A0522D] flex items-center" type='submit'>
            <Edit className="mr-2" /> Save
          </button>
        </form>
      </div>
      <Footer />
      </>
    );
  }
  if(profileData.interests)
  {
    return (
      <>
      <Navbar />
      <div className="bg-[#FAEDCD] min-h-screen flex justify-center py-10">
        <form className="bg-[#FFF8EA] p-8 rounded-lg shadow-lg w-full max-w-3xl" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-[#8B4513] mb-6">Edit Profile</h2>
  
          <h3 className="text-xl font-semibold text-[#A0522D]">Personal Information</h3>
          <input name="name" value={profileData.name} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="Name" />
          <input name="email" value={profileData.email} disabled={true} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="Email" />
  
          <h3 className="text-xl font-semibold text-[#A0522D] mt-6">Address</h3>
          <input name="address" value={profileData.address} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="Street Address" />
          <input name="city" value={profileData.city} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="City" />
          <input name="state" value={profileData.state} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="State" />
          <input name="zipcode" value={profileData.zipcode} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="ZIP Code" />
  
          <h3 className="text-xl font-semibold text-[#A0522D] mt-6">Interests</h3>
          <textarea name="interests" value={profileData.interests} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="List your skills"></textarea>
      
          <h3 className="text-xl font-semibold text-[#A0522D] mt-6">Special Needs</h3>
          <textarea name="specialneeds" value={profileData.specialneeds} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="your special needs"></textarea>

          <h3 className="text-xl font-semibold text-[#A0522D] mt-6">Emergency Contact</h3>
          <input name="ename" value={profileData.ename} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="mention list of any updated certification"></input>
          <input name="ephone" value={profileData.ephone} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="mention list of any updated certification"></input>
          <input name="erelation" value={profileData.erelation} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="mention list of any updated certification"></input>
  
          <button className="bg-[#8B4513] text-white px-4 py-2 rounded-lg mt-4 hover:bg-[#A0522D] flex items-center" type='submit'>
            <Edit className="mr-2" /> Save
          </button>
        </form>
      </div>
      <Footer />
      </>
    );
  }

 return <div>Loading</div>
};

export default Profile;