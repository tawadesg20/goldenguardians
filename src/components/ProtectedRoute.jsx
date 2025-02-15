import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";


const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState({message:"Searching"});

  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      setUser({message:"Found",data:JSON.parse(userData)}); // Parse the stringified object
    }
    else
    setUser({message:"Not Found"})

  }, []);
  if (user.message!="Searching" && user.message=="Not Found") {
    // If user is not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated, render the child component
  if(user.message!="Searching" && user.message=="Found")
  return children;
  else
  return <div>Loading</div>
};

export default ProtectedRoute;
