import { Routes, Route } from "react-router-dom";

import Portfolio from "./Portfolio";
import Project from "./Project";
import Experience from "./Experience";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/projects" element={<Project />} />
      <Route path="/experience" element={<Experience />} />
    </Routes>
  );
}

export default App;