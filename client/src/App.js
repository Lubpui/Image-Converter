import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ImagePredict from "./components/ImagePredict";
import "./css/App.css";
import ImageConverter from "./components/ImageConverter";

const App = () => {
  return (
    <div className="BGIMG">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<ImagePredict />} />
          <Route exact path="/ImageConverter" element={<ImageConverter />} />
          <Route exact path="/ImagePredict" element={<ImagePredict />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
