import React from "react";

const ProgressBar = ({ value , max}) => {
  return (
    <progress className="w-full h-1 bg-gray-200 rounded-xl" 
    value={value} 
    max={max}>
      {value}%
    </progress>
  );
};

export default ProgressBar;
