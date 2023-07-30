import React from 'react';

const TabContent = ({ children, activeTab, label }) => {
  if (activeTab !== label) return null;

  return (
    <div className=" p-4 rounded-b-lg">
      {children}
    </div>
  );
};

export default TabContent;
