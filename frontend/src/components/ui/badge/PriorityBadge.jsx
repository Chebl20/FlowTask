import React from 'react';
import { PRIORITY_CONFIG } from '../../../constants/taskConstants';

const PriorityBadge = ({ priority }) => {
  const config = PRIORITY_CONFIG[priority];
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
};

export default PriorityBadge;