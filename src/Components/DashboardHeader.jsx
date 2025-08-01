import React from "react";

const DashboardHeader = ({ studentName }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="mb-6 bg-blue-500 rounded-xl p-4 text-white shadow-md">
      <h1 className="text-2xl font-bold text-center text-white">
        Welcome, {studentName} 👋
      </h1>
      <p className="text-xs text-center text-white">Today: {currentDate}</p>
    </div>
  );
};

export default DashboardHeader;
