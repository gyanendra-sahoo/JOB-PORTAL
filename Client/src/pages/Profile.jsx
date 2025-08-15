import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Briefcase,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
} from "lucide-react";
import api from "../services/api";

const Profile = () => {
  const { isDarkMode } = useSelector((state) => state.theme);
  const token = useSelector((state) => state.auth.token);

  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const res = await api.get("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setProfileData(res.data);
        setFormData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setError("Failed to load profile. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("niches.")) {
      const nicheKey = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        niches: {
          ...prevData.niches,
          [nicheKey]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Skills management functions
  const addSkill = () => {
    setFormData((prevData) => ({
      ...prevData,
      skills: [...(prevData.skills || []), ""],
    }));
  };

  const updateSkill = (index, value) => {
    setFormData((prevData) => {
      const newSkills = [...(prevData.skills || [])];
      newSkills[index] = value;
      return { ...prevData, skills: newSkills };
    });
  };

  const deleteSkill = (index) => {
    setFormData((prevData) => {
      const newSkills = [...(prevData.skills || [])];
      newSkills.splice(index, 1);
      return { ...prevData, skills: newSkills };
    });
  };

  // Experience management functions
  const addExperience = () => {
    setFormData((prevData) => ({
      ...prevData,
      experience: [
        ...(prevData.experience || []),
        { role: "", company: "", years: "" },
      ],
    }));
  };

  const updateExperience = (index, field, value) => {
    setFormData((prevData) => {
      const newExperience = [...(prevData.experience || [])];
      newExperience[index] = { ...newExperience[index], [field]: value };
      return { ...prevData, experience: newExperience };
    });
  };

  const deleteExperience = (index) => {
    setFormData((prevData) => {
      const newExperience = [...(prevData.experience || [])];
      newExperience.splice(index, 1);
      return { ...prevData, experience: newExperience };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      // Filter out empty skills and experiences
      const filteredSkills =
        formData.skills?.filter((skill) => skill.trim() !== "") || [];
      const filteredExperience =
        formData.experience?.filter(
          (exp) =>
            exp.role.trim() !== "" ||
            exp.company.trim() !== "" ||
            exp.years.trim() !== ""
        ) || [];

      const dataToSend = {
        ...formData,
        skills: filteredSkills,
        experience: filteredExperience,
        firstNiche: formData.niches?.firstNiche,
        secondNiche: formData.niches?.secondNiche,
        thirdNiche: formData.niches?.thirdNiche,
        fourthNiche: formData.niches?.fourthNiche,
        niches: undefined,
      };

      await api.put("/api/user/profile/edit", dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setProfileData((prevData) => ({
        ...prevData,
        data: {
          ...formData,
          skills: filteredSkills,
          experience: filteredExperience,
        },
      }));
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update user:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(profileData?.data || userData);
    setError(null);
  };

  if (isLoading && !profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          <p className={`${isDarkMode ? "text-slate-300" : "text-slate-800"}`}>
            Loading user data...
          </p>
        </div>
      </div>
    );
  }

  const userData = profileData?.data || {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    address: "New York, USA",
    resume: "/uploads/johndoe_resume.pdf",
    bio: "A passionate developer with a love for coding.",
    skills: ["JavaScript", "React", "Node.js"],
    experience: [
      { role: "Software Engineer", company: "Tech Corp", years: "2 years" },
      { role: "Frontend Developer", company: "Web Solutions", years: "1 year" },
    ],
    niches: {
      firstNiche: "Web Development",
      secondNiche: "Mobile Development",
      thirdNiche: "UI/UX Design",
      fourthNiche: "DevOps",
    },
  };

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

      <main className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16 relative">
          <div className="flex justify-center mb-6">
            <div
              className={`p-4 rounded-full ${
                isDarkMode ? "bg-slate-800/50" : "bg-white/50"
              } backdrop-blur-sm`}
            >
              <User className="h-16 w-16 text-emerald-500" />
            </div>
          </div>

          <h1 className="text-4xl font-extrabold mb-4">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                className={`w-full max-w-md mx-auto text-center bg-transparent border-b-2 font-extrabold text-4xl p-2 focus:outline-none focus:border-emerald-500 transition-colors ${
                  isDarkMode ? "border-slate-600" : "border-slate-300"
                }`}
                placeholder="Your Name"
              />
            ) : (
              userData.name
            )}
          </h1>

          <div className="max-w-2xl mx-auto">
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio || ""}
                onChange={handleInputChange}
                className={`w-full text-center bg-transparent border-2 rounded-lg text-lg p-3 focus:outline-none focus:border-emerald-500 transition-colors resize-none ${
                  isDarkMode ? "border-slate-600" : "border-slate-300"
                }`}
                rows="3"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-lg opacity-80">{userData.bio}</p>
            )}
          </div>

          <div className="absolute top-0 right-0">
            {isEditing ? (
              <div className="flex space-x-2">
                <button
                  onClick={handleFormSubmit}
                  disabled={isLoading}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    isDarkMode
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-emerald-500 hover:bg-emerald-600"
                  } text-white shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                  title="Save Profile"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <Save className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isLoading}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    isDarkMode
                      ? "bg-slate-700 hover:bg-slate-600"
                      : "bg-slate-200 hover:bg-slate-300"
                  } text-slate-500 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50`}
                  title="Cancel"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsEditing(true);
                  setFormData(userData);
                  setError(null);
                }}
                className={`p-3 rounded-full transition-all duration-200 ${
                  isDarkMode
                    ? "bg-slate-700 hover:bg-slate-600"
                    : "bg-slate-200 hover:bg-slate-300"
                } text-slate-500 shadow-lg hover:shadow-xl transform hover:scale-105`}
                title="Edit Profile"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-100 border border-red-300 text-red-700">
              {error}
            </div>
          )}
        </header>

        <form onSubmit={handleFormSubmit}>
          {isEditing && (
            <div className="text-center mb-8 p-4 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-blue-700 text-sm">
                ✨ You're in edit mode. Make your changes and click save when
                ready.
              </p>
            </div>
          )}

          {/* Contact Info */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Mail className="h-6 w-6 text-emerald-500 mr-2" />
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className={`flex items-center p-4 rounded-xl shadow-lg transition-all duration-200 ${
                  isDarkMode
                    ? "bg-slate-800/70 hover:bg-slate-800"
                    : "bg-white/80 hover:bg-white"
                }`}
              >
                <Mail className="text-emerald-500 mr-4 flex-shrink-0" />
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                    className="w-full bg-transparent focus:outline-none"
                    placeholder="your.email@example.com"
                  />
                ) : (
                  <span className="break-all">{userData.email}</span>
                )}
              </div>

              <div
                className={`flex items-center p-4 rounded-xl shadow-lg transition-all duration-200 ${
                  isDarkMode
                    ? "bg-slate-800/70 hover:bg-slate-800"
                    : "bg-white/80 hover:bg-white"
                }`}
              >
                <Phone className="text-emerald-500 mr-4 flex-shrink-0" />
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleInputChange}
                    className="w-full bg-transparent focus:outline-none"
                    placeholder="+1 234 567 890"
                  />
                ) : (
                  <span>{userData.phone}</span>
                )}
              </div>

              <div
                className={`flex items-center p-4 rounded-xl shadow-lg transition-all duration-200 ${
                  isDarkMode
                    ? "bg-slate-800/70 hover:bg-slate-800"
                    : "bg-white/80 hover:bg-white"
                }`}
              >
                <MapPin className="text-emerald-500 mr-4 flex-shrink-0" />
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleInputChange}
                    className="w-full bg-transparent focus:outline-none"
                    placeholder="City, Country"
                  />
                ) : (
                  <span>{userData.address}</span>
                )}
              </div>

              <a
                href={userData.resume?.secure_url || userData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center p-4 rounded-xl shadow-lg transition-all duration-200 ${
                  isDarkMode
                    ? "bg-slate-800/70 hover:bg-slate-700"
                    : "bg-white/80 hover:bg-slate-100"
                } hover:transform hover:scale-[1.02]`}
              >
                <FileText className="text-emerald-500 mr-4 flex-shrink-0" />
                <span>View Resume</span>
              </a>
            </div>
          </section>

          {/* Niches Section */}
          {isEditing && userData.niches && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Briefcase className="h-6 w-6 text-emerald-500 mr-2" />
                Job Niches*
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(userData.niches).map(([key, value]) => (
                  <div
                    key={key}
                    className={`p-4 rounded-xl shadow-lg ${
                      isDarkMode ? "bg-slate-800/70" : "bg-white/80"
                    }`}
                  >
                    <label
                      htmlFor={key}
                      className="block text-sm font-medium opacity-80 mb-2"
                    >
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </label>
                    <input
                      type="text"
                      id={key}
                      name={`niches.${key}`}
                      value={formData.niches?.[key] || ""}
                      onChange={handleInputChange}
                      className={`w-full bg-transparent focus:outline-none border-b-2 pb-1 transition-colors ${
                        isDarkMode
                          ? "border-slate-600 focus:border-emerald-500"
                          : "border-slate-300 focus:border-emerald-500"
                      }`}
                      placeholder={`Enter ${key
                        .replace(/([A-Z])/g, " $1")
                        .toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Job Niches Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              Job Niches
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userData.niches && Object.values(userData.niches).length > 0 ? (
                Object.values(userData.niches).map((niche, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl shadow-lg transition-all duration-200 ${
                      isDarkMode
                        ? "bg-slate-800/70 hover:bg-slate-800"
                        : "bg-white/80 hover:bg-white"
                    }`}
                  >
                    <span className="text-lg font-semibold text-emerald-500">
                      {niche || "Not specified"}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-center py-8 opacity-60">
                  No job niches specified. Please edit your profile to add them.
                </p>
              )}
            </div>
          </section>

          {/* Skills */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <div className="h-6 w-6 bg-emerald-500 rounded mr-2"></div>
                Skills
              </h2>
              {isEditing && (
                <button
                  type="button"
                  onClick={addSkill}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isDarkMode
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-emerald-500 hover:bg-emerald-600"
                  } text-white shadow-lg hover:shadow-xl transform hover:scale-105`}
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Skill</span>
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-3">
                {(formData.skills || []).map((skill, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      isDarkMode ? "bg-slate-800/70" : "bg-white/80"
                    } shadow-lg`}
                  >
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => updateSkill(index, e.target.value)}
                      className="flex-1 bg-transparent focus:outline-none"
                      placeholder="Enter a skill"
                    />
                    <button
                      type="button"
                      onClick={() => deleteSkill(index)}
                      className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete skill"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {(!formData.skills || formData.skills.length === 0) && (
                  <p className="text-center py-8 opacity-60">
                    No skills added yet. Click "Add Skill" to get started.
                  </p>
                )}
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {userData.skills && userData.skills.length > 0 ? (
                  userData.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all duration-200 hover:transform hover:scale-105 ${
                        isDarkMode
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : "bg-emerald-100 text-emerald-700 border border-emerald-300"
                      }`}
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="opacity-60">No skills listed</p>
                )}
              </div>
            )}
          </section>

          {/* Experience */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <Briefcase className="h-6 w-6 text-emerald-500 mr-2" />
                Experience
              </h2>
              {isEditing && (
                <button
                  type="button"
                  onClick={addExperience}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isDarkMode
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-emerald-500 hover:bg-emerald-600"
                  } text-white shadow-lg hover:shadow-xl transform hover:scale-105`}
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Experience</span>
                </button>
              )}
            </div>

            <div className="space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  {(formData.experience || []).map((exp, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl shadow-lg ${
                        isDarkMode ? "bg-slate-800/70" : "bg-white/80"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-lg">
                          Experience #{idx + 1}
                        </h3>
                        <button
                          type="button"
                          onClick={() => deleteExperience(idx)}
                          className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete experience"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium opacity-80 mb-1">
                            Role/Position
                          </label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) =>
                              updateExperience(idx, "role", e.target.value)
                            }
                            placeholder="Software Engineer"
                            className="w-full bg-transparent focus:outline-none border-b-2 border-slate-300 focus:border-emerald-500 pb-1 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium opacity-80 mb-1">
                            Company
                          </label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) =>
                              updateExperience(idx, "company", e.target.value)
                            }
                            placeholder="Tech Corp"
                            className="w-full bg-transparent focus:outline-none border-b-2 border-slate-300 focus:border-emerald-500 pb-1 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium opacity-80 mb-1">
                            Duration
                          </label>
                          <input
                            type="text"
                            value={exp.years}
                            onChange={(e) =>
                              updateExperience(idx, "years", e.target.value)
                            }
                            placeholder="2 years"
                            className="w-full bg-transparent focus:outline-none border-b-2 border-slate-300 focus:border-emerald-500 pb-1 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!formData.experience ||
                    formData.experience.length === 0) && (
                    <p className="text-center py-8 opacity-60">
                      No work experience added yet. Click "Add Experience" to
                      get started.
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {userData.experience && userData.experience.length > 0 ? (
                    userData.experience.map((exp, idx) => (
                      <div
                        key={idx}
                        className={`p-6 rounded-xl shadow-lg flex items-center justify-between transition-all duration-200 hover:transform hover:scale-[1.02] ${
                          isDarkMode
                            ? "bg-slate-800/70 hover:bg-slate-800"
                            : "bg-white/80 hover:bg-white"
                        }`}
                      >
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{exp.role}</h3>
                          <p className="text-sm opacity-80 mb-2">
                            {exp.company}
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <span className="text-sm font-medium opacity-70 block">
                              Duration
                            </span>
                            <span className="text-lg font-semibold text-emerald-500">
                              {exp.years}
                            </span>
                          </div>
                          <Briefcase className="text-emerald-500 h-6 w-6" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-8 opacity-60">
                      No work experience listed
                    </p>
                  )}
                </div>
              )}
            </div>
          </section>
        </form>
      </main>
    </div>
  );
};

export default Profile;
