import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import ProjectsPanel from "../components/Projects";
import "./Dashboard.css"

function Dashboard() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null; // prevents flash before redirect
  }

  return (
    <div className="wrapper">
      <h2>Dashboard</h2>

      <p>
        Logged in as: <strong>{user?.name}</strong> ({user?.email})
      </p>

      
      <ProjectsPanel />

    </div>
  );
}

export default Dashboard;
