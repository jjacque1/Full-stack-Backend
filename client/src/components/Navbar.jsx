import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "./Navbar.css";
import logo from "../assets/JJ.logo.PNG"

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav className="nav">
      <div className="logo-wrapper">
        <img className="logo" src={logo} alt="personal logo" />
      </div>
      <div className="link-container">
        <Link className="link" to="/">
          Home
        </Link>

        <span>
          {isLoggedIn ? (
            <>
              <Link className="link" to="/dashboard">
                Dashboard
              </Link>{" "}
              <button
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
              <Link className="link" to="/login">
                Log in
              </Link>
              <Link className="link" to="/signup">
                Sign up
              </Link>
            </>
          )}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
