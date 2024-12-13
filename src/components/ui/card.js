import React from 'react';

export const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
    {children}
  </div>
);

export const MetricCard = ({ icon: Icon, title, value, color }) => (
  <Card className="p-4">
    <div className="flex items-center space-x-4">
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full bg-${color}-100 text-${color}-500`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        <p className="text-lg font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </Card>
);
export const CardHeader = ({ children, className = "" }) => (
  <div className={`border-b border-gray-200 pb-2 mb-4 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = "" }) => (
  <h2 className={`text-lg font-semibold text-gray-800 ${className}`}>
    {children}
  </h2>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={`text-sm text-gray-600 ${className}`}>
    {children}
  </div>
);