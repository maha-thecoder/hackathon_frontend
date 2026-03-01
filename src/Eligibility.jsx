import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Eligibility.css";

function Eligibility() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    age: "",
    weight: "",
    health: "",
    medication: ""
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const checkEligibility = () => {
    const { age, weight, health,  medication } = form;
    try{

    if (
      age === "yes" &&
      weight === "yes" &&
      health === "yes" &&
      medication === "no"
    ) {
      setResult("eligible");

      setTimeout(() => {
        navigate("/donor");
      }, 1500);

    } else {
      setResult("not-eligible");
    }
    }
    catch(err){
        console.log(err)
    }
    finally{
        if(result==="eligible")
        navigate('/donor')
    }
    
  };

  return (
    <div className="eligibility-container">

      <div className="eligibility-card">

        <h2>🩸 Donor Eligibility Check</h2>
        <p>Please answer honestly before proceeding</p>

        {/* Q1 */}
        <label>1. Are you 18 years or older?</label>
        <select name="age" onChange={handleChange}>
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        {/* Q2 */}
        <label>2. Is your weight above 50 kg?</label>
        <select name="weight" onChange={handleChange}>
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        {/* Q3 */}
        <label>3. Are you in good health currently?</label>
        <select name="health" onChange={handleChange}>
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        {/* Q4 */}
        

        {/* Q5 */}
        <label>5. Are you currently on medication?</label>
        <select name="medication" onChange={handleChange}>
          <option value="">Select</option>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>

        <button onClick={checkEligibility}>
          Check Eligibility
        </button>

        {/* RESULT */}
        {result === "eligible" && (
          <p className="success">
            ✅ You are eligible! Redirecting to registration...
          </p>
        )}

        {result === "not-eligible" && (
          <p className="error">
            ❌ You are not eligible to donate blood at this time.
          </p>
        )}

      </div>
    </div>
  );
}

export default Eligibility;