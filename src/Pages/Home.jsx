import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleSignupSuccess = () => {
    setShowSignup(false);
    setShowLogin(true); // Open login modal after signup
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setShowSignup(false); // Close all modals
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Portal</h1>
       <p className="text-gray-600 text-base sm:text-lg mb-10">
          Manage your <span className="font-semibold text-blue-700">assignments</span>,
          <span className="font-semibold text-blue-700"> homework</span>, and 
          <span className="font-semibold text-blue-700"> tests</span> with our modern academic platform.
        </p>
      <div className="space-x-4">
        <button
          onClick={() => setShowSignup(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Sign Up
        </button>
        <button
          onClick={() => setShowLogin(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>

      {showLogin && <Login onClose={() => setShowLogin(false)} onSuccess={handleLoginSuccess} />}
      {showSignup && <Signup onClose={() => setShowSignup(false)} onSuccess={handleSignupSuccess} />}
    </div>
  );
};

export default Home;
