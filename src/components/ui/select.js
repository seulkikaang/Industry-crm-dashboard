import React, { useState } from 'react';

export const Select = ({ children, onValueChange, defaultValue }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  // 선택 값 변경 및 드롭다운 닫기
  const handleChange = (value) => {
    console.log("Selected Value:", value); // 선택된 값 출력
    setSelectedValue(value);
    setIsOpen(false); // 드롭다운 닫기
    if (onValueChange) {
      onValueChange(value); // 부모 컴포넌트에 값 전달
    }
  };

  // 드롭다운 열림/닫힘 토글
  const toggleDropdown = () => {
    console.log("Dropdown Toggled:", !isOpen); // 드롭다운 상태 출력
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <SelectTrigger className="w-full" onClick={toggleDropdown}>
        <SelectValue placeholder="업종을 선택하세요" selectedValue={selectedValue} />
      </SelectTrigger>
      {isOpen && (
        <SelectContent>
          {React.Children.map(children, (child) =>
            React.cloneElement(child, { onChange: handleChange }) // onChange 전달
          )}
        </SelectContent>
      )}
    </div>
  );
};

export const SelectTrigger = ({ children, className, onClick }) => (
  <button
    className={`bg-gray-200 rounded-lg px-4 py-2 text-left w-full ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export const SelectContent = ({ children }) => (
  <div className="absolute z-50 mt-2 bg-white rounded-lg shadow-md" style={{ width: '400px' }}>
    {children}
  </div>
);

export const SelectItem = ({ value, children, onChange }) => (
  <div
    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
    onClick={() => {
      if (onChange) {
        onChange(value); // 선택 값 반영
      }
    }}
  >
    {children}
  </div>
);

export const SelectValue = ({ placeholder, selectedValue }) => (
  <span className="text-gray-700">{selectedValue || placeholder}</span>
);