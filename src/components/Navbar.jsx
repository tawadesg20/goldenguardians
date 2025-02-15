import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, Bell, ChevronDown } from 'lucide-react';
import { useUser } from './UserContext';
import Logo from './Logo';
import Cookies from "js-cookie";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState({message:"Searching"});
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {

   

        const  checkUser = () =>{
            const userData = Cookies.get("user");
          if (userData) {
            setUser({message:"Found",data:JSON.parse(userData)}); // Parse the stringified object
          }
          else
    {
      setUser({message:"Not Found"})
      
    }
          }

          if(location.pathname === "/dashboard")
            checkUser()
        
            checkUser()    


    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [location.pathname]);

  // Close mobile menu and profile dropdown on route change
  useEffect(() => {
    setIsOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);


  const handleSignOut = () => {
    Cookies.remove("user")
    setUser({message:"Searching"});
    navigate('/login');
  };

  const navLinks = (user.message=="Found" && user.data.skills)?[
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/events', label: 'Events' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/careers', label: 'Careers' },
  ]:[
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/events', label: 'Events' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <nav className="bg-[#FEFAE0] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#8B4513] hover:text-[#58391B] transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map(({ path, label }) => (
              <NavLink key={path} to={path} isActive={isActivePath(path)}>
                {label}
              </NavLink>
            ))}
            
            {user.data ? (
              <div className="flex items-center space-x-4 ml-4">
                {/* Notifications */}
                <div className="relative">
                  <button
                    className="p-2 hover:bg-[#faedcd] rounded-full transition-colors relative"
                    aria-label="Notifications"
                  >
                    <Bell className="h-5 w-5 text-[#8B4513]" />
                    {notifications.length > 0 && (
                      <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                        {notifications.length}
                      </span>
                    )}
                  </button>
                </div>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-2 hover:bg-[#faedcd] rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-[#8B4513] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {(user.data)?user.data.email[0].toUpperCase():"U"}
                      </span>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-[#8B4513] transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-semibold text-[#8B4513]">{(user.data)?user.data.email:""}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-[#8B4513] hover:bg-[#faedcd] transition-colors"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-[#8B4513] hover:bg-[#faedcd] transition-colors"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : user.message=="Not Found"?(
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="bg-[#faedcd] text-[#8B4513] px-4 py-2 rounded-md hover:bg-[#8B4513] hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-[#8B4513] text-white px-4 py-2 rounded-md hover:bg-[#58391B] transition-colors"
                >
                  Register
                </Link>
              </div>
            ):null}
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map(({ path, label }) => (
                <MobileNavLink
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  isActive={isActivePath(path)}
                >
                  {label}
                </MobileNavLink>
              ))}
              
              {user.data ? (
                <div className="pt-4 space-y-2 border-t border-[#D4A373]">
                  <div className="flex items-center px-3 py-2">
                    <div className="w-8 h-8 bg-[#8B4513] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                      {(user.data)?user.data.email[0].toUpperCase():"U"}
                      </span>
                    </div>
                    <span className="ml-2 text-[#8B4513]">{(user.data)?user.data.email:""}</span>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-3 py-2 text-[#8B4513] hover:bg-[#faedcd] rounded-md transition-colors"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-3 py-2 text-[#8B4513] hover:bg-[#faedcd] rounded-md transition-colors"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              ) :(user.message=="Not Found")?(
                <div className="pt-4 space-y-2 border-t border-[#D4A373]">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center bg-[#faedcd] text-[#8B4513] px-4 py-2 rounded-md hover:bg-[#8B4513] hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center bg-[#8B4513] text-white px-4 py-2 rounded-md hover:bg-[#58391B] transition-colors"
                  >
                    Register
                  </Link>
                </div>
              ):null}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ to, children, isActive }) => (
  <Link
    to={to}
    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-[#8B4513] text-white'
        : 'text-[#8B4513] hover:bg-[#faedcd]'
    }`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, onClick, children, isActive }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-[#8B4513] text-white'
        : 'text-[#8B4513] hover:bg-[#faedcd]'
    }`}
  >
    {children}
  </Link>
);

export default Navbar;