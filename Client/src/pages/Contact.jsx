import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Mail, User, MessageSquare, Send } from 'lucide-react';

const Contact = () => {
  const { isDarkMode } = useSelector((state) => state.theme);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Here you can handle the actual contact form submission logic (e.g., API call)
    console.log('Contact form submitted:', formData);

    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
  };

  const cardClasses = isDarkMode
    ? 'bg-slate-800/90 border-slate-700/50 backdrop-blur-md'
    : 'bg-white/90 border-slate-200/50 backdrop-blur-md';

  const inputClasses = (fieldName) => `
    ${isDarkMode
      ? 'bg-slate-700/70 border-slate-600 text-white placeholder-slate-400'
      : 'bg-slate-50/70 border-slate-300 text-slate-900 placeholder-slate-500'}
    ${errors[fieldName]
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
      : isDarkMode
        ? 'focus:border-emerald-400 focus:ring-emerald-400/50'
        : 'focus:border-emerald-500 focus:ring-emerald-500/50'}
    w-full pl-12 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm
  `;

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-24 transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
          : 'bg-gradient-to-br from-slate-100 via-white to-slate-100'
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
            isDarkMode ? 'bg-emerald-500' : 'bg-emerald-400'
          }`}
        ></div>
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
            isDarkMode ? 'bg-teal-500' : 'bg-teal-400'
          }`}
        ></div>
      </div>

      <div className="max-w-md w-full mx-auto relative z-10">
        <div className="text-center mb-8">
          <h2
            className={`text-3xl font-bold bg-gradient-to-r ${
              isDarkMode ? 'from-white to-slate-300' : 'from-slate-800 to-slate-600'
            } bg-clip-text text-transparent`}
          >
            Contact Us
          </h2>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            We’d love to hear from you! Please fill out the form below.
          </p>
          {submitted && (
            <p className="mt-4 text-green-500 font-semibold">Thank you! Your message has been sent.</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className={`${cardClasses} rounded-2xl shadow-2xl border p-8`}>
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}
              >
                Name
              </label>
              <div className="relative">
                <User
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    errors.name ? 'text-red-400' : isDarkMode ? 'text-emerald-400' : 'text-emerald-500'
                  }`}
                />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={inputClasses('name')}
                  placeholder="Your full name"
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    errors.email ? 'text-red-400' : isDarkMode ? 'text-emerald-400' : 'text-emerald-500'
                  }`}
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClasses('email')}
                  placeholder="Your email address"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleInputChange}
                className={`${inputClasses('subject')} pl-4`}
                placeholder="Subject of your message"
              />
              {errors.subject && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}
              >
                Message
              </label>
              <div className="relative">
                <MessageSquare
                  className={`absolute left-4 top-4 h-5 w-5 ${
                    errors.message ? 'text-red-400' : isDarkMode ? 'text-emerald-400' : 'text-emerald-500'
                  }`}
                />
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`${inputClasses('message')} pl-12 resize-none`}
                  placeholder="Write your message here..."
                />
              </div>
              {errors.message && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <Send className="h-4 w-4 text-emerald-300 group-hover:text-emerald-200" />
                </span>
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
