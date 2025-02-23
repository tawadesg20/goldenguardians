import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
const ApplicationProfile = () => {
    const [volunteer,setVolunteer] = useState({})
    const navigate = useNavigate()
    const query = new URLSearchParams(useLocation().search);
    const email = query.get("email");

    useEffect(()=>{
         const adminkey = Cookies.get("adminkey");
       
         const API_URL = "https://golden-guardians-backend.onrender.com";
      axios({
        method: "post",
        url: API_URL+`/${adminkey}/application`,
        data:{type:"volunteer",email:email},
    })
    .then((response) => {
      setVolunteer(response.data.application)
    
    })
    .catch((err) => {
          alert(err.response.data.message)
    });
        },[]);
        
        const goBack = () =>{
            navigate("/admin")
        }

        return <>{(volunteer.resume)?
        <div>Name:{volunteer.data.fullName}, Email:{volunteer.data.email}, Contact {volunteer.data.contact}</div>:
        <div>No profile</div>}
        <button onClick={goBack}>Go back</button>
        </>;
}

export default ApplicationProfile;