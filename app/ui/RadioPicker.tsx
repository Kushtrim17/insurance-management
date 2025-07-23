import React from "react";
import RadioButtonOption from "./RadioButtonOption";

type RadioOption = {
  value: string | number;
  isDisabled?: boolean;
  label: string;
  description?: string;
};

type RadioPickerProps = {
  options: RadioOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  name: string;
};

const RadioPicker = ({ options, value, onChange, name }: RadioPickerProps) => {
  return (
    <div className="space-y-3">
      {options.map((option: RadioOption) => (
        <RadioButtonOption
          key={option.value}
          option={option}
          isSelected={value === option.value}
          name={name}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default RadioPicker;
