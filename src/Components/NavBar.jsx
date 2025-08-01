import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

const NavBar = ({ studentName }) => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <nav className="bg-zinc-900 text-white p-4 flex justify-between items-center relative ">
      {/* Left: Brand name */}
      <Link to="/">
        <h3 className="text-xl font-bold cursor-pointer">Learnez.com</h3>
      </Link>
      {/* Right: User Info and Logout */}
      <div className="flex items-center gap-4">
        <span className="mr-2">Hi, {user?.displayName || studentName || 'Student'}</span>

        {/* Profile Image */}
        <div className="relative">
          <img
            src={user?.photoURL || "https://i.pravatar.cc/40"}
            alt="User"
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
            onClick={() => setShowDropdown(!showDropdown)}
          />

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg p-4 z-10">
              <p><strong>Name:</strong> {user?.displayName || studentName || 'N/A'}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Role:</strong> Student</p>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
