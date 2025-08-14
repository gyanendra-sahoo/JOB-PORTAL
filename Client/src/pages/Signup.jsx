import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  Briefcase,
  MapPin,
  FileText,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "./../redux/slices/authSlice.js";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useSelector((state) => state.theme);
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    userType: "candidate",
    firstNiche: "",
    secondNiche: "",
    thirdNiche: "",
    fourthNiche: "",
    coverLetter: "",
    agreeToTerms: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);


  useEffect(() => {
      if (isAuthenticated) {
        navigate("/"); 
      }
    }, [isAuthenticated, navigate]);


  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    else if (formData.fullName.trim().length < 2)
      newErrors.fullName = "Full name must be at least 2 characters";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.address.trim()) newErrors.address = "Address is required";

    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^\+?[\d\s\-()]+$/.test(formData.phone))
      newErrors.phone = "Phone number is invalid";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 5)
      newErrors.password = "Password must be at least 5 characters";
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password))
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (
      formData.userType === "candidate" &&
      (!formData.firstNiche ||
        !formData.secondNiche ||
        !formData.thirdNiche ||
        !formData.fourthNiche)
    ) {
      newErrors.niches = "All four job niches are required for candidates";
    }

    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = "You must agree to the terms and conditions";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    // Map frontend userType to backend role
    const role = formData.userType === "candidate" ? "candidate" : "recruiter";

    const payload = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      password: formData.password,
      role: role,
    };

    if (role === "candidate") {
      payload.firstNiche = formData.firstNiche;
      payload.secondNiche = formData.secondNiche;
      payload.thirdNiche = formData.thirdNiche;
      payload.fourthNiche = formData.fourthNiche;
      payload.coverLetter = formData.coverLetter;
    }

    const resultAction = await dispatch(registerUser(payload));

    if (registerUser.fulfilled.match(resultAction)) {
      setSuccessMessage("Registration successful! Redirecting to login...");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
        userType: "candidate",
        firstNiche: "",
        secondNiche: "",
        thirdNiche: "",
        fourthNiche: "",
        coverLetter: "",
        agreeToTerms: false,
      });
      setFormErrors({});
    }
  };

  const cardClasses = isDarkMode
    ? "bg-slate-800/90 border-slate-700/50 backdrop-blur-md"
    : "bg-white/90 border-slate-200/50 backdrop-blur-md";

  const inputClasses = (fieldName) => `
    ${
      isDarkMode
        ? "bg-slate-700/70 border-slate-600 text-white placeholder-slate-400"
        : "bg-slate-50/70 border-slate-300 text-slate-900 placeholder-slate-500"
    } 
    ${
      formErrors[fieldName]
        ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
        : isDarkMode
        ? "focus:border-emerald-400 focus:ring-emerald-400/50"
        : "focus:border-emerald-500 focus:ring-emerald-500/50"
    }
    w-full pl-12 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm
  `;

  const nicheInputClasses = (fieldName) => `
    ${
      isDarkMode
        ? "bg-slate-700/70 border-slate-600 text-white placeholder-slate-400"
        : "bg-slate-50/70 border-slate-300 text-slate-900 placeholder-slate-500"
    } 
    ${
      formErrors.niches
        ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
        : isDarkMode
        ? "focus:border-emerald-400 focus:ring-emerald-400/50"
        : "focus:border-emerald-500 focus:ring-emerald-500/50"
    }
    w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm
  `;

  const selectClasses = (fieldName) => `
    ${
      isDarkMode
        ? "bg-slate-700/70 border-slate-600 text-white"
        : "bg-slate-50/70 border-slate-300 text-slate-900"
    } 
    ${
      formErrors[fieldName]
        ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
        : isDarkMode
        ? "focus:border-emerald-400 focus:ring-emerald-400/50"
        : "focus:border-emerald-500 focus:ring-emerald-500/50"
    }
    w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm
  `;

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-24 transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-100 via-white to-slate-100"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
            isDarkMode ? "bg-emerald-500" : "bg-emerald-400"
          }`}
        ></div>
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
            isDarkMode ? "bg-teal-500" : "bg-teal-400"
          }`}
        ></div>
      </div>

      <div className="max-w-md w-full mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Briefcase className="h-12 w-12 text-emerald-500" />
              <div className="absolute inset-0 bg-emerald-500/20 blur-md"></div>
            </div>
          </div>
          <h2
            className={`text-3xl font-bold bg-gradient-to-r ${
              isDarkMode
                ? "from-white to-slate-300"
                : "from-slate-800 to-slate-600"
            } bg-clip-text text-transparent mb-2`}
          >
            Join CareerOrbit
          </h2>
          <p
            className={`text-sm ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Create your account and start your career journey
          </p>
        </div>

        <div className={`${cardClasses} rounded-2xl shadow-2xl border p-8`}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* User Type Field */}
            <div>
              <label
                htmlFor="userType"
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-slate-200" : "text-slate-700"
                }`}
              >
                I am a
              </label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
                className={selectClasses("userType")}
              >
                <option value="candidate">Candidate</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>
            {/* Full Name Field */}
            <div>
              <label
                htmlFor="fullName"
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-slate-200" : "text-slate-700"
                }`}
              >
                Full Name
              </label>
              <div className="relative">
                <User
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    formErrors.fullName
                      ? "text-red-400"
                      : isDarkMode
                      ? "text-emerald-400"
                      : "text-emerald-500"
                  }`}
                />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={inputClasses("fullName")}
                  placeholder="Enter your full name"
                />
              </div>
              {formErrors.fullName && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {formErrors.fullName}
                </p>
              )}
            </div>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-slate-200" : "text-slate-700"
                }`}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    formErrors.email
                      ? "text-red-400"
                      : isDarkMode
                      ? "text-emerald-400"
                      : "text-emerald-500"
                  }`}
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClasses("email")}
                  placeholder="Enter your email"
                />
              </div>
              {formErrors.email && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {formErrors.email}
                </p>
              )}
            </div>
            {/* Phone Field */}
            <div>
              <label
                htmlFor="phone"
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-slate-200" : "text-slate-700"
                }`}
              >
                Phone Number
              </label>
              <div className="relative">
                <Phone
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    formErrors.phone
                      ? "text-red-400"
                      : isDarkMode
                      ? "text-emerald-400"
                      : "text-emerald-500"
                  }`}
                />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={inputClasses("phone")}
                  placeholder="Enter your phone number"
                />
              </div>
              {formErrors.phone && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {formErrors.phone}
                </p>
              )}
            </div>
            {/* Address Field */}
            <div>
              <label
                htmlFor="address"
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-slate-200" : "text-slate-700"
                }`}
              >
                Address
              </label>
              <div className="relative">
                <MapPin
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    formErrors.address
                      ? "text-red-400"
                      : isDarkMode
                      ? "text-emerald-400"
                      : "text-emerald-500"
                  }`}
                />
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className={inputClasses("address")}
                  placeholder="Enter your address"
                />
              </div>
              {formErrors.address && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {formErrors.address}
                </p>
              )}
            </div>
            {/* Niche fields - Only for Candidates */}
            {formData.userType === "candidate" && (
              <>
                <div>
                  <label
                    htmlFor="niche1"
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    Job Niches (Please provide 4)
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      id="firstNiche"
                      name="firstNiche"
                      type="text"
                      required={formData.userType === "candidate"}
                      value={formData.firstNiche}
                      onChange={handleInputChange}
                      className={nicheInputClasses("niches")}
                      placeholder="Niche 1"
                    />
                    <input
                      id="secondNiche"
                      name="secondNiche"
                      type="text"
                      required={formData.userType === "candidate"}
                      value={formData.secondNiche}
                      onChange={handleInputChange}
                      className={nicheInputClasses("niches")}
                      placeholder="Niche 2"
                    />
                    <input
                      id="thirdNiche"
                      name="thirdNiche"
                      type="text"
                      required={formData.userType === "candidate"}
                      value={formData.thirdNiche}
                      onChange={handleInputChange}
                      className={nicheInputClasses("niches")}
                      placeholder="Niche 3"
                    />
                    <input
                      id="fourthNiche"
                      name="fourthNiche"
                      type="text"
                      required={formData.userType === "candidate"}
                      value={formData.fourthNiche}
                      onChange={handleInputChange}
                      className={nicheInputClasses("niches")}
                      placeholder="Niche 4"
                    />
                  </div>
                  {formErrors.niches && (
                    <p className="mt-2 text-sm text-red-500 flex items-center">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {formErrors.niches}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="coverLetter"
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    Cover Letter (optional)
                  </label>
                  <div className="relative">
                    <FileText
                      className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                        isDarkMode ? "text-emerald-400" : "text-emerald-500"
                      }`}
                    />
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      className={`${inputClasses("coverLetter")} h-24 pt-3`}
                      placeholder="Write a brief cover letter"
                    ></textarea>
                  </div>
                </div>
              </>
            )}
            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-slate-200" : "text-slate-700"
                }`}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    formErrors.password
                      ? "text-red-400"
                      : isDarkMode
                      ? "text-emerald-400"
                      : "text-emerald-500"
                  }`}
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`${inputClasses("password")} pr-12`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none transition-colors duration-200 ${
                    isDarkMode
                      ? "text-slate-400 hover:text-slate-300"
                      : "text-slate-500 hover:text-slate-600"
                  }`}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {formErrors.password && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {formErrors.password}
                </p>
              )}
              <p
                className={`mt-1 text-xs ${
                  isDarkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Must be 5+ characters with uppercase, lowercase, and number
              </p>
            </div>
            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-slate-200" : "text-slate-700"
                }`}
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    formErrors.confirmPassword
                      ? "text-red-400"
                      : isDarkMode
                      ? "text-emerald-400"
                      : "text-emerald-500"
                  }`}
                />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`${inputClasses("confirmPassword")} pr-12`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none transition-colors duration-200 ${
                    isDarkMode
                      ? "text-slate-400 hover:text-slate-300"
                      : "text-slate-500 hover:text-slate-600"
                  }`}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {formErrors.confirmPassword && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {formErrors.confirmPassword}
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
                    formErrors.agreeToTerms ? "border-red-500" : ""
                  }`}
                />
                <label
                  htmlFor="agreeToTerms"
                  className={`ml-3 block text-sm ${
                    isDarkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className={`transition-colors duration-200 ${
                      isDarkMode
                        ? "text-emerald-400 hover:text-emerald-300"
                        : "text-emerald-600 hover:text-emerald-500"
                    }`}
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className={`transition-colors duration-200 ${
                      isDarkMode
                        ? "text-emerald-400 hover:text-emerald-300"
                        : "text-emerald-600 hover:text-emerald-500"
                    }`}
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {formErrors.agreeToTerms && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {formErrors.agreeToTerms}
                </p>
              )}
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading || successMessage}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                ) : (
                  <>
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <User className="h-4 w-4 text-emerald-300 group-hover:text-emerald-200" />
                    </span>
                    Create Account
                  </>
                )}
              </button>
            </div>
            {/* Redux Error or Success Message */}
            {error && (
              <p className="text-center text-sm text-red-500 mt-4">{error}</p>
            )}
            {successMessage && (
              <p className="text-center text-sm text-emerald-500 mt-4">
                {successMessage}
              </p>
            )}
          </form>
          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div
                className={`w-full border-t ${
                  isDarkMode ? "border-slate-600" : "border-slate-300"
                }`}
              ></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className={`px-2 ${
                  isDarkMode
                    ? "bg-slate-800 text-slate-400"
                    : "bg-white text-slate-500"
                }`}
              >
                Or
              </span>
            </div>
          </div>
          {/* Switch to Login */}
          <div className="text-center">
            <span
              className={`text-sm ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Already have an account?
            </span>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className={`font-semibold transition-colors duration-200 ${
                isDarkMode
                  ? "text-emerald-400 hover:text-emerald-300"
                  : "text-emerald-600 hover:text-emerald-500"
              }`}
            >
              Sign in
            </button>
          </div>
        </div>
        {/* Terms & Privacy */}
        <div className="text-center mt-6">
          <p
            className={`text-xs ${
              isDarkMode ? "text-slate-500" : "text-slate-400"
            }`}
          >
            Join thousands of professionals finding their dream jobs
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
