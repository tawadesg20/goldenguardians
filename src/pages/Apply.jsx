import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
const Apply = () => {
    const [user, setUser] = useState({message:"Searching"});
      
        useEffect(() => {
          const userData = Cookies.get("user");
          if (userData && JSON.parse(userData).skills)
          {
            setUser({message:"Found",data:JSON.parse(userData)}) // Parse the stringified object
          }
            else if(userData)
            setUser({message:"Found but not Volunteer",data:JSON.parse(userData)}) // Parse the stringified object
         else
          setUser({message:"Not Found"})
      }, []);
        if (user.message!="Searching" && user.message=="Not Found") {
          // If user is not authenticated, redirect to login
          return <Navigate to="/login" replace />;
        }
 


  const [formData, setFormData] = useState({
    institution: "",
    internshipPermission: "Allowed",
    currentWork: "",
    reasonsForInternship: "",
    longTermGoals: "",
    resonatedPart: "",
    companionshipMeaning: "",
    excitementAboutFriendships: "",
    annoyancesWithOlderPeople: "",
    department: "Marketing",
    standoutInDepartment: "",
    employmentDuration: "6 months",
    stipendExpectations: "",
    languages: [],
    joinTime: "Immediately",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  // If user is authenticated, render the child component
   if(user.message!="Searching" && user.message=="Found but not Volunteer")
        return <Navigate to="/dashboard" replace />;
    else

  return (
    <div className="min-h-screen bg-[#faedcd] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#58391B] text-center mb-6">Volunteer Application Form</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="institution" className="text-lg">Name of your Institution (if a student). If not put N/A.</label>
            <input
              id="institution"
              name="institution"
              type="text"
              value={formData.institution}
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
                  checked={formData.internshipPermission === "Allowed"}
                  onChange={handleChange}
                />
                <span>Allowed</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="internshipPermission"
                  value="Permission needed"
                  checked={formData.internshipPermission === "Permission needed"}
                  onChange={handleChange}
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
              value={formData.currentWork}
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
              value={formData.reasonsForInternship}
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
              value={formData.longTermGoals}
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
              value={formData.resonatedPart}
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
              value={formData.companionshipMeaning}
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
              value={formData.excitementAboutFriendships}
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
              value={formData.annoyancesWithOlderPeople}
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
              value={formData.department}
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
              value={formData.standoutInDepartment}
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
              value={formData.employmentDuration}
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
              value={formData.stipendExpectations}
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
                    checked={formData.languages.includes(language)}
                    onChange={(e) => {
                      const { checked, value } = e.target;
                      setFormData((prevState) => ({
                        ...prevState,
                        languages: checked
                          ? [...prevState.languages, value]
                          : prevState.languages.filter((lang) => lang !== value),
                      }));
                    }}
                  />
                  <span>{language}</span>
                </label>
              ))}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="languages"
                  value="Other"
                  checked={formData.languages.includes("Other")}
                  onChange={(e) => {
                    const { checked, value } = e.target;
                    setFormData((prevState) => ({
                      ...prevState,
                      languages: checked
                        ? [...prevState.languages, value]
                        : prevState.languages.filter((lang) => lang !== value),
                    }));
                  }}
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
              value={formData.joinTime}
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
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
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
    </div>
  );
};

export default Apply;