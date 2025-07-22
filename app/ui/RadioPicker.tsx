import React from "react";

type RadioOption = {
  value: string;
  label: string;
  description?: string;
};

type RadioPickerProps = {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
};

const RadioPicker = ({ options, value, onChange, name }: RadioPickerProps) => {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-800 ${
            value === option.value
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400"
              : "border-gray-200 dark:border-gray-600"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <div className="flex-1">
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {option.label}
            </div>
            {option.description && (
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {option.description}
              </div>
            )}
          </div>
        </label>
      ))}
    </div>
  );
};

export default RadioPicker;
