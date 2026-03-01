import { useState } from "react";
import "./Auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate=useNavigate()
    const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "https://your-backend.onrender.com";
  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (form.name.length < 3) return "Name too short";
    if (!/^[0-9]{10}$/.test(form.phone)) return "Invalid phone number";
    if (form.password.length < 6) return "Password too short";
    return "";
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
        const err = validate();

    
    if (err) {
      setError(err);
      return;
    }
    try{
     const res = await axios.post(`${API_URL}/api/v1/hackathon/signup`, form);

    console.log(res.data);
    }
    catch(err){
        console.log(err.message)
    }


    setError("");
    console.log("Signup Data:", form);
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>📝 Signup</h2>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

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

        <button type="submit">Signup</button>
           <p className="auth-switch">
  Already have an account?{" "}
  <span onClick={() => window.location.href = "/login"}>
    Login
  </span>
</p>
      </form>

   
    </div>
  );
}

export default Signup;