import { Routes, Route } from "react-router-dom";

import Portfolio from "./Portfolio";
import Project from "./Project";
import Experience from "./Experience";
import Contact from "./Contact";

import Navbar from "./Navbar";
import ProfileCard from "./profileCard";
import Footer from "./Footer";

function App() {
  return (
    <div className="app-layout">

      <Navbar />

      <div className="main-body">
        <ProfileCard />

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/projects" element={<Project />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>

      </div>
      <Footer />

    </div>
  );
}

export default App;