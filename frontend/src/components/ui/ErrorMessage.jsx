import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-start">
        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-red-700">{message}</p>
          {onRetry && (
            <button 
              onClick={onRetry}
              className="mt-2 text-sm text-red-600 underline hover:no-underline"
            >
              Tentar novamente
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;