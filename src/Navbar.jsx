import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={{ color: "white" }}>🩸 Blood Help</h2>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/emergency" style={styles.link}>Emergency</Link>
        <Link to="/donor" style={styles.link}>Donate</Link>
        <Link to='/chatbot' style={styles.link}>Chat Bot</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    backgroundColor: "#d32f2f"
  },
  link: {
    marginLeft: "20px",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold"
  }
};

export default Navbar;