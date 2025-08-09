import React from "react";
import { useSelector } from "react-redux";
import { Briefcase, Building, Users, TrendingUp } from "lucide-react";

const Stats = () => {
  const { isDarkMode } = useSelector((state) => state.theme);

  const stats = [
    { number: "50,000+", label: "Active Jobs", icon: Briefcase },
    { number: "25,000+", label: "Companies", icon: Building },
    { number: "100,000+", label: "Job Seekers", icon: Users },
    { number: "95%", label: "Success Rate", icon: TrendingUp },
  ];

  return (
    <>
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    isDarkMode ? "bg-emerald-500/20" : "bg-emerald-100"
                  }`}
                >
                  <stat.icon
                    className={`h-8 w-8 ${
                      isDarkMode ? "text-emerald-400" : "text-emerald-600"
                    }`}
                  />
                </div>
                <div
                  className={`text-3xl font-bold mb-2 ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {stat.number}
                </div>
                <div
                  className={`text-sm ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Stats;
