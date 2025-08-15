import React from "react";
import { useSelector } from "react-redux";
import { User, Mail, Phone, MapPin, FileText, Briefcase } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../services/api";

const Profile = () => {
  const { isDarkMode } = useSelector((state) => state.theme);
  const token = useSelector((state) => state.auth.token);

  const [profileData, setProfileData] = useState(null);

  const userData = {
    name: profileData?.data?.name || "John Doe",
    email: profileData?.data?.email || "johndoe@example.com",
    phone: profileData?.data?.phone || "+1 234 567 890",
    location: profileData?.data?.address || "New York, USA",
    resume: "/uploads/johndoe_resume.pdf",
    bio: "Full Stack Developer with a passion for building scalable web applications and working with modern tech stacks.",
    skills: ["JavaScript", "React", "Node.js", "Tailwind CSS", "MongoDB"],
    experience: [
      {
        role: "Senior Developer",
        company: "Tech Corp",
        years: "2020 - Present",
      },
      {
        role: "Frontend Developer",
        company: "Web Solutions",
        years: "2018 - 2020",
      },
    ],
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setProfileData(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen px-6 py-24 transition-colors duration-300 relative ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300"
          : "bg-gradient-to-br from-slate-100 via-white to-slate-100 text-slate-800"
      }`}
    >
      {/* Background Circles */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
            isDarkMode ? "bg-emerald-500" : "bg-emerald-400"
          }`}
        ></div>
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
            isDarkMode ? "bg-teal-500" : "bg-teal-400"
          }`}
        ></div>
      </div>

      {/* Header */}
      <header className="max-w-4xl mx-auto text-center mb-16">
        <div className="flex justify-center mb-6">
          <User className="h-16 w-16 text-emerald-500" />
        </div>
        <h1 className="text-4xl font-extrabold mb-2">{userData.name}</h1>
        <p className="text-lg opacity-80">{userData.bio}</p>
      </header>

      {/* Contact Info */}
      <section className="max-w-4xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className={`flex items-center p-4 rounded-xl shadow-lg ${
            isDarkMode ? "bg-slate-800/70" : "bg-white/80"
          }`}
        >
          <Mail className="text-emerald-500 mr-4" />
          <span>{userData.email}</span>
        </div>
        <div
          className={`flex items-center p-4 rounded-xl shadow-lg ${
            isDarkMode ? "bg-slate-800/70" : "bg-white/80"
          }`}
        >
          <Phone className="text-emerald-500 mr-4" />
          <span>{userData.phone}</span>
        </div>
        <div
          className={`flex items-center p-4 rounded-xl shadow-lg ${
            isDarkMode ? "bg-slate-800/70" : "bg-white/80"
          }`}
        >
          <MapPin className="text-emerald-500 mr-4" />
          <span>{userData.location}</span>
        </div>
        <a
          href={userData.resume}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center p-4 rounded-xl shadow-lg transition-colors duration-200 ${
            isDarkMode
              ? "bg-slate-800/70 hover:bg-slate-700"
              : "bg-white/80 hover:bg-slate-100"
          }`}
        >
          <FileText className="text-emerald-500 mr-4" />
          <span>View Resume</span>
        </a>
      </section>

      {/* Skills */}
      <section className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {userData.skills.map((skill, idx) => (
            <span
              key={idx}
              className={`px-4 py-2 rounded-full text-sm font-medium shadow-md ${
                isDarkMode
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-emerald-100 text-emerald-700 border border-emerald-300"
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Experience</h2>
        <div className="space-y-4">
          {userData.experience.map((exp, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl shadow-lg flex items-center justify-between ${
                isDarkMode ? "bg-slate-800/70" : "bg-white/80"
              }`}
            >
              <div>
                <h3 className="font-semibold">{exp.role}</h3>
                <p className="text-sm opacity-80">{exp.company}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Briefcase className="text-emerald-500" />
                <span className="text-sm opacity-70">{exp.years}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Profile;
