"use client";

import React, { useState } from "react";
import RadioPicker from "@/app/ui/RadioPicker";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/ui/Card";

type ServiceOption = {
  value: string;
  label: string;
  description: string;
};

type ServicePickerProps = {
  options: ServiceOption[];
};

const ServicePicker = ({ options }: ServicePickerProps) => {
  const [selectedService, setSelectedService] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Option</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioPicker
          options={options}
          value={selectedService}
          onChange={setSelectedService}
          name="service-option"
        />
      </CardContent>
    </Card>
  );
};

export default ServicePicker;
