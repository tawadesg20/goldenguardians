import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";
const Apply = () => {
    const [user, setUser] = useState({message:"Searching"});
      const navigate = useNavigate();

        useEffect(() => {
          const userData = Cookies.get("user");
          if (userData)
          {
            setUser({message:"Found",data:JSON.parse(userData)}) // Parse the stringified object
          }
         // Parse the stringified object
         else
          setUser({message:"Not Found"})
      }, []);
        // if (user.message!="Searching" && user.message=="Not Found") {
        //   // If user is not authenticated, redirect to login
        //   return <Navigate to="/login" replace />;
        // }
 


  const [formData, setFormData] = useState({
    fullName: "",
    email:"",
    contact: "",
    motivation: "",
    companionshipMeaning: "",
    excitement: "",
    handlingLoneliness: "",
    experience: "",
    availability: "",
    file: null,
  });

  const [languages, setLanguages] = useState([]);

  const onLanguagesChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setLanguages(prevLanguages => [...prevLanguages, value])
    } else {
      setLanguages(prevLanguages => prevLanguages.filter(language => language !== value))
    }
  };

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    setFormData({ ...formData, [name]: type === "file" ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", formData.email);
    data.append("fullName", formData.fullName);
    data.append("contact", formData.contact);
    data.append("motivation", formData.motivation);
    data.append("companionshipMeaning", formData.companionshipMeaning);
    data.append("excitement", formData.excitement);
    data.append("handlingLoneliness", formData.handlingLoneliness);
    data.append("experience", formData.experience);
    data.append("availability", formData.availability);
    data.append("languages", languages);
    data.append("file",formData.file);

<<<<<<< HEAD
    const API_URL = "http://localhost:5000";
=======
    const API_URL = "https://golden-guardians-backend.onrender.com";
>>>>>>> ff2fc50649ef227f970b4243ad08df294a5489f5
    console.log(...data.entries())
    axios({
      method: "POST",
      url: API_URL+"/volunteer/volunteer/application",
      data:data,
  })
  .then((response) => {
    alert(response.data.message)
    navigate("/volunteer-registration")
  })
  .catch((err) => {
    if(err.response.data.message=="Volunteer Application Form Submitted Successfully")
    {
      alert("You have application submitteed, admin will review application & will give authentication to register")
      alert("You can check by registering")
      navigate("/volunteer-registration")
    }
    else if(err.response.data.message=="application arleady submitted")
    {
      alert("You can submit application once")
      navigate("/volunteer-registration")
    }
    else if(err.response.data.message=="application arleady accepted")
      {
        alert("Application arleady accepted, you can register now")
        navigate("/volunteer-registration")
      }
    else
      alert(err.response.data.message)
  });

  };

  // If user is authenticated, render the child component
      if(user.message!="Searching" && user.message=="Found")
        return <Navigate to="/dashboard" replace />;
    else

    return <><Navbar /><div className="container mx-auto p-8 bg-[#FFF8EA] border-[#E2C799] rounded-lg shadow-md max-w-2xl">
    <h2 className="text-3xl font-bold mb-6 text-[#8B4513] text-center">Job Application</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
    <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E2C799]" required />
    <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E2C799]" required />
      <input type="text" name="contact" placeholder="Contact Information" onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E2C799]" required />
      <textarea name="motivation" placeholder="Why do you want to volunteer with us?" onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E2C799]" required></textarea>
      <textarea name="companionshipMeaning" placeholder="What does companionship mean to you?" onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E2C799]" required></textarea>
      <textarea name="excitement" placeholder="What excites you about building friendships with senior citizens?"  onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E2C799]" required></textarea>
      <textarea name="handlingLoneliness" placeholder="How would you handle a situation where a senior citizen is feeling lonely or upset?" onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E2C799]" required></textarea>
      <textarea name="experience" placeholder="Any previous experience in caregiving or community service?" onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E2C799]"></textarea>
      <fieldset className="border p-4 rounded-lg">
        <legend className="font-semibold text-lg mb-2">Languages you can speak fluently:</legend>
        <div className="grid grid-cols-2 gap-2">
          {["English", "Hindi", "Marathi", "Gujarati", "Bengali", "Tamil"].map((lang) => (
            <label key={lang} className="flex items-center">
              <input type="checkbox" name="languages"  value={lang} onChange={onLanguagesChange} className="mr-2" />
              {lang}
            </label>
          ))}
        </div>
      </fieldset>
      <input type="text" name="availability" placeholder="Preferred availability & commitment duration" onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E2C799]" required />
      <label className="block font-semibold text-lg">Resume</label>
      <input type="file" name="file" onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E2C799]" />
      <button type="submit" className="bg-[#8B4513] hover:bg-[#A0522D] text-white p-3 rounded-lg w-full font-semibold transition duration-200">Submit</button>
    </form>
  </div>
</>
  return (
    <><Navbar /><div className="min-h-screen bg-[#faedcd] flex items-center justify-center p-4">
    <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#58391B] text-center mb-6">Volunteer Application Form</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="institution" className="text-lg">Name of your Institution (if a student). If not put N/A.</label>
          <input
            id="institution"
            name="institution"
            type="text"
            onChange={handleChange}
            className="w-full text-lg p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Does your institution allow you to do an internship, or will you need special permission?</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="internshipPermission"
                value="Allowed"
                onChange={(e) => setInternshipPermission(e.target.value)}
                required
              />
              <span>Allowed</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="internshipPermission"
                value="Permission needed"
                onChange={(e) => setInternshipPermission(e.target.value)}
                required
              />
              <span>Permission needed</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="currentWork" className="text-lg">Are you currently working somewhere? If yes, mention where and what work are you doing? If not put N/A.</label>
          <input
            id="currentWork"
            name="currentWork"
            type="text"
            onChange={handleChange}
            className="w-full text-lg p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="reasonsForInternship" className="text-lg">What are your reasons for wanting to intern with The Goodfellows program if you are currently working?</label>
          <textarea
            id="reasonsForInternship"
            name="reasonsForInternship"
            onChange={handleChange}
            className="w-full text-lg p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="longTermGoals" className="text-lg">How does a Goodfellows internship fit into your long-term goals?</label>
          <textarea
            id="longTermGoals"
            name="longTermGoals"
            onChange={handleChange}
            className="w-full text-lg p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="resonatedPart" className="text-lg">What part of this venture resonated with you the most?</label>
          <textarea
            id="resonatedPart"
            name="resonatedPart"
            onChange={handleChange}
            className="w-full text-lg p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="companionshipMeaning" className="text-lg">What does companionship mean to you?</label>
          <textarea
            id="companionshipMeaning"
            name="companionshipMeaning"
            onChange={handleChange}
            className="w-full text-lg p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="excitementAboutFriendships" className="text-lg">What excites you about building friendships with senior citizens?</label>
          <textarea
            id="excitementAboutFriendships"
            name="excitementAboutFriendships"
            onChange={handleChange}
            className="w-full text-lg p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="annoyancesWithOlderPeople" className="text-lg">What are some things that annoy you about older people?</label>
          <textarea
            id="annoyancesWithOlderPeople"
            name="annoyancesWithOlderPeople"
            onChange={handleChange}
            className="w-full text-lg p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="department" className="text-lg">Department you would like to be associated with?</label>
          <select
            id="department"
            name="department"
            onChange={handleChange}
            className="w-full text-lg p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
            required
          >
            <option value="Marketing">Marketing</option>
            <option value="Finance and accounts">Finance and accounts</option>
            <option value="Psychology">Psychology</option>
            <option value="Operations">Operations</option>
            <option value="HR and training">HR and training</option>
            <option value="Events">Events</option>
            <option value="Legal">Legal</option>
            <option value="Business Development">Business Development</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="standoutInDepartment" className="text-lg">What will make you stand out in your Department?</label>
          <textarea
            id="standoutInDepartment"
            name="standoutInDepartment"
            onChange={handleChange}
            className="w-full text-lg p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="employmentDuration" className="text-lg">Preferred duration of employment</label>
          <select
            id="employmentDuration"
            name="employmentDuration"
            onChange={handleChange}
            className="w-full text-lg p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
            required
          >
            <option value="6 months">6 months</option>
            <option value="9 months">9 months</option>
            <option value="1 year">1 year</option>
            <option value="Full time position">Full time position</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="stipendExpectations" className="text-lg">Monthly stipend expectations (numeric values)</label>
          <input
            id="stipendExpectations"
            name="stipendExpectations"
            type="number"
            onChange={handleChange}
            className="w-full text-lg p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">How many languages can you speak fluently?</label>
          <div className="flex flex-wrap gap-4">
            {["English", "Hindi", "Marathi", "Gujarati", "Bengali", "Tamil", "Telugu", "Malyalam"].map((language) => (
              <label key={language} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="languages"
                  value={language}
                  onChange={onLanguagesChange}
                />
                <span>{language}</span>
              </label>
            ))}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="languages"
                value="Other"
                onChange={onLanguagesChange}
              />
              <span>Other</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="joinTime" className="text-lg">By when can you join?</label>
          <select
            id="joinTime"
            name="joinTime"
            onChange={handleChange}
            className="w-full text-lg p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
            required
          >
            <option value="Immediately">Immediately</option>
            <option value="In 1-2 months">In 1-2 months</option>
            <option value="In 3-4 months">In 3-4 months</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="resume" className="text-lg">Resume</label>
          <input
            id="resume"
            name="file"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="w-full text-lg p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full text-lg font-semibold text-white bg-[#D4A373] hover:bg-[#8B4513] rounded-lg transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  </div></>
    
  );
};

export default Apply;