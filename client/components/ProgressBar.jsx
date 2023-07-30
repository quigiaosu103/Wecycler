import React from "react";

const ProgressBar = ({ value }) => {
  return (
    <progress className="w-full h-1 bg-gray-200 rounded-xl" 
    value={value} 
    max="100">
      {value}%
    </progress>
  );
};

export default ProgressBar;
