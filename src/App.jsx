import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.tsx";
import CropRecommendation from "./CropRecommendation.tsx";
import DiseaseDetection from "./DiseaseDetection.tsx";
import FarmerProfile from "./FarmerProfile.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/crop" element={<CropRecommendation />} />
        <Route path="/disease" element={<DiseaseDetection />} />
        <Route path="/profile" element={<FarmerProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
