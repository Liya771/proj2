import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import AuthPage from "./Components/Auth";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import UploadProduct from "./Components/UploadProduct";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadProduct />} />
      </Routes>
    </>
  );
}

export default App;
