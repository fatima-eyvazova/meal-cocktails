import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
// import useFetch from "./hooks/useFetch";
import Detail from "./pages/Detail/Detail";

const App: React.FC = () => {
  // const { data, loading, error } = useFetch(
  //   "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"
  // );
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:type/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
};

export default App;
