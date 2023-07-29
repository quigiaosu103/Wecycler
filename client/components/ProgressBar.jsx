import React from "react";

const ProgressBar = ({ value }) => {
  return (
    <progress className="w-full h-2 bg-gray-200 rounded-lg" 
    value={value} 
    max="100">
      {value}%
    </progress>
  );
};

export default ProgressBar;
