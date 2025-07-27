import { useEffect, useState } from "react";
import { getStateForGUID } from "@/app/lib/localStorage";
import { Case } from "@/app/lib/case/types";

export function useCaseState(guid: string, caseData: Case) {
  const [serviceTypeId, setServiceTypeId] = useState<number>(
    caseData.serviceTypeId ?? 0
  );
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

  return { serviceTypeId, setServiceTypeId, selectedColor, setSelectedColor };
}
