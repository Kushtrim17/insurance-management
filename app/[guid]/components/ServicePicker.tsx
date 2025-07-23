"use client";

import React, { useState } from "react";
import RadioPicker from "@/app/ui/RadioPicker";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/ui/Card";

type ServiceOption = {
  value: number;
  label: string;
  isDisabled?: boolean;
  description: string;
};

type ServiceAndColorPickerProps = {
  options: ServiceOption[];
  availableColors: string[];
  initialSelectedService?: number;
  onServiceChange?: (serviceId: number) => void;
};

const ServiceAndColorPicker = ({
  options,
  availableColors,
  initialSelectedService,
  onServiceChange,
}: ServiceAndColorPickerProps) => {
  const [selectedService, setSelectedService] = useState<number>(
    initialSelectedService || options[0]?.value || 0
  );

  const [selectedColor, setSelectedColor] = useState<string>(
    availableColors[0] || ""
  );

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Service Option</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioPicker
            options={options}
            value={selectedService}
            onChange={(newValue) => setSelectedService(Number(newValue))}
            name="service-option"
          />
        </CardContent>
      </Card>
      <br />
      {selectedService === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Pick the color</CardTitle>
            <p>Pick the color of the device to swap with</p>
          </CardHeader>
          <CardContent>
            <RadioPicker
              options={availableColors.map((color) => ({
                value: color,
                label: color,
              }))}
              value={selectedColor}
              onChange={(newValue) => setSelectedColor(newValue as string)}
              name="color-option"
            />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ServiceAndColorPicker;
