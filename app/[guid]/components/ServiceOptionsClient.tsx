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
import { useCanProceedToPayment } from "@/app/hooks/useCanProceedToPayment";
import { useCaseState } from "@/app/hooks/useCaseState";

type ServiceOptionsClientProps = {
  stockLookup: {
    status: boolean;
    colors: string[];
  };
  caseData: Case;
  guid: string;
};

export default function ServiceOptionsClient({
  stockLookup,
  caseData,
  guid,
}: ServiceOptionsClientProps) {
  const { serviceTypeId, setServiceTypeId, selectedColor, setSelectedColor } =
    useCaseState(guid, caseData);

  const canProceedToPayment = useCanProceedToPayment(
    serviceTypeId,
    selectedColor
  );
  const hasColorOptionsAvailable = stockLookup.colors.length > 0;

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
