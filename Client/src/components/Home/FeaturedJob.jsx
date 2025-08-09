import { ArrowRight, DollarSign, MapPin } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const FeaturedJob = () => {
    const { isDarkMode } = useSelector((state) => state.theme);

      const featuredJobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120k - $180k",
      type: "Full-time",
      posted: "2 days ago",
      logo: "🏢",
    },
    {
      id: 2,
      title: "Product Designer",
      company: "Design Studio",
      location: "New York, NY",
      salary: "$90k - $130k",
      type: "Full-time",
      posted: "1 day ago",
      logo: "🎨",
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Analytics Pro",
      location: "Remote",
      salary: "$110k - $160k",
      type: "Remote",
      posted: "3 days ago",
      logo: "📊",
    },
  ];


  return (
    <>
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Featured Jobs
            </h2>
            <p
              className={`text-lg ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Discover amazing opportunities from top companies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredJobs.map((job) => (
              <div
                key={job.id}
                className={`${
                  isDarkMode
                    ? "bg-slate-800/90 border-slate-700/50"
                    : "bg-white/90 border-slate-200/50"
                } backdrop-blur-md rounded-2xl border p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y--1`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{job.logo}</div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      isDarkMode
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {job.type}
                  </span>
                </div>

                <h3
                  className={`text-xl font-semibold mb-2 ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {job.title}
                </h3>

                <p
                  className={`text-sm mb-4 ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {job.company}
                </p>

                <div className="flex items-center justify-between text-sm mb-4">
                  <div
                    className={`flex items-center ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </div>
                  <div
                    className={`flex items-center ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    <DollarSign className="h-4 w-4 mr-1" />
                    {job.salary}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs ${
                      isDarkMode ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    {job.posted}
                  </span>
                  <button
                    className={`text-sm font-medium flex items-center transition-colors duration-200 ${
                      isDarkMode
                        ? "text-emerald-400 hover:text-emerald-300"
                        : "text-emerald-600 hover:text-emerald-700"
                    }`}
                  >
                    Apply Now
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105">
              View All Jobs
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedJob;
