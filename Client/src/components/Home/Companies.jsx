import React from "react";
import { useSelector } from "react-redux";

const Companies = () => {

    const { isDarkMode } = useSelector((state) => state.theme);

      const companies = [
    {
      name: "Google",
      logo: "/images/google.webp",
    },
    {
      name: "Microsoft",
      logo: "/images/microsoft.webp",
    },
    {
      name: "Amazon",
      logo: "/images/amazon.png",
    },
    {
      name: "Apple",
      logo: "/images/apple.png",
    },
    {
      name: "Netflix",
      logo: "/images/netflix.png",
    },
    {
      name: "Tesla",
      logo: "/images/tesla.png",
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
              Trusted by Leading Companies
            </h2>
            <p
              className={`text-lg ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Join professionals working at world's best companies
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {companies.map((company, index) => (
              <div
                key={index}
                className={`${
                  isDarkMode
                    ? "bg-slate-800/50 hover:bg-slate-700/50"
                    : "bg-white/50 hover:bg-white/80"
                } backdrop-blur-sm rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 cursor-pointer border ${
                  isDarkMode ? "border-slate-700/30" : "border-slate-200/30"
                } shadow-md hover:shadow-lg`} 
              >
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="mx-auto h-12 w-auto object-contain mb-2"
                  loading="lazy"
                />
                <div
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  {company.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Companies;
