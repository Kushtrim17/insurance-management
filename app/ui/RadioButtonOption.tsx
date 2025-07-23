import React from "react";

type RadioOption = {
  value: string | number;
  isDisabled?: boolean;
  label: string;
  description?: string;
};

type RadioButtonOptionProps = {
  option: RadioOption;
  isSelected: boolean;
  name: string;
  onChange: (value: string | number) => void;
};

const getOptionClasses = (option: RadioOption, isSelected: boolean) => {
  const baseClasses =
    "flex items-start space-x-3 p-4 rounded-lg border transition-all";

  const stateClasses = option.isDisabled
    ? "cursor-not-allowed opacity-50"
    : "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800";

  const selectionClasses = isSelected
    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400"
    : "border-gray-200 dark:border-gray-600";

  return `${baseClasses} ${stateClasses} ${selectionClasses}`;
};

const RadioButtonOption = ({
  option,
  isSelected,
  name,
  onChange,
}: RadioButtonOptionProps) => {
  return (
    <label className={getOptionClasses(option, isSelected)}>
      <input
        type="radio"
        name={name}
        value={option.value}
        disabled={option.isDisabled}
        checked={isSelected}
        onChange={(e) => onChange(e.target.value as string | number)}
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
  );
};

export default RadioButtonOption;
