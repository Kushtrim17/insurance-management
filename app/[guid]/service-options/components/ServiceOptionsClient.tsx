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
import { SwapStockLookup } from "@/app/lib/stock/stockLookup";
import { useRouter } from "next/navigation";
import { getStateForGUID, saveStateForGUID } from "@/app/lib/localStorage";
import { useEffect } from "react";

type ServiceOptionsClientProps = {
  stockLookup: SwapStockLookup;
  caseData: Case;
  guid: string;
};

export default function ServiceOptionsClient({
  stockLookup,
  caseData,
  guid,
}: ServiceOptionsClientProps) {
  const router = useRouter();
  const { serviceTypeId, setServiceTypeId, selectedColor, setSelectedColor } =
    useCaseState(guid, caseData);

  const canProceedToPayment = useCanProceedToPayment(
    serviceTypeId,
    selectedColor
  );
  const hasColorOptionsAvailable = stockLookup.colors.length > 0;

  const handleProceedToPayment = () => {
    router.push(`/${guid}/payment`);
  };

  const handleServiceTypeChange = (newServiceTypeId: number) => {
    setServiceTypeId(newServiceTypeId);
    saveStateForGUID(guid, { serviceTypeId: newServiceTypeId, selectedColor });
  };

  const handleColorChange = (newColor: string) => {
    setSelectedColor(newColor);
    saveStateForGUID(guid, { serviceTypeId, selectedColor: newColor });
  };

  useEffect(() => {
    //NOTE: use the saved state if it exists, otherwise use the case data
    const savedState = getStateForGUID(guid);
    saveStateForGUID(guid, {
      serviceTypeId: savedState?.serviceTypeId || serviceTypeId,
      selectedColor: savedState?.selectedColor || selectedColor,
    });
  }, [guid, serviceTypeId, selectedColor, setServiceTypeId]);

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
              onChange={(newService) =>
                handleServiceTypeChange(Number(newService))
              }
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
                onChange={(newValue) => handleColorChange(newValue as string)}
                name="color-option"
              />
            </CardContent>
          </Card>
        )}
      </Section>

      <Section direction="row" alignContents="center">
        <Button
          disabled={!canProceedToPayment}
          onClick={handleProceedToPayment}
        >
          Proceed to payment
        </Button>
      </Section>
    </>
  );
}
