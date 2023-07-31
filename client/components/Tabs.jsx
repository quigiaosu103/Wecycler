import React from 'react';

const Tab = ({ label, activeTab, onClick }) => {
  const isActive = activeTab === label;

  return (
    <button
      className={`px-4 py-2 rounded-lg ${
        isActive ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
      }`}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
};

export default Tab;
