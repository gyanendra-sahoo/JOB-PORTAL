// components/Signup.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { User, Mail, Lock, Phone, Eye, EyeOff, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const { isDarkMode } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'jobseeker',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (formData.phone && !/^\+?[\d\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Handle signup logic here
    console.log('Signup form submitted:', formData);
    
    // Reset form after successful submission
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      userType: 'jobseeker',
      agreeToTerms: false
    });
    setErrors({});
  };

  const cardClasses = isDarkMode 
    ? 'bg-slate-800/90 border-slate-700/50 backdrop-blur-md' 
    : 'bg-white/90 border-slate-200/50 backdrop-blur-md';

  const inputClasses = (fieldName) => `
    ${isDarkMode 
      ? 'bg-slate-700/70 border-slate-600 text-white placeholder-slate-400' 
      : 'bg-slate-50/70 border-slate-300 text-slate-900 placeholder-slate-500'
    } 
    ${errors[fieldName] 
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' 
      : isDarkMode 
        ? 'focus:border-emerald-400 focus:ring-emerald-400/50'
        : 'focus:border-emerald-500 focus:ring-emerald-500/50'
    }
    w-full pl-12 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm
  `;

  const selectClasses = (fieldName) => `
    ${isDarkMode 
      ? 'bg-slate-700/70 border-slate-600 text-white' 
      : 'bg-slate-50/70 border-slate-300 text-slate-900'
    } 
    ${errors[fieldName] 
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' 
      : isDarkMode 
        ? 'focus:border-emerald-400 focus:ring-emerald-400/50'
        : 'focus:border-emerald-500 focus:ring-emerald-500/50'
    }
    w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm
  `;

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-24 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-100 via-white to-slate-100'
    }`}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
          isDarkMode ? 'bg-emerald-500' : 'bg-emerald-400'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
          isDarkMode ? 'bg-teal-500' : 'bg-teal-400'
        }`}></div>
      </div>

      <div className="max-w-md w-full mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Briefcase className="h-12 w-12 text-emerald-500" />
              <div className="absolute inset-0 bg-emerald-500/20 blur-md"></div>
            </div>
          </div>
          <h2 className={`text-3xl font-bold bg-gradient-to-r ${
            isDarkMode 
              ? 'from-white to-slate-300' 
              : 'from-slate-800 to-slate-600'
          } bg-clip-text text-transparent mb-2`}>
            Join JobPortal
          </h2>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Create your account and start your career journey
          </p>
        </div>
        
        <div className={`${cardClasses} rounded-2xl shadow-2xl border p-8`}>
          <div className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label 
                htmlFor="fullName" 
                className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}
              >
                Full Name
              </label>
              <div className="relative">
                <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  errors.fullName 
                    ? 'text-red-400' 
                    : isDarkMode 
                      ? 'text-emerald-400' 
                      : 'text-emerald-500'
                }`} />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={inputClasses('fullName')}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.fullName && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  errors.email 
                    ? 'text-red-400' 
                    : isDarkMode 
                      ? 'text-emerald-400' 
                      : 'text-emerald-500'
                }`} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClasses('email')}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label 
                htmlFor="phone" 
                className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}
              >
                Phone Number
                <span className={`text-xs ml-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  (optional)
                </span>
              </label>
              <div className="relative">
                <Phone className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  errors.phone 
                    ? 'text-red-400' 
                    : isDarkMode 
                      ? 'text-emerald-400' 
                      : 'text-emerald-500'
                }`} />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={inputClasses('phone')}
                  placeholder="Enter your phone number"
                />
              </div>
              {errors.phone && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {errors.phone}
                </p>
              )}
            </div>

            {/* User Type Field */}
            <div>
              <label 
                htmlFor="userType" 
                className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}
              >
                I am a
              </label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
                className={selectClasses('userType')}
              >
                <option value="jobseeker">Job Seeker</option>
                <option value="employer">Employer</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}
              >
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  errors.password 
                    ? 'text-red-400' 
                    : isDarkMode 
                      ? 'text-emerald-400' 
                      : 'text-emerald-500'
                }`} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`${inputClasses('password')} pr-12`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none transition-colors duration-200 ${
                    isDarkMode ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-600'
                  }`}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {errors.password}
                </p>
              )}
              <p className={`mt-1 text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Must be 8+ characters with uppercase, lowercase, and number
              </p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label 
                htmlFor="confirmPassword" 
                className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  errors.confirmPassword 
                    ? 'text-red-400' 
                    : isDarkMode 
                      ? 'text-emerald-400' 
                      : 'text-emerald-500'
                }`} />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`${inputClasses('confirmPassword')} pr-12`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none transition-colors duration-200 ${
                    isDarkMode ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-600'
                  }`}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms Agreement */}
            <div>
              <div className="flex items-start">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className={`h-4 w-4 mt-1 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded transition-colors duration-200 ${
                    errors.agreeToTerms ? 'border-red-500' : ''
                  }`}
                />
                <label 
                  htmlFor="agreeToTerms" 
                  className={`ml-3 block text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}
                >
                  I agree to the{' '}
                  <Link 
                    to="/terms" 
                    className={`transition-colors duration-200 ${
                      isDarkMode 
                        ? 'text-emerald-400 hover:text-emerald-300' 
                        : 'text-emerald-600 hover:text-emerald-500'
                    }`}
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link 
                    to="/privacy" 
                    className={`transition-colors duration-200 ${
                      isDarkMode 
                        ? 'text-emerald-400 hover:text-emerald-300' 
                        : 'text-emerald-600 hover:text-emerald-500'
                    }`}
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {errors.agreeToTerms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="button"
                onClick={handleSubmit}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <User className="h-4 w-4 text-emerald-300 group-hover:text-emerald-200" />
                </span>
                Create Account
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${isDarkMode ? 'border-slate-600' : 'border-slate-300'}`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-white text-slate-500'}`}>
                  Or
                </span>
              </div>
            </div>

            {/* Switch to Login */}
            <div className="text-center">
              <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Already have an account?{' '}
              </span>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className={`font-semibold transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-emerald-400 hover:text-emerald-300' 
                    : 'text-emerald-600 hover:text-emerald-500'
                }`}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
        
        {/* Terms & Privacy */}
        <div className="text-center mt-6">
          <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            Join thousands of professionals finding their dream jobs
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;