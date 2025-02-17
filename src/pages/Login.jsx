import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Footer from "../components/Footer";

const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

const Login = () => {
  const [user, setUser] = useState({ email: "", loginotp: "" });
  const [userType, setUserType] = useState(null);
  const [clickedOtp, setClickedOtp] = useState(false);
  const [status, setStatus] = useState("nothing");
  const [validEmail, setValidEmail] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState(false);
  const [apiLink, setApiLink] = useState(`http://localhost:5000/login/senior`);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setValidEmail(isValidEmail(user.email));
    setEnteredOtp(user.loginotp.length > 1);
    setApiLink(userType === "senior" ? "http://localhost:5000/login/senior" : "http://localhost:5000/login/volunteer");
  };

  const handlSubmitEmail = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/login/${userType}`, user)
      .then((response) => {
        alert(response.data.message);
        setApiLink(userType === "senior" ? "http://localhost:5000/login/otp-verify/senior" : "http://localhost:5000/login/otp-verify/volunteer");
        setStatus("sent");
        setClickedOtp(true);
      })
      .catch((err) => {
        if(err.response.data.message=="volunteer does not exists with given email id")
          {
            alert("You are not registerd as Volunteer, Please do apply & register")
            navigate("/careers")
          }
          else if(err.response.data.message=="senior does not exists with given email id")
          {
            alert("You are not registerd as Senior, Please do registration first")
            navigate("/senior-registration") 
          }
          else
          alert(err.response.data.message)
      });
  };

  const handlSubmitOtp = (e) => {
    e.preventDefault();
    setStatus("verifying");
    axios.post(`http://localhost:5000/login/otp-verify/${userType}`, user)
      .then((response) => {
        alert(response.data.message);
        Cookies.set("user", JSON.stringify(response.data.user));
        navigate("/dashboard");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faedcd]">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="w-full bg-[#FFF8EA] shadow-md rounded-lg p-6 sm:p-8">
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl sm:text-3xl font-semibold text-[#58391B]">Welcome to Golden Guardians!</h1>
                <p className="text-xl mt-1 text-[#2E7502]">Log in with OTP</p>
              </div>
              <form className="space-y-6" onSubmit={status === "nothing" ? handlSubmitEmail : handlSubmitOtp}>
                <div className="space-y-2">
                  <label htmlFor="contact" className="text-lg">Email</label>
                  <input id="contact" type="email" placeholder="Enter your email" name="email" onChange={onInputChange} className="w-full text-lg p-6 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]" required disabled={clickedOtp} />
                </div>
                {!clickedOtp && (
                  <>
                    <div className="space-y-2">
                      <label className="text-lg">User Type</label>
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="userType" onChange={(e) => setUserType(e.target.value)} value="volunteer" />
                          <span>Volunteer</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="userType" onChange={(e) => setUserType(e.target.value)} value="senior" required />
                          <span>Senior Citizen</span>
                        </label>
                      </div>
                    </div>
                    <button type="submit" disabled={!validEmail || userType == null} className={`w-full max-w-md px-4 py-3 text-lg font-semibold text-white ${(!validEmail || userType == null) ? "bg-gray-400" : "bg-[#D4A373] hover:bg-[#8B4513]"} rounded-lg transition`}>{status === "nothing" ? "Request OTP" : "Requesting..."}</button>
                  </>
                )}
                {clickedOtp && (
                  <>
                    <div className="space-y-4">
                      <label className="text-lg">Enter Verification Code</label>
                      <input type="text" placeholder="Enter OTP" name="loginotp" onChange={onInputChange} className="w-full text-lg p-6 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]" maxLength={6} required />
                    </div>
                    <button type="submit" disabled={!enteredOtp} className={`w-full max-w-md px-4 py-3 text-lg font-semibold text-white ${!enteredOtp ? "bg-gray-400" : "bg-[#D4A373] hover:bg-[#8B4513]"} rounded-lg transition`}>{status === "verifying" ? "Verifying..." : "Verify OTP"}</button>
                  </>
                )}
              </form>
              <div className="text-center">
                <span className="text-gray-600">Don't have an account? </span>
                <button onClick={() => navigate("/register")} className="text-[#58391B] font-semibold text-lg">SIGN UP</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;