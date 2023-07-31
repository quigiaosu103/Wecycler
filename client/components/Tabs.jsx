import React from 'react';

const Tab = ({ label, activeTab, onClick,className }) => {
  const isActive = activeTab === label;

  return (
    <button
      className={className}
      // {`px-4 py-2 rounded-lg text-2xl 
      // ${
      //   isActive ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
      // }
      // `}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
};

export default Tab;
