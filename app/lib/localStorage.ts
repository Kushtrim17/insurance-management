export type CaseLocalState = {
  serviceTypeId: number;
  selectedColor: string | null;
};

const getKey = (guid: string) => `case-state-${guid}`;

export function getStateForGUID(guid: string): CaseLocalState | null {
  try {
    const raw = localStorage.getItem(getKey(guid));
    if (!raw) return null;
    return JSON.parse(raw) as CaseLocalState;
  } catch {
    return null;
  }
}

export function saveStateForGUID(guid: string, state: CaseLocalState) {
  try {
    localStorage.setItem(getKey(guid), JSON.stringify(state));
  } catch {
    console.error("Failed to save state for GUID", guid);
  }
}

export function deleteStateForGUID(guid: string) {
  try {
    localStorage.removeItem(getKey(guid));
  } catch {
    console.error("Failed to delete state for GUID", guid);
  }
}
