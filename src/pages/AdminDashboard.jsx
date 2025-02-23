import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function AdminDashboard() {
  const [admin,setAdmin] = useState({password:""});
  const [adminkeyCorrect,setAdminCorrect] = useState(false);
  const [pendingVolunteers, setPendingVolunteers] = useState([]);
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [rejectedApplicatoins, setRejectedApplications] = useState([]);
  const [volunteerRequested,setVolunteerRequested] = useState([]);
  const [volunteerAssigned,setVolunteerAssigned] = useState([]);
  const [adminKey,setAdminKey] = useState(null)
  const [task,setTask] = useState("")
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const navigate = useNavigate()


  useEffect(()=>{
    const user = Cookies.get("user");
    if(user)
      navigate("/dashboard")
    setAdminKey( Cookies.get("adminkey"))
    if(adminKey){
      setInterval(()=>{
        axios.get(`https://golden-guardians-backend.onrender.com/${adminKey}/volunteers`).then((response) => {
          let volunteers = response.data.volunteers;
          volunteers = volunteers.filter(volunteer=>volunteer.senior?(volunteer.senior.email && volunteer.senior.status=="Requested"):false)
          setVolunteerRequested(volunteers)
          let volunteersA = response.data.volunteers.filter(volunteer=>volunteer.senior?(volunteer.senior.email && volunteer.senior.status=="Assigned"):false)
          
          setVolunteerAssigned(volunteersA)

        })
        .catch((err) => {
          alert(err.response.data.message)
        });
      },1000)
    }
  },[adminKey])


  const signOut = () => {
    Cookies.remove("adminkey");
    navigate("/")
  }

  const handleApprove = (id) => {
    const adminkey = Cookies.get("adminkey");
    const API_URL = `https://golden-guardians-backend.onrender.com/${adminkey}/approve-application`;
    axios({
      method: "PUT",
      url: API_URL,
      data:{type:"volunteer",email:id},
  })
  .then((response) => {
    alert(response.data.message)
  })
  .catch((err) => {
    alert(err.response.data.message)
  });

    alert("Volunteer approved!");
  };

  const handleReject = (id) => {
    const adminkey = Cookies.get("adminkey");
    const API_URL = `https://golden-guardians-backend.onrender.com/${adminkey}/reject-application`;
    axios({
      method: "PUT",
      url: API_URL,
      data:{type:"volunteer",email:id},
  })
  .then((response) => {
    alert(response.data.message)
  })
  .catch((err) => {
    alert(err.response.data.message)
  });
    alert("Volunteer rejected!");
  };
  const viewProfile = (id) => {
    const adminkey = Cookies.get("adminkey");
    const API_URL = `https://golden-guardians-backend.onrender.com/${adminkey}/application`;
    navigate(`/admin/profile?email=${id}`)
  };

  useEffect(() => {
    const checkAdmin = () => {
      const adminkey = Cookies.get("adminkey");
    setAdminCorrect(adminkey ? true : false);
    }
    if(adminkeyCorrect)
    {
      const adminkey = Cookies.get("adminkey");
      setInterval(()=>{
        const API_URL = `https://golden-guardians-backend.onrender.com/${adminkey}/applications`;
      axios.get(API_URL)
    .then((response) => {
      let applications = response.data.applications
      let aacceptedApplications = applications.filter(application=>application.applicationStatus=="Accepted")
      let ppendingApplications = applications.filter(application=>application.applicationStatus=="Submitted")
      let rrejectedApplications = applications.filter(application=>application.applicationStatus=="Rejected")
      setAcceptedApplications(aacceptedApplications)
      setPendingVolunteers(ppendingApplications)
      setRejectedApplications(rrejectedApplications)
    })
    .catch((err) => {
      alert(err.response.data.message)
    });
      },1000)
    }
    checkAdmin()
  }, [adminkeyCorrect]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAdmin((prev)=> {
      return {
        [name]: value,
      };
    });
  };

  const goBack = () => { 
    navigate("/")
  }


  const handleSubmitAdmin = (e) => {
    e.preventDefault();
    const API_URL = "https://golden-guardians-backend.onrender.com";
      axios({
        method: "post",
        url: API_URL+"/admin",
        data:admin,
    })
    .then((response) => {
      alert(response.data.message)
      Cookies.set("adminkey",admin.adminkey)
      setAdminCorrect(true);
    })
    .catch((err) => {
      alert(err.response.data.message)
    });
  }

  const onTaskChange = (event) => {
    const {value,name} = event.target;
    setTask(value)
    console.log(value)
  }

  const onTaskSubmit = (vemail,semail,city) => {
    console.log(vemail,semail,city,task,date,startTime,endTime)
    const API_URL = "https://golden-guardians-backend.onrender.com";
    axios({
      method: "post",
      url: API_URL+`/${adminKey}/volunteer/assignTask`,
      data:{vemail:vemail,semail:semail,city:city,task:task,date:date,startTime:startTime,endTime:endTime},
  })
  .then((response) => {
    alert(response.data.message)
  
  })
  .catch((err) => {
    alert(err.response.data.message)
  });
  }

  if (!adminkeyCorrect)
    return (
      <div className="flex justify-center items-center h-screen bg-[#fefae0] text-[#5C3D2E]">
        <form
          className="bg-[#FAEDCD]  shadow-lg rounded-lg p-8 w-96"
          onSubmit={handleSubmitAdmin}
        >
          <h2 className="text-xl font-semibold text-[#8B4513] text-center mb-4">
            Admin Access
          </h2>
          <input
            type="password"
            placeholder="Enter Admin Key"
            name="adminkey"
            id="adminkey"
            onChange={handleChange}
            required
            className="w-full p-3 border border-[#8B5E34] rounded-md focus:outline-none focus:ring-[#8B4513] focus:ring-opacity-50"
          />
          <div className="mt-6 flex justify-between">
            <button
              type="submit"
              className="w-1/2 bg-[#8B4513]  text-white p-3 rounded-md hover:bg-[#6D3B00]  transition"
            >
              Submit
            </button>
            <button
              onClick={goBack}
              type="button"
              className="w-1/3 bg-[#8B4513]  text-white p-3 rounded-md hover:bg-[#6D3B00]  transition"
            >
              Go Back
            </button>
          </div>
        </form>
      </div>
    );
  
  if(adminkeyCorrect)
  return (
    <div className="min-h-screen bg-[#faedcd] p-6">
      <button onClick={signOut}>signOut</button>
      {/* Top Bar */}
      <div className="flex justify-between items-center bg-[#8B4513] text-white p-4 rounded-lg">
        <h1 className="text-xl font-bold">Golden Guardians Admin Dashboard</h1>
        <div className="flex space-x-4">
          <div className="h-5 w-5 cursor-pointer" ></div>
          <div className="h-5 w-5 cursor-pointer" ></div>
          <div className="h-5 w-5 cursor-pointer" ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Volunteer Applications */}
        <div className="bg-white shadow-lg rounded-xl p-4">
          <div>
            <div className="text-[#8B4513]">Pending Volunteer Applications</div>
          </div>
          <div>
           
               {(pendingVolunteers.length>0)? pendingVolunteers.map((application,index)=>(
                <div className="flex justify-between items-center bg-[#faedcd] p-3 rounded-lg mb-2" key={index}>
                <div>
                  <p className="font-bold text-[#8B4513]">Name:{application.application.data.fullName}</p>
                  <p className="text-sm">Skills: {(application.skills.length>0)?application.skills.join(","):"Not mentioned"}</p>
                </div>
                <div className="flex space-x-2">
                <button onClick={() => viewProfile(application.email)} className="bg-green-500 text-white px-3 py-2 rounded-lg flex items-center">
                   View Profile
                  </button>
                  <button onClick={() => handleApprove(application.email)} className="bg-green-500 text-white px-3 py-2 rounded-lg flex items-center">
                   Approve
                  </button>
                  <button onClick={() => handleReject(application.email)} className="bg-red-500 text-white px-3 py-2 rounded-lg flex items-center">
                     Reject
                  </button>
                </div>
              </div>
               )):<p className="text-center text-[#8B4513]">No pending applications.</p>}
          </div>
        </div>
         {/* VolunteerAccepted Applications */}
         <div className="bg-white shadow-lg rounded-xl p-4">
          <div>
            <div className="text-[#8B4513]">Accepted Volunteer Applications</div>
          </div>
          <div>
           
               {(acceptedApplications.length>0)? acceptedApplications.map((application,index)=>(
                <div className="flex justify-between items-center bg-[#faedcd] p-3 rounded-lg mb-2" key={index}>
                <div>
                  <p className="font-bold text-[#8B4513]">Name:{application.application.data.fullName}</p>
                  <p className="text-sm">Skills: {(application.skills.length>0)?application.skills.join(","):"Not mentioned"}</p>
                </div>
              
              </div>
               )):<p className="text-center text-[#8B4513]">No Accepted applications.</p>}
          </div>
        </div>
{/* Volunteer Rejected Applications */}
<div className="bg-white shadow-lg rounded-xl p-4">
          <div>
            <div className="text-[#8B4513]">Rejected Volunteer Applications</div>
          </div>
          <div>
           
               {(rejectedApplicatoins.length>0)? rejectedApplicatoins.map((application,index)=>(
                <div className="flex justify-between items-center bg-[#faedcd] p-3 rounded-lg mb-2" key={index}>
                <div>
                  <p className="font-bold text-[#8B4513]">Name:{application.application.data.fullName}</p>
                  <p className="text-sm">Skills: {(application.skills.length>0)?application.skills.join(","):"Not mentioned"}</p>
                </div>
              
              </div>
               )):<p className="text-center text-[#8B4513]">No Rejected applications.</p>}
          </div>
        </div>
{/* Volunteer Requested Senior */}
<div className="bg-white shadow-lg rounded-xl p-4">
          <div>
            <div className="text-[#8B4513]">Volunteer Requested Seniors</div>
          </div>
          <div>
           
               {(volunteerRequested.length>0)? volunteerRequested.map((volunteer,index)=>(
                <div className="flex justify-between items-center bg-[#faedcd] p-3 rounded-lg mb-2" key={index}>
                <div>
                  <p className="font-bold text-[#8B4513]">Volunteer Name: {volunteer.application.data.fullName}</p>
                  <p className="font-bold text-[#8B4513]">Volunteer Email: {volunteer.email}</p>
                  <p className="text-sm">Skills: {(volunteer.skills.length>0)?volunteer.skills.join(","):"Not mentioned"}</p>
                  <p className="font-bold text-[#8B4513]">Senior Email: {volunteer.senior.email}</p>
                  <form action="">
                    <input type="text" placeholder="Enter Task" onChange={onTaskChange} /><br />
                    <input type="date" name="date" onChange={(e) => setDate(e.target.value)} required />
                    <label className="block">
        Select Start Time:
        <input
          type="time"
          onChange={(e) => setStartTime(e.target.value)}
          className="border p-2 rounded"
        />
      </label>
      <label className="block">
        Select End:
        <input
          type="time"
          onChange={(e) => setEndTime(e.target.value)}
          className="border p-2 rounded"
        />
      </label>
                  </form>
                  <button onClick={()=>{onTaskSubmit(volunteer.email,volunteer.senior.email,volunteer.city)}} className="bg-red-200 px-10 py-2 rounded-full">Assign Task</button>
                </div>
                
              </div>
               )):<p className="text-center text-[#8B4513]">No Requested applications.</p>}
          </div>
        </div>
        {/* Task Assignments & Location */}
        <div className="bg-white shadow-lg rounded-xl p-4">
          <div>
            <div className="text-[#8B4513]">Assigned Tasks & Locations</div>
          </div>
          <div>
            {volunteerAssigned.length > 0 ? (
              volunteerAssigned.map((volunteer, index) => (
                <div key={index} className="bg-[#faedcd] p-3 rounded-lg mb-2">
                  <p className="font-bold text-[#8B4513]">Volunteer Email: {volunteer.email}</p>
                  <p className="text-sm">Task: {volunteer.senior.task}</p>
                  <div className="text-sm flex items-center"><p className="h-4 w-4 mr-1" ></p> Location: {volunteer.city}</div>
                </div>
              ))
            ) : (
              <p className="text-center text-[#8B4513]">No tasks assigned.</p>
            )}
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="bg-white shadow-lg rounded-xl p-4">
          <div>
            <div className="text-[#8B4513]">Admin Analytics</div>
          </div>
          <div>
            <div className="flex justify-between">
              <p className="text-lg font-bold text-[#8B4513]">Total Volunteers: {pendingVolunteers.length+acceptedApplications.length+rejectedApplicatoins.length}</p>
              <p className="text-lg font-bold text-[#8B4513]">Pending Approvals: {pendingVolunteers.length}</p>
            </div>
            <div className="flex justify-between mt-3">
              <p className="text-lg font-bold text-[#8B4513]">Accepted Applications: {acceptedApplications.length}</p>
              <p className="text-lg font-bold text-[#8B4513]">Rejected Applications: {rejectedApplicatoins.length}</p>
            </div>
            <div className="flex justify-between mt-3">
            <p className="text-lg font-bold text-[#8B4513]">Requested Volunteers: {volunteerRequested.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
