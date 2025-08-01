import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // your firebase config
import NavBar from '../Components/NavBar';

const StudentProfile = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const docRef = doc(db, 'students', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setStudentData(docSnap.data());
        } else {
          console.log("No student data found!");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchStudentDetails();
  }, [user]);

  if (loading) return <p className="p-4">Loading profile...</p>;

  if (!studentData) return <p className="p-4 text-red-500">No profile data found.</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar studentName={studentData.name} />

      <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Student Profile</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>Name:</strong> <p>{studentData.name}</p>
          </div>
          <div>
            <strong>Email:</strong> <p>{studentData.email}</p>
          </div>
          <div>
            <strong>Department:</strong> <p>{studentData.department}</p>
          </div>
          <div>
            <strong>Year:</strong> <p>{studentData.year}</p>
          </div>
          <div>
            <strong>Roll Number:</strong> <p>{studentData.rollNumber}</p>
          </div>
          <div>
            <strong>Contact:</strong> <p>{studentData.contact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
