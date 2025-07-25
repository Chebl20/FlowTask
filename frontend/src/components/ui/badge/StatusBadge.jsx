import React from 'react';
import { Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { STATUS_CONFIG } from '../../../constants/taskConstants';

const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.PENDENTE;
  const Icon = config.icon === 'Clock' ? Clock : 
               config.icon === 'AlertCircle' ? AlertCircle : CheckCircle;

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
};

export default StatusBadge;