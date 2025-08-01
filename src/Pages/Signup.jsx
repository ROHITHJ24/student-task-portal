import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import Login from "./Login"; // ⬅️ Import Login component

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false); // ⬅️ State for modal

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
      });

      // Show login modal instead of navigating
      setShowLoginModal(true);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow-md w-80">
          <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>

          <input
            type="text"
            placeholder="Name"
            className="w-full mb-3 p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            className="w-full mb-3 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Sign Up
          </button>
        </form>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <Login />
          </div>
        </div>
      )}
    </>
  );
}

export default Signup;
