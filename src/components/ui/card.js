import React from 'react';

export const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
    {children}
  </div>
);

// MetricCard 수정: 색상 prop에 따라 배경색과 텍스트 색상을 동적으로 적용
export const MetricCard = ({ icon: Icon, title, value, color }) => {
  const colorClasses = {
    green: "bg-green-100 text-green-500",
    red: "bg-red-100 text-red-500",
    purple: "bg-purple-100 text-purple-500",
    orange: "bg-orange-100 text-orange-500",
    yellow: "bg-yellow-100 text-yellow-500",
    pink: "bg-pink-100 text-pink-500",
    blue: "bg-blue-100 text-blue-500",
    gray: "bg-gray-100 text-gray-500",
  };

  return (
    <Card className="p-4">
      <div className="flex items-center space-x-4">
        {/* 색상 클래스 적용 */}
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full ${
            colorClasses[color] || colorClasses.gray
          }`}
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
};

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
