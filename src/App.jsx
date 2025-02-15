// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { UserProvider } from "./components/UserContext.jsx";
// import { PaymentProvider } from "./components/payment/PaymentContext.jsx";
// import Navbar from "./components/Navbar.jsx";

// import Home from "./pages/Home.jsx";
// import About from "./pages/About.jsx";
// import Services from "./pages/Services.jsx";
// import Contact from "./pages/Contact.jsx";
// import Login from "./pages/Login.jsx";
// import Register from "./pages/Register.jsx";
// import VolunteerRegistration from "./pages/VolunteerRegistration.jsx";
// import SeniorRegistration from "./pages/SeniorRegistration.jsx";
// import Dashboard from "./pages/Dashboard.jsx";
// import Events from "./pages/Events.jsx";
// import Payment from "./pages/Payment.jsx";
// import Apply from "./pages/Apply.jsx";
// import Careers from "./pages/Careers.jsx";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";

// import Axios from "axios";

// const App = () => {
//   const[data,setData]=useState();
// };

// function App() {
//   return React.createElement(
//     PaymentProvider,
//     null,
//     React.createElement(
//       UserProvider,
//       null,
//       React.createElement(
//         Router,
//         null,
//         React.createElement(
//           "div",
//           { className: "min-h-screen bg-[#faedcd]" },
//           React.createElement(Navbar, null),
//           React.createElement(
//             Routes,
//             null,
//             React.createElement(Route, { path: "/", element: React.createElement(Home, null) }),
//             React.createElement(Route, { path: "/about", element: React.createElement(About, null) }),
//             React.createElement(Route, { path: "/services", element: React.createElement(Services, null) }),
//             React.createElement(Route, { path: "/contact", element: React.createElement(Contact, null) }),
//             React.createElement(Route, { path: "/login", element: React.createElement(Login, null) }),
//             React.createElement(Route, { path: "/register", element: React.createElement(Register, null) }),
//             React.createElement(Route, {
//               path: "/volunteer-registration",
//               element: React.createElement(VolunteerRegistration, null),
//             }),
//             React.createElement(Route, {
//               path: "/senior-registration",
//               element: React.createElement(SeniorRegistration, null),
//             }),
//             React.createElement(Route, { path: "/apply", element: React.createElement(Apply, null) }),
//             React.createElement(Route, { path: "/careers", element: React.createElement(Careers, null) }),
//             React.createElement(Route, {
//               path: "/dashboard",
//               element: React.createElement(
//                 ProtectedRoute,
//                 null,
//                 React.createElement(Dashboard, null)
//               ),
//             }),
//             React.createElement(Route, { path: "/events", element: React.createElement(Events, null) }),
//             React.createElement(Route, {
//               path: "/payment",
//               element: React.createElement(
//                 ProtectedRoute,
//                 null,
//                 React.createElement(Payment, null)
//               ),
//             })
//           )
//         )
//       )
//     )
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/UserContext.jsx";
import { PaymentProvider } from "./components/payment/PaymentContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Axios from "axios";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import VolunteerRegistration from "./pages/VolunteerRegistration.jsx";
import SeniorRegistration from "./pages/SeniorRegistration.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Events from "./pages/Events.jsx";
import Payment from "./pages/Payment.jsx";
import Apply from "./pages/Apply.jsx";
import Careers from "./pages/Careers.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => {
  const [data, setData] = useState("");

  const getData = async () => {
    const response = await Axios.get("https://localhost:5000/getData");
    setData(response.data);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <PaymentProvider>
      <UserProvider>
        <Router>
          <div className="min-h-screen bg-[#faedcd]">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/volunteer-registration" element={<VolunteerRegistration />} />
              <Route path="/senior-registration" element={<SeniorRegistration />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/events" element={<Events />} />
              <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </PaymentProvider>
  );
};

export default App;
