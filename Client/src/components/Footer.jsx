import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Briefcase, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const { isDarkMode } = useSelector((state) => state.theme);

  return (
    <footer
      className={`w-full mt-auto ${
        isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
      } border-t transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Briefcase
                className={`h-8 w-8 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}
              />
              <span
                className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                JobPortal
              </span>
            </div>
            <p
              className={`text-sm leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Your gateway to dream careers. Connect with top employers and find the perfect job
              opportunity.
            </p>
            <div className="flex space-x-4">
              {[Github, Linkedin, Twitter].map((Icon, idx) => (
                <Link
                  key={idx}
                  to="/"
                  className={`p-2 rounded-full border transition-colors duration-200 ${
                    isDarkMode
                      ? 'border-slate-700 text-slate-300 hover:text-emerald-400 hover:border-emerald-400'
                      : 'border-slate-300 text-slate-500 hover:text-emerald-600 hover:border-emerald-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3
              className={`font-semibold mb-4 text-lg ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              For Job Seekers
            </h3>
            <ul
              className={`space-y-2 text-sm ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {['Browse Jobs', 'Career Advice', 'Resume Builder', 'Salary Guide'].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className={`transition-colors duration-200 ${
                      isDarkMode ? 'hover:text-emerald-400' : 'hover:text-emerald-600'
                    }`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3
              className={`font-semibold mb-4 text-lg ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              For Employers
            </h3>
            <ul
              className={`space-y-2 text-sm ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {['Post a Job', 'Browse Resumes', 'Recruitment Solutions', 'Pricing'].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className={`transition-colors duration-200 ${
                      isDarkMode ? 'hover:text-emerald-400' : 'hover:text-emerald-600'
                    }`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              className={`font-semibold mb-4 text-lg ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Contact Info
            </h3>
            <div
              className={`space-y-3 text-sm ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>support@jobportal.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={`mt-10 pt-6 border-t flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 ${
            isDarkMode ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            © {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end space-x-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link
                key={item}
                to="/"
                className={`text-sm transition-colors duration-200 ${
                  isDarkMode ? 'text-slate-300 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-600'
                }`}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;