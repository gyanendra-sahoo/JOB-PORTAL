import { MapPin, Search } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Hero = () => {
  const { isDarkMode } = useSelector((state) => state.theme);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  // Handler for Search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for "${searchQuery}" jobs in "${location}"`);
    // Implement real search logic here
  };

  return (
    <>
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
              isDarkMode ? "bg-emerald-500" : "bg-emerald-400"
            }`}
          />
          <div
            className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
              isDarkMode ? "bg-teal-500" : "bg-teal-400"
            }`}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mt-10">
            <h1
              className={`text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${
                isDarkMode
                  ? "from-white via-slate-200 to-slate-300"
                  : "from-slate-900 via-slate-700 to-slate-600"
              } bg-clip-text text-transparent`}
            >
              Find Your Dream Job
            </h1>
            <p
              className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Connect with top employers and discover opportunities that match
              your skills and ambitions
            </p>

            {/* Search Section */}
            <div
              className={`max-w-4xl mx-auto ${
                isDarkMode
                  ? "bg-slate-800/90 border-slate-700/50"
                  : "bg-white/90 border-slate-200/50"
              } backdrop-blur-md rounded-2xl border shadow-2xl p-6`}
            >
              <form
                onSubmit={handleSearch}
                className="flex flex-col md:flex-row gap-4"
              >
                <div className="flex-1 relative">
                  <Search
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                      isDarkMode ? "text-emerald-400" : "text-emerald-500"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${
                      isDarkMode
                        ? "bg-slate-700/70 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-400 focus:ring-emerald-400/50"
                        : "bg-slate-50/70 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-emerald-500 focus:ring-emerald-500/50"
                    }`}
                    required
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                      isDarkMode ? "text-emerald-400" : "text-emerald-500"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${
                      isDarkMode
                        ? "bg-slate-700/70 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-400 focus:ring-emerald-400/50"
                        : "bg-slate-50/70 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-emerald-500 focus:ring-emerald-500/50"
                    }`}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Search Jobs
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
