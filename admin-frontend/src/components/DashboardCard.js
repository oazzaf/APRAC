// src/components/DashboardCard.jsx

import React from 'react';

function DashboardCard({ title, value, icon, bgColor }) {
  return (
    <div className={`flex items-center p-4 rounded shadow ${bgColor}`}>
      <div className="p-3 rounded-full bg-white bg-opacity-20">
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="text-lg font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

export default DashboardCard;