// import React from 'react';
// import Navbar from './components/Navbar';
// import ImageUploader from './components/ImageUploader';

// function App() {
//   return (
//     <div className="App">
//       <Navbar />
//       <ImageUploader />
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ObjectDetection from './pages/ObjectDetection';
import ImageEnhancement from './pages/ImageEnhancement';
import About from './pages/About';
import ProjectDetails from './pages/ProjectDetails';
import LiteratureSurvey from './pages/LiteratureSurvey';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/project" element={<ProjectDetails />} />
        <Route path="/enhancement" element={<ImageEnhancement />} />
        <Route path="/detection" element={<ObjectDetection />} />
        <Route path="/literature" element={<LiteratureSurvey />} />
      </Routes>
    </Router>
  );
};

export default App;
