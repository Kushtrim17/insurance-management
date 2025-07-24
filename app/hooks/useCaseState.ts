import { useEffect, useState } from "react";
import { getStateForGUID, saveStateForGUID } from "@/app/lib/localStorage";
import { Case } from "@/app/lib/case/types";

export function useCaseState(guid: string, caseData: Case) {
  const [serviceTypeId, setServiceTypeId] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // NOTE: Load from localStorage or server data
  useEffect(() => {
    const savedState = getStateForGUID(guid);
    if (savedState) {
      setServiceTypeId(savedState.serviceTypeId);
      setSelectedColor(savedState.selectedColor);
    } else {
      setServiceTypeId(caseData.serviceTypeId);
      setSelectedColor(null);
    }
  }, [guid, caseData.serviceTypeId]);

  // NOTE: Save to localStorage
  useEffect(() => {
    saveStateForGUID(guid, { serviceTypeId, selectedColor });
  }, [guid, serviceTypeId, selectedColor]);

  return { serviceTypeId, setServiceTypeId, selectedColor, setSelectedColor };
}
