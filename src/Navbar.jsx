import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
  <span className="logo-icon">🩸</span>
  <div className="logo-text">
    <span className="logo-main">One Page</span>
    <span className="logo-sub">One Life</span>
  </div>
</div>
      {/* Links */}
      <div className="nav-links">
        <Link className={location.pathname === "/" ? "active" : ""} to="/">
          Home
        </Link>

        <Link className={location.pathname === "/emergency" ? "active" : ""} to="/emergency">
          Emergency
        </Link>

        

        <Link className={location.pathname === "/chatbot" ? "active" : ""} to="/chatbot">
          AI Assist
        </Link>

        <Link className={location.pathname === "/registration" ? "active" : ""} to="/registration">
          Donar Login
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;