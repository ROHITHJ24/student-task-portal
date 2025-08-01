import React from 'react';
import { useLocation } from 'react-router-dom';
import DashboardHeader from '../Components/DashboardHeader';
import OverviewCards from '../Components/OverviewCards';
import TaskTable from '../Components/TaskTable';

const StudentDashboard = () => {
  const location = useLocation();
  const studentName = location.state?.name || "Student";

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <DashboardHeader studentName={studentName} />
      <OverviewCards />
      <TaskTable />
    </div>
  );
};

export default StudentDashboard;
