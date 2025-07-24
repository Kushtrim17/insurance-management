import { useEffect, useState } from "react";
import { SERVICE_TYPES } from "@/app/lib/utils/serviceOptions";

export function useCanProceedToPayment(
  serviceTypeId: number,
  selectedColor: string | null
) {
  const [canProceedToPayment, setCanProceedToPayment] =
    useState<boolean>(false);

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

  return canProceedToPayment;
}
