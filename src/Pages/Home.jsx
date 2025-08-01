import React, { useEffect, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ModalWrapper from "../Components/ModalWrapper";
import NavBar from "../Components/NavBar";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // ⛔ Prevent background scroll when modal is open
  useEffect(() => {
    const body = document.body;
    if (showLogin || showSignup) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }

    return () => {
      body.style.overflow = "auto"; // Reset on unmount
    };
  }, [showLogin, showSignup]);

  const handleSignupSuccess = () => {
    setShowSignup(false);
    setShowLogin(true); // Open login modal after signup
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setShowSignup(false); // Close all modals
  };

  return (
    <>
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>

      <div
        className="relative min-h-screen pt-20 bg-gray-100 flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('https://wallpaperaccess.com/full/8152497.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-4xl font-bold mb-6">Welcome to the Portal</h1>
        <p className="text-gray-600 text-base sm:text-lg mb-10">
          Manage your <span className="font-semibold text-blue-700">assignments</span>,
          <span className="font-semibold text-blue-700"> homework</span>, and
          <span className="font-semibold text-blue-700"> tests</span> with our modern academic platform.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => {
              setShowSignup(true);
              setShowLogin(false);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Sign Up
          </button>
          <button
            onClick={() => {
              setShowLogin(true);
              setShowSignup(false);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </div>

        {showLogin && (
          <ModalWrapper onClose={() => setShowLogin(false)}>
            <Login onClose={() => setShowLogin(false)} onSuccess={handleLoginSuccess} />
          </ModalWrapper>
        )}

        {showSignup && (
          <ModalWrapper onClose={() => setShowSignup(false)}>
            <Signup onSuccess={handleSignupSuccess} />
          </ModalWrapper>
        )}
      </div>
    </>
  );
};

export default Home;
