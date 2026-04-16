import { Routes, Route } from "react-router-dom";

import Portfolio from "./Portfolio";
import Project from "./Project";
import Experience from "./Experience";
import Contact from "./Contact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/projects" element={<Project />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;