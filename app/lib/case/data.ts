import { CaseResponse } from "./types";

const API_BASE_URL =
  "https://91756214-c8b7-4f77-9a62-1d35945632fe.mock.pstmn.io/api/v3";

export async function fetchCaseByGuid(
  guid: string,
  accessToken: string = "testToken"
): Promise<CaseResponse> {
  const url = `${API_BASE_URL}/case?accessToken=${accessToken}&guid=${guid}`;

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
