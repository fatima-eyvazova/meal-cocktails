import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import useFetch from "./hooks/useFetch";
import Detail from "./pages/Detail/Detail";
import Favorites from "./pages/Favorites/Favorites";

const App: React.FC = () => {
  const { data, loading, error } = useFetch(
    "www.themealdb.com/api/json/v1/1/filter.php?a=Canadian"
  );
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/product/:type/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
};

export default App;
