import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

function Signup({ onClose, onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

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

      // After signup, switch to Login modal
      if (onSwitchToLogin) {
        onSwitchToLogin();
      }

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-md">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <form onSubmit={handleSignup} className="w-full">
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

          <p className="mt-2 text-sm text-center text-gray-500">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-blue-500 hover:underline"
            >
              Login
            </button>
          </p>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 mt-2"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
