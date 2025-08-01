import React from 'react';

const cardData = [
  { title: 'Total Tasks', count: 12, bg: 'bg-blue-500' },
  { title: 'Completed Tasks', count: 8, bg: 'bg-green-500' },
  { title: 'Pending Tasks', count: 4, bg: 'bg-yellow-500' },
  { title: 'Upcoming Tests', count: 2, bg: 'bg-purple-500' },
];

const OverviewCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`${card.bg} text-white p-6 rounded-xl shadow-md flex flex-col justify-between`}
        >
          <h3 className="text-lg font-medium">{card.title}</h3>
          <p className="text-3xl font-bold mt-2">{card.count}</p>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
