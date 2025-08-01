import React from "react";

const DashboardHeader = ({ name }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Welcome, {name} 👋
      </h1>
      <p className="text-sm text-gray-500">Today: {currentDate}</p>
    </div>
  );
};

export default DashboardHeader;
