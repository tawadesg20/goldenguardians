import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"

const isValidEmail = email => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

const Login = () => {
  const [user, setUser] = useState({email:"",loginotp:""});
  const [userType, setUserType] = useState(null);
  const [clickedOtp,setClickedOtp] = useState(false);
  const [status,setStatus] = useState("nothing");
  const [validEmail,setValidEmail] = useState(false);
  const [enteredOtp,setEnteredOtp] = useState(false)
  const [apiLink,setApiLink] = useState(`http://localhost:5000/login/senior`)
  const navigate = useNavigate();

  useEffect(()=>{
    const userData = Cookies.get("user");
        if (userData) {
           // Parse the stringified object
           navigate("/dashboard")
        }
  })


const onInputChange = (event)=>{
  const {name,value} = event.target;
  setUser((prevUser) => {
    return {
      ...prevUser,
      [name]: value,
    };
  });
  setValidEmail(isValidEmail(user.email))
    setEnteredOtp(user.loginotp.length>1)
  if(userType=="senior")
    setApiLink("http://localhost:5000/login/senior")
  else if(userType=="volunteer")
    setApiLink("http://localhost:5000/login/volunteer")
}

const handlSubmitEmail = (e) => {
  e.preventDefault();
    const API_URL=apiLink;
    axios({
      method: "post",
      url: `http://localhost:5000/login/${userType}`,
      data:user,
  })
  .then((response) => {
    alert(response.data.message)
    if(userType=="senior")
      setApiLink("http://localhost:5000/login/otp-verify/senior")
    else if(userType=="volunteer")
      setApiLink("http://localhost:5000/login/otp-verify/volunteer")
    setStatus("sent")
    setClickedOtp(true)    // Cookies.set("user",JSON.stringify(user))
    // navigate("/dashboard")
  })
  .catch((err) => {
    alert(err.response.data.message)
  });
};

const handlSubmitOtp = (e) => {
  e.preventDefault()
      setStatus("verifying")
      const API_URL=apiLink;
      axios({
        method: "post",
        url: `http://localhost:5000/login/otp-verify/${userType}`,
        data:user,
    })
    .then((response) => {
      alert(response.data.message)
      Cookies.set("user",JSON.stringify(response.data.user))
      navigate("/dashboard")
    })
    .catch((err) => {
      alert(err.response.data.message)
    });
};


  return (
    
    <div className="min-h-screen bg-[#faedcd] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="w-full bg-white shadow-md rounded-lg p-6 sm:p-8">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#58391B]">Welcome to Golden Guardians!</h1>
              <p className="text-xl mt-1 text-[#2E7502]">Log in with OTP</p>
            </div>

            <form className="space-y-6" onSubmit={status=="nothing"?handlSubmitEmail:handlSubmitOtp}>
              <div className="space-y-2">
                <label htmlFor="contact" className="text-lg">
                  Email
                </label>
                <input
                  id="contact"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  onChange={onInputChange}
                  className="w-full text-lg p-6 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                  required
                  disabled={clickedOtp}
                />
              </div>
                  {(!clickedOtp && <><div className="space-y-2">
                    <label className="text-lg">User Type</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="userType"
                          onChange={(e) => setUserType(e.target.value)}
                          value="volunteer"
                        />
                        <span>Volunteer</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="userType"
                          onChange={(e) => setUserType(e.target.value)}
                          value="senior"
                          required
                        />
                        <span>Senior Citizen</span>
                      </label>
                    </div>
                  </div><button
                  type="submit"
                  // onClick={requestOtp}
                  disabled={!validEmail || userType==null}
                  className={`w-full max-w-md px-4 py-3 text-lg font-semibold text-white ${(!validEmail || userType==null)?"bg-gray-400":"bg-[#D4A373] hover:bg-[#8B4513]"} rounded-lg transition`}
                >
                {(status=="nothing")?"Request OTP":"Requesting..."}
                </button></>
                  
                )
                  }
                  
                  {(clickedOtp && <><div className="space-y-4">
                  <label className="text-lg">Enter Verification Code</label>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    name="loginotp"
                    onChange={onInputChange}
                    className="w-full text-lg p-6 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                    maxLength={6}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={!enteredOtp}
                  className={`w-full max-w-md px-4 py-3 text-lg font-semibold text-white ${(!enteredOtp)?"bg-gray-400":"bg-[#D4A373] hover:bg-[#8B4513]"} rounded-lg transition`}
                >
                  
                  {status=="verifying" ? "Verifying...":"Verify OTP"}
                </button></>)}
            </form>

{/* 
{isOtpSent && (
                <div className="space-y-4">
                  <label className="text-lg">Enter Verification Code</label>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full text-lg p-6 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                    maxLength={6}
                    required
                  />
                </div>
              )}

              {!isOtpSent ? (
                <button
                  type="button"
                  onClick={requestOtp}
                  disabled={loading}
                  className={`w-full max-w-md px-4 py-3 text-lg font-semibold text-white ${
                    loading ? "bg-gray-400" : "bg-[#D4A373] hover:bg-[#8B4513]"
                  } rounded-lg transition`}
                >
                  {loading ? "Sending..." : "Request OTP"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={verifyOtp}
                  disabled={loading}
                  className={`w-full max-w-md px-4 py-3 text-lg font-semibold text-white ${
                    loading ? "bg-gray-400" : "bg-[#32CD32] hover:bg-[#2EB82E]"
                  } rounded-lg transition`}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              )}

              {isOtpSent && (
                <button
                  type="button"
                  onClick={() => setIsOtpSent(false)}
                  className="w-full text-[#58391B] text-lg p-6"
                  disabled={loading}
                >
                  Use different contact
                </button>
              )} */}

          

            {/* <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or Login With
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="h-12 text-base sm:text-lg border rounded-lg" disabled={loading}>
                  Google
                </button>
                <button className="h-12 text-base sm:text-lg border rounded-lg" disabled={loading}>
                  Microsoft
                </button>
              </div>
            </div> */}

            <div className="text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <button
                onClick={() => navigate("/register")}
                className="text-[#58391B] font-semibold text-lg"
                // disabled={loading}
              >
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;