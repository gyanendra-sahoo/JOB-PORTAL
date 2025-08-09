import Hero from "../components/Home/Hero";
import { useSelector } from "react-redux";
import Stats from "../components/Home/Stats";
import FeaturedJob from "../components/Home/FeaturedJob";
import Companies from "../components/Home/Companies";
import Features from "../components/Home/Features";
import Cta from "../components/Home/Cta";

const Home = () => {
  
  const { isDarkMode } = useSelector((state) => state.theme);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
      }`}
    >
      <Hero />
      <Stats />
      <FeaturedJob />
      <Companies />
      <Features />
      <Cta />
      
    </div>
  );
};

export default Home;
