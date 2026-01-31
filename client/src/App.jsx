import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./components/Projects";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "../src/App.css";

function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/projects" element={<Projects />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
