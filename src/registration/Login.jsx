import { useState } from "react";
import axios from "axios";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:4000"
      : "https://your-backend.onrender.com";

  const [form, setForm] = useState({
    phone: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!/^[0-9]{10}$/.test(form.phone)) {
      return "Phone must be 10 digits";
    }
    if (form.password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/api/v1/hackathon/login`,
        form
      );

      console.log(res.data);

      if (res.data.success) {
        // 🔥 Store phone
        localStorage.setItem("phone", form.phone);

        setError("");

        alert("✅ Login successful");

        // 🔥 NAVIGATE TO PROFILE
        navigate("/donor-profile");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>🔐 Login</h2>

        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>

        {/* 🔥 FIXED TEXT */}
        <p className="auth-switch">
          Create Account?{" "}
          <span onClick={() => navigate("/registration")}>
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;