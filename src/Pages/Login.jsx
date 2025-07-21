import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {doc,getDoc} from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth ,db} from "../firebase.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
       const uid = userCredential.user.uid;
      await signInWithEmailAndPassword(auth, email,password);
     // 2. Get user data from Firestore

    const userDoc = await getDoc(doc(db, "users", uid));
    const userData = userDoc.data();

    // 3. Check if role matches
    if (userData.role !== role) {
      setError("Role mismatch. Please select the correct role.");
      return;
    }

    // 4. Redirect based on role
    if (role === "teacher") {
      navigate("/teacher-dashboard", { state: { name: userData.name } });
    } else {
      navigate("/student-dashboard", { state: { name: userData.name } });
    }
  
    }
    
    catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>


        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
          />
        <select
          className="w-full mb-4 p-2 border rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
          />
{error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
