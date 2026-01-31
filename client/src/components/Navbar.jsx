import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav style={{ marginBottom: 20 }}>
      <Link to="/">Home</Link>

      <span style={{ marginLeft: 12 }}>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard">Dashboard</Link>{" "}
            <button
              style={{ marginLeft: 8 }}
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>{" "}
            <Link style={{ marginLeft: 8 }} to="/signup">
              Signup
            </Link>
          </>
        )}
      </span>
    </nav>
  );
}

export default Navbar;
