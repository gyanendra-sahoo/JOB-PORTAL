import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "./../redux/slices/authSlice.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useSelector((state) => state.theme);
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    }); // Clear form-specific error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    dispatch(loginUser({ email: formData.email, password: formData.password }));
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

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-24 transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-100 via-white to-slate-100"
      }`}
    >
            {/* Background decoration */}     {" "}
      <div className="absolute inset-0 overflow-hidden">
               {" "}
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
            isDarkMode ? "bg-emerald-500" : "bg-emerald-400"
          }`}
        ></div>
               {" "}
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
            isDarkMode ? "bg-teal-500" : "bg-teal-400"
          }`}
        ></div>
             {" "}
      </div>
           {" "}
      <div className="max-w-md w-full mx-auto relative z-10">
               {" "}
        <div className="text-center">
          {" "}
          <div className="flex justify-center ">
            {" "}
            <div className="relative">
              <img src="/images/logo.png" alt="logo" className="h-12" />{" "}
              <div className="absolute inset-0 bg-emerald-500/20 blur-md"></div>
                         {" "}
            </div>
                     {" "}
          </div>
                   {" "}
          <h2
            className={`text-3xl font-bold bg-gradient-to-r ${
              isDarkMode
                ? "from-white to-slate-300"
                : "from-slate-800 to-slate-600"
            } bg-clip-text text-transparent mb-2 text-center`}
          >
                        Welcome Back          
          </h2>
                   {" "}
          <p
            className={`text-sm ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
                        Sign in to your account to continue your journey        
             {" "}
          </p>
                 {" "}
        </div>
                       {" "}
        <div className={`${cardClasses} rounded-2xl shadow-2xl border p-8`}>
                   {" "}
          <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email Field */}           {" "}
            <div>
                           {" "}
              <label
                htmlFor="email"
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-slate-200" : "text-slate-700"
                }`}
              >
                                Email Address              {" "}
              </label>
                           {" "}
              <div className="relative">
                               {" "}
                <Mail
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    formErrors.email
                      ? "text-red-400"
                      : isDarkMode
                      ? "text-emerald-400"
                      : "text-emerald-500"
                  }`}
                />
                               {" "}
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
                             {" "}
              </div>
                           {" "}
              {formErrors.email && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                                   {" "}
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                    {formErrors.email}               {" "}
                </p>
              )}{" "}
            </div>
            {/* Password Field */}{" "}
            <div>
              {" "}
              <label
                htmlFor="password"
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-slate-200" : "text-slate-700"
                }`}
              >
                                Password              {" "}
              </label>
                           {" "}
              <div className="relative">
                               {" "}
                <Lock
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    formErrors.password
                      ? "text-red-400"
                      : isDarkMode
                      ? "text-emerald-400"
                      : "text-emerald-500"
                  }`}
                />
                               {" "}
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`${inputClasses("password")} pr-12`}
                  placeholder="Enter your password"
                />
                               {" "}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none transition-colors duration-200 ${
                    isDarkMode
                      ? "text-slate-400 hover:text-slate-300"
                      : "text-slate-500 hover:text-slate-600"
                  }`}
                >
                                   {" "}
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                                 {" "}
                </button>
                             {" "}
              </div>
                           {" "}
              {formErrors.password && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                                   {" "}
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                    {formErrors.password}               {" "}
                </p>
              )}
                         {" "}
            </div>
                                    {/* Remember Me & Forgot Password */}       
               {" "}
            <div className="flex items-center justify-between">
                           {" "}
              <div className="flex items-center">
                               {" "}
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  checked={formData.remember}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded transition-colors duration-200"
                />
                               {" "}
                <label
                  htmlFor="remember"
                  className={`ml-2 block text-sm ${
                    isDarkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                                    Remember me{" "}
                </label>
                             {" "}
              </div>
                           {" "}
              <div className="text-sm">
                               {" "}
                <Link
                  to="/forgot-password"
                  className={`font-medium transition-colors duration-200 ${
                    isDarkMode
                      ? "text-emerald-400 hover:text-emerald-300"
                      : "text-emerald-600 hover:text-emerald-500"
                  }`}
                >
                                    Forgot password?                {" "}
                </Link>
                             {" "}
              </div>
                         {" "}
            </div>
                                    {/* Submit Button */}           {" "}
            <div>
                           {" "}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:pointer-events-none"
              >
                               {" "}
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                ) : (
                  <>
                                       {" "}
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                           {" "}
                      <Lock className="h-4 w-4 text-emerald-300 group-hover:text-emerald-200" />
                                         {" "}
                    </span>
                                        Sign In                  {" "}
                  </>
                )}
                             {" "}
              </button>
                         {" "}
            </div>
                        {/* Redux Error Message */}           {" "}
            {error && (
              <p className="text-center text-sm text-red-500 mt-4">{error}</p>
            )}
                     {" "}
          </form>
                              {/* Divider */}         {" "}
          <div className="relative my-6">
                       {" "}
            <div className="absolute inset-0 flex items-center">
                           {" "}
              <div
                className={`w-full border-t ${
                  isDarkMode ? "border-slate-600" : "border-slate-300"
                }`}
              ></div>
                         {" "}
            </div>
                       {" "}
            <div className="relative flex justify-center text-sm">
                           {" "}
              <span
                className={`px-2 ${
                  isDarkMode
                    ? "bg-slate-800 text-slate-400"
                    : "bg-white text-slate-500"
                }`}
              >
                                Or              {" "}
              </span>
                         {" "}
            </div>
                     {" "}
          </div>
                              {/* Switch to Signup */}         {" "}
          <div className="text-center">
                       {" "}
            <span
              className={`text-sm ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
                            Don't have an account?            {" "}
            </span>
                       {" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className={`font-semibold transition-colors duration-200 ${
                isDarkMode
                  ? "text-emerald-400 hover:text-emerald-300"
                  : "text-emerald-600 hover:text-emerald-500"
              }`}
            >
                            Sign up            {" "}
            </button>
                     {" "}
          </div>
                 {" "}
        </div>
                        {/* Terms & Privacy */}       {" "}
        <div className="text-center mt-6">
                   {" "}
          <p
            className={`text-xs ${
              isDarkMode ? "text-slate-500" : "text-slate-400"
            }`}
          >
                        By signing in, you agree to our            {" "}
            <Link
              to="/terms"
              className={`transition-colors duration-200 ${
                isDarkMode
                  ? "text-emerald-400 hover:text-emerald-300"
                  : "text-emerald-600 hover:text-emerald-500"
              }`}
            >
                            Terms of Service            {" "}
            </Link>{" "}
                        and            {" "}
            <Link
              to="/privacy"
              className={`transition-colors duration-200 ${
                isDarkMode
                  ? "text-emerald-400 hover:text-emerald-300"
                  : "text-emerald-600 hover:text-emerald-500"
              }`}
            >
                            Privacy Policy            {" "}
            </Link>
                     {" "}
          </p>
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </div>
  );
};

export default Login;
