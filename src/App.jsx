import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login"; 
import {Link} from "react-router-dom";
import Signup from "./Pages/Signup";
import TeacherDashboard from "./Pages/TeacherDashboard";
import StudentDashboard from "./Pages/StudentDashboard";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <Router>
   <NavBar/>
      <Routes>
 <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard studentName={name}/>} />
        <Route path="/student-dashboard" element={<StudentDashboard/>} />
        {/* Add other routes later */}
      </Routes>
    </Router>
  );
}

export default App;
