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
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ImageEnhancement />} />
        <Route path="/enhancement" element={<ImageEnhancement />} />
        <Route path="/detection" element={<ObjectDetection />} />
      </Routes>
    </Router>
  );
};

export default App;
