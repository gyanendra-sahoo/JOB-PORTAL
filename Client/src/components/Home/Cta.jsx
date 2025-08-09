import React from "react";
import { useSelector } from "react-redux";

const Cta = () => {

    const { isDarkMode } = useSelector((state) => state.theme);
    
  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`${
              isDarkMode
                ? "bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600"
                : "bg-gradient-to-r from-white to-slate-50 border-slate-200"
            } backdrop-blur-md rounded-3xl border p-12 shadow-2xl`}
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Ready to Start Your Journey?
            </h2>
            <p
              className={`text-lg mb-8 ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Join thousands of professionals who found their dream jobs through
              CareerOrbit
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Get Started
              </button>
              <button className="border border-emerald-600 hover:border-emerald-700 text-emerald-600 hover:text-emerald-700 px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cta;
