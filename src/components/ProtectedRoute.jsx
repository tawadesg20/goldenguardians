import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState({ message: "Searching", type: null, data: null });
  const navigate = useNavigate()
  useEffect(() => {
    let userr = Cookies.get("user");
    const adminKey = Cookies.get("adminkey");

    if (adminKey) {
      setUser({ message: "Found", type: "admin" });
    } else if (userr) {
      userr = JSON.parse(userr);
      if (userr.skills) {
        setUser({ message: "Found", type: "volunteer", data: userr });
      } else {
        setUser({ message: "Found", type: "senior", data: userr });
      }
    } else {
      setUser({ message: "Not Found" });
    }
  }, []);

  // Redirects should be handled inside JSX using `<Navigate />`
  if (user.message == "Found") {
    if (user.type == "admin") {
      return <Navigate to="/admin" replace />;
    }
    if (user.type == "volunteer" || user.type == "senior") {
      return children;
    }
  }
  
  if (user.message == "Not Found") {
    return <Navigate to="/login" replace />;
  }
  if (user.message == "Searching") {
    return <div>Loading...</div>; // or a proper loading spinner
  }
  
};

export default ProtectedRoute;
