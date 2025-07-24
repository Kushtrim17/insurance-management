"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  RadioPicker,
  Section,
} from "@/app/ui";
import {
  getSelectableServiceOptions,
  SERVICE_TYPES,
} from "@/app/lib/utils/serviceOptions";
import { Case } from "@/app/lib/case/types";
import { useEffect, useState } from "react";

type ServiceOptionsClientProps = {
  stockLookup: {
    status: boolean;
    colors: string[];
  };
  caseData: Case;
};

export default function ServiceOptionsClient({
  stockLookup,
  caseData,
}: ServiceOptionsClientProps) {
  const [serviceTypeId, setServiceTypeId] = useState<number>(
    caseData.serviceTypeId
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [canProceedToPayment, setCanProceedToPayment] =
    useState<boolean>(false);
  const hasColorOptionsAvailable = stockLookup.colors.length > 0;

  useEffect(() => {
    switch (serviceTypeId) {
      case SERVICE_TYPES.THEFT_LOST:
      case SERVICE_TYPES.DROP_OFF:
        setCanProceedToPayment(true);
        break;
      case SERVICE_TYPES.SWAP:
        setCanProceedToPayment(selectedColor !== null);
        break;
      default:
        setCanProceedToPayment(false);
        break;
    }
  }, [serviceTypeId, selectedColor]);

  return (
    <>
      <Section direction="row">
        <Card>
          <CardHeader>
            <CardTitle>Service Option</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioPicker
              options={getSelectableServiceOptions(
                // NOTE: no color options available -> disable swap option
                hasColorOptionsAvailable ? [] : [SERVICE_TYPES.SWAP]
              )}
              value={serviceTypeId}
              onChange={(newService) => setServiceTypeId(Number(newService))}
              name="service-option"
            />
          </CardContent>
        </Card>
        <br />

        {serviceTypeId === SERVICE_TYPES.SWAP && (
          <Card>
            <CardHeader>
              <CardTitle>Pick the color</CardTitle>
              <p>Pick the color of the device to swap with</p>
            </CardHeader>
            <CardContent>
              <RadioPicker
                options={stockLookup.colors.map((color) => ({
                  value: color,
                  label: color,
                }))}
                value={selectedColor ?? ""}
                onChange={(newValue) => setSelectedColor(newValue as string)}
                name="color-option"
              />
            </CardContent>
          </Card>
        )}
      </Section>

      <Section direction="row" alignContents="center">
        <Button disabled={!canProceedToPayment}>Proceed to payment</Button>
      </Section>
    </>
  );
}
