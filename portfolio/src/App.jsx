import { Routes, Route } from "react-router-dom";

import Portfolio from "./Portfolio";
import Project from "./Project";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/projects" element={<Project />} />
    </Routes>
  );
}

export default App;