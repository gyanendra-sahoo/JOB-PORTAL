import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, Sun, Moon, Menu, X, User } from "lucide-react";
import { toggleTheme } from "../redux/slices/themeSlice.js";
import { logoutUser } from "../redux/slices/authSlice.js";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isDarkMode } = useSelector((state) => state.theme);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: "Companies", path: "/companies" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 z-50 w-full backdrop-blur-md shadow-lg border-b transition-colors duration-300 ease-in-out 
      ${
        isDarkMode
          ? "bg-slate-900/95 border-slate-700/50"
          : "bg-white/95 border-slate-200/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <img src="/images/logo.png" alt="" className="h-12" />
                <div className="absolute inset-0 bg-emerald-500/20 blur-md group-hover:bg-emerald-400/30 transition-colors duration-300"></div>
              </div>
              <span
                className={`text-2xl font-bold bg-gradient-to-r ${
                  isDarkMode
                    ? "from-white to-slate-300"
                    : "from-slate-800 to-slate-600"
                } bg-clip-text text-transparent`}
              >
                CareerOrbit
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-base font-medium group ${
                  isDarkMode
                    ? "text-slate-300 hover:text-white"
                    : "text-slate-700 hover:text-slate-900"
                } transition-colors duration-200`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300 ease-out"></span>
              </Link>
            ))}

            {/* Authenticated User Dropdown */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className={`flex items-center space-x-2 p-2 rounded-full border ${
                    isDarkMode
                      ? "border-slate-600 hover:bg-slate-800"
                      : "border-slate-300 hover:bg-slate-100"
                  } transition-colors duration-200`}
                >
                  <User className={isDarkMode ? "text-white" : "text-black"} />
                </button>
                {isUserMenuOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-40 rounded-lg shadow-lg border backdrop-blur-sm ${
                      isDarkMode
                        ? "bg-slate-900/95 border-slate-700"
                        : "bg-white/95 border-slate-200"
                    }`}
                  >
                    <Link
                      to="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className={`block px-4 py-2 rounded-t-lg ${
                        isDarkMode
                          ? "text-slate-300 hover:bg-slate-800"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2 rounded-b-lg ${
                        isDarkMode
                          ? "text-red-400 hover:bg-slate-800"
                          : "text-red-600 hover:bg-slate-100"
                      }`}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className={`text-base font-medium px-4 py-2 rounded-lg border transition-colors duration-200 ${
                    isDarkMode
                      ? "border-emerald-500 text-emerald-400 hover:bg-emerald-500/20"
                      : "border-emerald-600 text-emerald-600 hover:bg-emerald-600/10"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleThemeToggle}
              className={`p-2.5 rounded-xl transition-all duration-200 focus:outline-none lg:focus:ring-2 focus:ring-offset-2 group
                ${
                  isDarkMode
                    ? "bg-slate-800 hover:bg-slate-700 text-amber-400 focus:ring-amber-400/50 hover:shadow-lg hover:shadow-amber-400/20"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600 focus:ring-slate-400/50 hover:shadow-lg hover:shadow-slate-400/20"
                }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 transform group-hover:rotate-180 transition-transform duration-300" />
              ) : (
                <Moon className="h-5 w-5 transform group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className={`p-2.5 rounded-xl transition-all duration-200 focus:outline-none lg:focus:ring-2 focus:ring-offset-2
                  ${
                    isDarkMode
                      ? "bg-slate-800 hover:bg-slate-700 text-white focus:ring-emerald-400/50"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-900 focus:ring-slate-400/50"
                  }`}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 transform rotate-90 transition-transform duration-200" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-fade-in-down">
            <div
              className={`px-2 pt-2 pb-4 space-y-1 border-t backdrop-blur-sm ${
                isDarkMode
                  ? "bg-slate-900/90 border-slate-700/50"
                  : "bg-white/90 border-slate-200/50"
              }`}
            >
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={toggleMobileMenu}
                  className={`block px-4 py-3 rounded-lg text-base font-medium group transition-all duration-200 ${
                    isDarkMode
                      ? "text-slate-300 hover:text-white hover:bg-slate-800/70"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/70"
                  } animate-slide-in-left`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <span className="flex items-center space-x-3">
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                        isDarkMode
                          ? "bg-slate-600 group-hover:bg-emerald-400"
                          : "bg-slate-400 group-hover:bg-emerald-500"
                      }`}
                    ></span>
                    <span>{link.name}</span>
                  </span>
                </Link>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="mt-4 flex flex-col space-y-3 px-4">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={toggleMobileMenu}
                      className={`block text-center px-4 py-3 rounded-lg ${
                        isDarkMode
                          ? "text-slate-300 hover:bg-slate-800"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block text-center bg-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={toggleMobileMenu}
                      className={`block text-center text-base font-medium px-4 py-3 rounded-lg border transition-colors duration-200 ${
                        isDarkMode
                          ? "border-emerald-500 text-emerald-400 hover:bg-emerald-500/20"
                          : "border-emerald-600 text-emerald-600 hover:bg-emerald-600/10"
                      }`}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={toggleMobileMenu}
                      className="block text-center bg-emerald-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200"
                    >
                      Signup
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
