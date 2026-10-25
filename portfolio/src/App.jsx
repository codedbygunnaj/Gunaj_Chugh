import { Routes, Route } from "react-router-dom";

import Portfolio from "./Portfolio";
import Project from "./Project";
import Experience from "./Experience";
import TechStack from "./TechStack";
import Contact from "./Contact";

import Navbar from "./Navbar";
import ProfileCard from "./profileCard";
import Footer from "./Footer";
import CursorEffect from "./components/CursorEffect";
import "./App.css";

function App() {
  return (
    <div className="app-layout">
      {/* Interactive Cursor Particle & Trail System */}
      <CursorEffect />

      {/* Floating Glassmorphic Navbar */}
      <Navbar />

      {/* Main Container Layout */}
      <div className="main-container">
        {/* Persistent 3D Sidebar */}
        <aside className="sidebar-col">
          <ProfileCard />
        </aside>

        {/* Dynamic Route Pages & Unified Footer */}
        <main className="content-col">
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/projects" element={<Project />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/stack" element={<TechStack />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;
