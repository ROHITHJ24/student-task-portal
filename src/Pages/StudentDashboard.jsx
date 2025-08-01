import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import OverviewCards from '../Components/OverviewCards';
import TaskTable from '../Components/TaskTable';

const StudentDashboard = () => {
  const location = useLocation();
  const studentName = location.state?.name || "Student";

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* NavBar with student name */}
      <NavBar studentName={studentName} />

      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Welcome, {studentName}</h1>
        <OverviewCards />
        <TaskTable />
      </div>
    </div>
  );
};

export default StudentDashboard;
