// components/About.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Briefcase, Users, Globe } from 'lucide-react';

const About = () => {
  const { isDarkMode } = useSelector((state) => state.theme);

  return (
    <div
      className={`min-h-screen px-6 py-24 flex flex-col items-center transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300'
          : 'bg-gradient-to-br from-slate-100 via-white to-slate-100 text-slate-800'
      }`}
    >
      {/* Background decorative circles */}
      <div className="absolute inset-0 overflow-hidden -z-10">
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

      <header className="max-w-4xl text-center mb-16">
        <div className="flex justify-center mb-6">
          <Briefcase className="h-14 w-14 text-emerald-500" />
        </div>
        <h1 className="text-4xl font-extrabold mb-4">
          About CareerOrbit
        </h1>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed">
          CareerOrbit is a modern platform designed to connect talented professionals with great companies. 
          Our mission is to empower job seekers and employers by providing an intuitive, transparent, and efficient hiring experience.
        </p>
      </header>

      <section className="max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div className="space-y-4">
          <Users className="mx-auto h-12 w-12 text-emerald-500" />
          <h2 className="text-2xl font-semibold">Our Community</h2>
          <p>
            Thousands of users trust CareerOrbit daily to discover their next career opportunity or to find the perfect candidate.
          </p>
        </div>
        <div className="space-y-4">
          <Globe className="mx-auto h-12 w-12 text-emerald-500" />
          <h2 className="text-2xl font-semibold">Global Reach</h2>
          <p>
            Our platform connects job seekers and employers worldwide, breaking geographic barriers and expanding opportunities.
          </p>
        </div>
        <div className="space-y-4">
          <Briefcase className="mx-auto h-12 w-12 text-emerald-500" />
          <h2 className="text-2xl font-semibold">Trusted Service</h2>
          <p>
            We focus on quality, transparency, and reliability to make every job search and hiring process seamless and successful.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
