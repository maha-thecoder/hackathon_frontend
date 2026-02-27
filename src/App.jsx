import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Emergency from "./Emergency";
import Donor from "./Donor";
import NearbyDonors from "./NearbyDonors";
import ImageUpload from "./imageupload";
import Services from "./Services";
import Eligibility from "./Eligibility";
import MedicalChatbotUI from "./chatbot/MedicalChatbotUI";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/split" element={<Services />} />
         <Route path="/eligible-test" element={<Eligibility />} />


        <Route path="/donor" element={<Donor />} />
        <Route path="/donors" element={<NearbyDonors/>}/>

        <Route path="/chatbot" element={<MedicalChatbotUI/>}/>



      </Routes>
    </Router>
  );
}

export default App;