import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import axios from 'axios';

const VolunteerRegistration = () => {
 let [inputFormData, setInputForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
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
    emergencyContactName:"",
    emergencyContactPhone:"",
    emergencyContactRelation:""
  }) 

  const [OtpForm,setOtpForm] = useState(false)

  const [user,setUser] = useState({name:"",email:"",dob:"",address:"",emergencycontact:"",skills:[],availability:[],experience:"",city:"",zipcode:"",state:""})


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

    setSkills((prevSkills) =>
      checked ? [...prevSkills, value] : prevSkills.filter((skill) => skill !== value)
    );
  };

  const onAvailabilityChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setAvailability(prevAvailability => [...prevAvailability, value])
    } else {
      setAvailability(prevAvailability => prevAvailability.filter(availability => availability !== value))
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement registration logic
   let submissionData = {name:"",email:"",phone:"",dob:"",address:"",emergencycontact:"",skills:[],experience:"",availability:[],city:"",zipcode:"",state:""}
    submissionData.name=inputFormData.firstname+" "+inputFormData.lastname;
    submissionData.email=inputFormData.email;
    submissionData.phone=inputFormData.phone;
    submissionData.dob=inputFormData.dob;
    submissionData.address=inputFormData.address;
    submissionData.emergencycontact=emergencyContact;
    submissionData.skills=skills;
    submissionData.availability=availability;
    submissionData.experience=inputFormData.experience;
    submissionData.city=inputFormData.city;
    submissionData.zipcode=inputFormData.zipcode;
    submissionData.state=inputFormData.state;

    const API_URL = "https://golden-guardians-backend.onrender.com";
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
      if(err.response.data.message=="email not exists")
        {
          alert("Please complete application form to register")
          navigate("/apply")
        }
        else if(err.response.data.message=="email id already exists")
          {
            alert("Email already registered, you can login")
            navigate("/login")
          }
          else
          alert(err.response.data.message)
    });
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., API call)
    const API_URL = "https://golden-guardians-backend.onrender.com";
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
    <>
    <Navbar />
    <div className="flex flex-col min-h-screen bg-[#faedcd]">
      {/* Main Content */}
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-[#FFF8EA] rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#8B4513]">Volunteer Registration</h2>
            <p className="mt-2 text-[#8B4513]">Join our community of caring volunteers</p>
          </div>

          {(OtpForm)?<form onSubmit={handleOtpSubmit}>
          <div className="flex flex-col items-center space-y-4">
            <label className="text-lg font-medium text-[#6D3B00]">OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
              placeholder="Enter OTP"
              className="w-2/3 p-2 border border-[#8B5E34] rounded-lg text-center outline-none focus:ring-2 focus:ring-[#6D3B00]"
            />
            <button
              type="submit"
              className="bg-[#6D3B00] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#523000] transition duration-200"
            >
              Register
            </button>
          </div>
    </form>:<form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#8B4513]">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#8B4513]">
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
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#8B4513]">
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
                  <label htmlFor="email" className="block text-sm font-medium text-[#8B4513]">
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
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#8B4513]">
                    phone
                  </label>
                  <input
                    type="phone"
                    id="phone"
                    name="phone"
                    onChange={onInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-[#c3d0e8] shadow-sm focus:border-[#1c3a5b] focus:ring focus:ring-[#1c3a5b] focus:ring-opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#8B4513]">Address</h3>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-[#8B4513]">
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
                  <label htmlFor="city" className="block text-sm font-medium text-[#8B4513]">
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
                  <label htmlFor="state" className="block text-sm font-medium text-[#8B4513]">
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
                  <label htmlFor="zipCode" className="block text-sm font-medium text-[#8B4513]">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    onChange={onInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-[#c3d0e8] shadow-sm focus:border-[#1c3a5b] focus:ring focus:ring-[#1c3a5b] focus:ring-opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Skills and Availability */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#8B4513]">Skills and Availability</h3>
              <div>
                <label className="block text-sm font-medium text-[#8B4513] mb-2">
                  Skills (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {skillOptions.map((skill) => (
                    <label key={skill} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="skills"
                        value={skill}
                        onChange={onSkillsChange}
                        className="rounded text-[#1c3a5b] focus:ring-[#1c3a5b]"
                      />
                      <span className="text-sm text-[#8B4513]">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#8B4513] mb-2">
                  Availability
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <label key={slot} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="availability"
                        value={slot}
                        onChange={onAvailabilityChange}
                        className="rounded text-[#8B4513] focus:ring-[#1c3a5b]"
                      />
                      <span className="text-sm text-[#8B4513]">{slot}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-[#8B4513]">
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
              <h3 className="text-xl font-semibold text-[#8B4513]">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="emergencyName" className="block text-sm font-medium text-[#8B4513]">
                    Name
                  </label>
                  <input
                    type="text"
                    id="emergencyName"
                    name="emergencyContactName"
                    onChange={onEmergencyChange}
                    required
                    className="mt-1 block w-full rounded-md border-[#c3d0e8] shadow-sm focus:border-[#1c3a5b] focus:ring focus:ring-[#1c3a5b] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="emergencyPhone" className="block text-sm font-medium text-[#8B4513]">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="emergencyPhone"
                    name="emergencyContactPhone"
                    onChange={onEmergencyChange}
                    required
                    className="mt-1 block w-full rounded-md border-[#c3d0e8] shadow-sm focus:border-[#1c3a5b] focus:ring focus:ring-[#1c3a5b] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="emergencyRelation" className="block text-sm font-medium text-[#8B4513]">
                    Relationship
                  </label>
                  <input
                    type="text"
                    id="emergencyRelation"
                    name="emergencyContactRelation"
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
                className="w-full bg-[#D4A373] text-[#58391B] py-3 px-6 rounded-md hover:bg-[#8B4513] transition-colors"
              >
                Submit Application
              </button>
            </div>
          </form>}
        </div>
      </div>
      <Footer/>
    </div>
    </>
  );
};

export default VolunteerRegistration;