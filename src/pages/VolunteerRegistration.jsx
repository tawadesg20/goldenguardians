import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"
import Footer from '../components/Footer';
import axios from 'axios';

const VolunteerRegistration = () => {
 let [inputFormData, setInputForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    dob: '',
    experience:"",
    emergencycontact: {
      name: '',
      phone: '',
      relationship: ''
    },
    specialneeds: [],
    availability: [],
    skills: []
  });

  const navigate = useNavigate();

   useEffect(()=>{
        const userData = Cookies.get("user");
            if (userData) {
               // Parse the stringified object
               navigate("/dashboard")
            }
      })

  const [otp, setOtp] = useState("");

  const [emergencyContact,setEmergencyContact] =useState({
    name:"",
    phone:"",
    relation:""
  }) 

  const [OtpForm,setOtpForm] = useState(false)

  const [user,setUser] = useState({name:"",email:"",dob:"",address:"",emergencycontact:"",skills:"",availability:"",experience:"",city:"",zipcode:"",state:""})


  const [skills,setSkills] = useState([])
  const [availability,setAvailability] = useState([])


const onEmergencyChange = (event) => {
  const { name, value } = event.target;
  setEmergencyContact((prevUser) => {
    return {
      ...prevUser,
      [name]: value,
    };
  });
}

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setInputForm((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };

  const onSkillsChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSkills(prevInterests => [...prevInterests, value])
    } else {
      setSkills(prevInterests => prevInterests.filter(interest => interest !== value))
    }
  };

  const onAvailabilityChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setAvailability(prevInterests => [...prevInterests, value])
    } else {
      setAvailability(prevInterests => prevInterests.filter(interest => interest !== value))
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement registration logic
   let submissionData = {name:"",email:"",dob:"",address:"",emergencycontact:"",skills:"",experience:"",availability:"",city:"",zipcode:"",state:""}
    submissionData.name=inputFormData.firstname+" "+inputFormData.lastname;
    submissionData.email=inputFormData.email;
    submissionData.dob=inputFormData.dob;
    submissionData.address=inputFormData.address;
    submissionData.emergencycontact=emergencyContact;
    submissionData.skills=skills;
    submissionData.availability=availability;
    submissionData.experience=inputFormData.experience;
    submissionData.city=inputFormData.city;
    submissionData.zipcode=inputFormData.zipcode;
    submissionData.state=inputFormData.state;
    console.log(submissionData)

    const API_URL = "http://localhost:5000";
      axios({
        method: "post",
        url: API_URL+"/register/volunteer",
        data:submissionData,
    })
    .then((response) => {
      alert(response.data.message)
      setUser(submissionData)
      setOtpForm(true)
    })
    .catch((err) => {
      alert(err.response.data.message)
    });
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., API call)
    const API_URL = "http://localhost:5000";
    axios({
      method: "post",
      url: API_URL+"/otp-verify/volunteer",
      data:{email:user.email,otp:otp},
  })
  .then((response) => {
    alert(response.data.message)
    console.log("Not executed:",user)
    Cookies.set("user",JSON.stringify(user))
    navigate("/dashboard")
  }).catch((err) => {
    alert(err.response.data.message)
  });
  };

  const skillOptions = [
    'Reading',
    'Music',
    'Arts & Crafts',
    'Games',
    'Exercise',
    'Cooking',
    'Languages',
    'Technology'
  ];

  const timeSlots = [
    'Morning (9AM-12PM)',
    'Afternoon (12PM-4PM)',
    'Evening (4PM-8PM)'
  ];

  return (
    <div className="min-h-screen bg-[#f0f4f8] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#e3eaf2] rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#1c3a5b]">Volunteer Registration</h2>
            <p className="mt-2 text-[#2c547f]">Join our community of caring volunteers</p>
          </div>

          {(OtpForm)?<form onSubmit={handleOtpSubmit}>
      <div>
        <label>OTP:</label>
        <input
          type="text"
          name='otp'
          onChange={e=>setOtp(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>:<form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#1c3a5b]">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#1c3a5b]">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    onChange={onInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-[#c3d0e8] shadow-sm focus:border-[#1c3a5b] focus:ring focus:ring-[#1c3a5b] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#1c3a5b]">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    onChange={onInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-[#c3d0e8] shadow-sm focus:border-[#1c3a5b] focus:ring focus:ring-[#1c3a5b] focus:ring-opacity-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#1c3a5b]">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={onInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-[#c3d0e8] shadow-sm focus:border-[#1c3a5b] focus:ring focus:ring-[#1c3a5b] focus:ring-opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#1c3a5b]">Address</h3>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-[#1c3a5b]">
                  Street Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  onChange={onInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-[#c3d0e8] shadow-sm focus:border-[#1c3a5b] focus:ring focus:ring-[#1c3a5b] focus:ring-opacity-50"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2">
                  <label htmlFor="city" className="block text-sm font-medium text-[#1c3a5b]">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    onChange={onInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-[#c3d0e8] shadow-sm focus:border-[#1c3a5b] focus:ring focus:ring-[#1c3a5b] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-[#1c3a5b]">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    onChange={onInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-[#c3d0e8] shadow-sm focus:border-[#1c3a5b] focus:ring focus:ring-[#1c3a5b] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-[#1c3a5b]">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    onChange={onInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-[#c3d0e8] shadow-sm focus:border-[#1c3a5b] focus:ring focus:ring-[#1c3a5b] focus:ring-opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Skills and Availability */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#1c3a5b]">Skills and Availability</h3>
              <div>
                <label className="block text-sm font-medium text-[#1c3a5b] mb-2">
                  Skills (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {skillOptions.map((skill) => (
                    <label key={skill} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name='skills'
                        onChange={onSkillsChange}
                        className="rounded text-[#1c3a5b] focus:ring-[#1c3a5b]"
                      />
                      <span className="text-sm text-[#2c547f]">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1c3a5b] mb-2">
                  Availability
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <label key={slot} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name='availability'
                        onChange={onAvailabilityChange}
                        className="rounded text-[#1c3a5b] focus:ring-[#1c3a5b]"
                      />
                      <span className="text-sm text-[#2c547f]">{slot}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-[#1c3a5b]">
                  Relevant Experience
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  onChange={onInputChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-[#c3d0e8] shadow-sm focus:border-[#1c3a5b] focus:ring focus:ring-[#1c3a5b] focus:ring-opacity-50"
                  placeholder="Tell us about any relevant experience working with seniors..."
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#1c3a5b]">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="emergencyName" className="block text-sm font-medium text-[#1c3a5b]">
                    Name
                  </label>
                  <input
                    type="text"
                    id="emergencyName"
                    name="emergencyContact.name"
                    onChange={onEmergencyChange}
                    required
                    className="mt-1 block w-full rounded-md border-[#c3d0e8] shadow-sm focus:border-[#1c3a5b] focus:ring focus:ring-[#1c3a5b] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="emergencyPhone" className="block text-sm font-medium text-[#1c3a5b]">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="emergencyPhone"
                    name="emergencyContact.phone"
                    onChange={onEmergencyChange}
                    required
                    className="mt-1 block w-full rounded-md border-[#c3d0e8] shadow-sm focus:border-[#1c3a5b] focus:ring focus:ring-[#1c3a5b] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="emergencyRelation" className="block text-sm font-medium text-[#1c3a5b]">
                    Relationship
                  </label>
                  <input
                    type="text"
                    id="emergencyRelation"
                    name="emergencyContact.relationship"
                    onChange={onEmergencyChange}
                    required
                    className="mt-1 block w-full rounded-md border-[#c3d0e8] shadow-sm focus:border-[#1c3a5b] focus:ring focus:ring-[#1c3a5b] focus:ring-opacity-50"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#1c3a5b] text-white py-3 px-6 rounded-md hover:bg-[#2c547f] transition-colors"
              >
                Submit Application
              </button>
            </div>
          </form>}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default VolunteerRegistration;
