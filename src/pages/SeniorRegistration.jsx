import React, { useState,useEffect } from 'react';
import Footer from '../components/Footer';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SeniorRegistration = () => {
  let [inputFormData, setInputForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    dob: '',
    emergencycontact: {
      name: '',
      phone: '',
      relationship: ''
    },
    specialneeds: [],
    interests: [],
    services: []
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

  const [user,setUser] = useState({name:"",email:"",dob:"",address:"",emergencycontact:"",interests:"",services:"",city:"",zipcode:"",state:""})


  const [interests,setInterests] = useState([])
  const [services,setServices] = useState([])


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

  const onInterestsChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setInterests(prevInterests => [...prevInterests, value])
    } else {
      setInterests(prevInterests => prevInterests.filter(interest => interest !== value))
    }
  };

  const onServicesChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setServices(prevInterests => [...prevInterests, value])
    } else {
      setServices(prevInterests => prevInterests.filter(interest => interest !== value))
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement registration logic
   let submissionData = {name:"",email:"",dob:"",address:"",emergencycontact:"",interests:"",services:"",city:"",zipcode:"",state:""}
    submissionData.name=inputFormData.firstname+" "+inputFormData.lastname;
    submissionData.email=inputFormData.email;
    submissionData.dob=inputFormData.dob;
    submissionData.address=inputFormData.address;
    submissionData.emergencycontact=emergencyContact;
    submissionData.interests=interests;
    submissionData.services=services;
    submissionData.city=inputFormData.city;
    submissionData.zipcode=inputFormData.zipcode;
    submissionData.state=inputFormData.state;
    console.log(submissionData)

    const API_URL = "http://localhost:5000";
      axios({
        method: "post",
        url: API_URL+"/register/senior",
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
      url: API_URL+"/otp-verify/senior",
      data:{email:user.email,otp:otp},
  })
  .then((response) => {
    alert(response.data.message)
    Cookies.set("user",JSON.stringify(user))
    navigate("/dashboard")
  })
  .catch((err) => {
    alert(err.response.data.message)
  });
  };


  const interestOptions = [
    'Reading',
    'Music',
    'Arts & Crafts',
    'Games',
    'Exercise',
    'Cooking',
    'Gardening',
    'Technology'
  ];

  const serviceOptions = [
    'Companionship',
    'Reading Assistance',
    'Walking Companion',
    'Technology Help',
    'Light Exercise',
    'Meal Companionship'
  ];

  return (
    <div className="min-h-screen bg-[#faedcd] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#fefae0] rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#8B4513]">Senior Registration</h2>
            <p className="mt-2 text-[#A0522D]">Start your 30-day free trial today</p>
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
              <h3 className="text-xl font-semibold text-[#8B4513]">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstname" className="block text-sm font-medium text-[#8B4513]">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name='firstname'
                    onChange={onInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-[#DEB887] shadow-sm focus:border-[#8B4513] focus:ring focus:ring-[#8B4513] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="lastname" className="block text-sm font-medium text-[#8B4513]">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name='lastname'
                    onChange={onInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-[#DEB887] shadow-sm focus:border-[#8B4513] focus:ring focus:ring-[#8B4513] focus:ring-opacity-50"
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
                    name='email'
                    onChange={onInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-[#DEB887] shadow-sm focus:border-[#8B4513] focus:ring focus:ring-[#8B4513] focus:ring-opacity-50"
                  />
                </div>
        
              </div>

              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-[#8B4513]">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name='dob'
                  onChange={onInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-[#DEB887] shadow-sm focus:border-[#8B4513] focus:ring focus:ring-[#8B4513] focus:ring-opacity-50"
                />
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
                  name='address'
                  onChange={onInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-[#DEB887] shadow-sm focus:border-[#8B4513] focus:ring focus:ring-[#8B4513] focus:ring-opacity-50"
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
                  name='city'
                  onChange={onInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-[#DEB887] shadow-sm focus:border-[#8B4513] focus:ring focus:ring-[#8B4513] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-[#8B4513]">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    onChange={onInputChange}
                  name='state'
                    required
                    className="mt-1 block w-full rounded-md border-[#DEB887] shadow-sm focus:border-[#8B4513] focus:ring focus:ring-[#8B4513] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="zipcode" className="block text-sm font-medium text-[#8B4513]">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipcode"
                    name='zipcode'
                    onChange={onInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-[#DEB887] shadow-sm focus:border-[#8B4513] focus:ring focus:ring-[#8B4513] focus:ring-opacity-50"
                  />
                </div>
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
                    onChange={onEmergencyChange}
                  name='name'
                    required
                    className="mt-1 block w-full rounded-md border-[#DEB887] shadow-sm focus:border-[#8B4513] focus:ring focus:ring-[#8B4513] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="emergencyPhone" className="block text-sm font-medium text-[#8B4513]">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="emergencyPhone"
                    onChange={onEmergencyChange}
                  name='phone'
                    required
                    className="mt-1 block w-full rounded-md border-[#DEB887] shadow-sm focus:border-[#8B4513] focus:ring focus:ring-[#8B4513] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="emergencyRelation" className="block text-sm font-medium text-[#8B4513]">
                    Relationship
                  </label>
                  <input
                    type="text"
                    id="emergencyRelation"
                    onChange={onEmergencyChange}
                  name='relation'
                    required
                    className="mt-1 block w-full rounded-md border-[#DEB887] shadow-sm focus:border-[#8B4513] focus:ring focus:ring-[#8B4513] focus:ring-opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Interests and Services */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#8B4513]">Interests and Services</h3>
              <div>
                <label className="block text-sm font-medium text-[#8B4513] mb-2">
                  Interests (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {interestOptions.map((interest) => (
                    <label key={interest} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name='interests'
                    onChange={onInterestsChange}
                        value={interest}
                        className="rounded text-[#8B4513] focus:ring-[#8B4513]"
                      />
                      <span className="text-sm text-[#A0522D]">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#8B4513] mb-2">
                  Services Needed (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {serviceOptions.map((service) => (
                    <label key={service} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name='services'
                        value={service}
                    onChange={onServicesChange}
                        className="rounded text-[#8B4513] focus:ring-[#8B4513]"
                      />
                      <span className="text-sm text-[#A0522D]">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="specialneeds" className="block text-sm font-medium text-[#8B4513]">
                  Medical Conditions or Special Needs (Optional)
                </label>
                <textarea
                  id="specialneeds"
                  name='specialneeds'
                  onChange={onInputChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-[#DEB887] shadow-sm focus:border-[#8B4513] focus:ring focus:ring-[#8B4513] focus:ring-opacity-50"
                  placeholder="Please list any medical conditions or special needs we should be aware of..."
                ></textarea>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#D4A373] text-[#58391B] py-3 px-6 rounded-md hover:bg-[#8B4513] transition-colors"
              >
                Start Free Trial
              </button>
              <p className="mt-2 text-sm text-center text-[#A0522D]">
                By registering, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </form>}
          
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default SeniorRegistration;