import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import ProjectsPanel from "../components/Projects";

function Dashboard() {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null; // prevents flash before redirect
  }

  return (
    <div>
      <h2>Dashboard</h2>

      <p>
        Logged in as: <strong>{user?.name}</strong> ({user?.email})
      </p>

      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Log out
      </button>
      <ProjectsPanel />

    </div>
  );
}

export default Dashboard;
