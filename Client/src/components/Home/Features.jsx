import React from "react";
import { useSelector } from "react-redux";
import {
    Search,
    Users,
    Award
} from 'lucide-react'



const Features = () => {
  const { isDarkMode } = useSelector((state) => state.theme);

  const features = [
    {
      icon: Search,
      title: "Smart Job Matching",
      description:
        "AI-powered algorithm matches you with perfect job opportunities based on your skills and preferences.",
    },
    {
      icon: Users,
      title: "Network Building",
      description:
        "Connect with industry professionals and expand your network to unlock hidden job opportunities.",
    },
    {
      icon: Award,
      title: "Skill Assessment",
      description:
        "Validate your skills with our comprehensive assessments and stand out to employers.",
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
              Why Choose JobPortal?
            </h2>
            <p
              className={`text-lg ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Advanced features to accelerate your career journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${
                  isDarkMode
                    ? "bg-slate-800/90 border-slate-700/50"
                    : "bg-white/90 border-slate-200/50"
                } backdrop-blur-md rounded-2xl border p-8 text-center hover:shadow-xl transition-all duration-300`}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
                    isDarkMode ? "bg-emerald-500/20" : "bg-emerald-100"
                  }`}
                >
                  <feature.icon
                    className={`h-8 w-8 ${
                      isDarkMode ? "text-emerald-400" : "text-emerald-600"
                    }`}
                  />
                </div>
                <h3
                  className={`text-xl font-semibold mb-4 ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
