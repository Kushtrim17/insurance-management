import { XMLParser } from "fast-xml-parser";

export type SwapStockLookup = {
  status: boolean;
  colors: string[];
};

type SwapStockLookupProps = {
  brand: string;
  model: string;
};

export async function swapStockLookup({
  brand,
  model,
}: SwapStockLookupProps): Promise<SwapStockLookup> {
  const soapBody = `
    <x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/"
                xmlns:tem="http://tempuri.org/"
                xmlns:icp="http://schemas.datacontract.org/2004/07/ICPE_Internal_API_DLL">
      <x:Header/>
      <x:Body>
        <tem:SwapStockLookUpVer2>
          <tem:Credentials>
            <icp:Password>Test</icp:Password>
            <icp:SesamDb>Sesam31</icp:SesamDb>
            <icp:UserName>CloudUser</icp:UserName>
          </tem:Credentials>
          <tem:LookUpItem>
            <icp:Brand>${brand}</icp:Brand>
            <icp:Color></icp:Color>
            <icp:Model>${model}</icp:Model>
          </tem:LookUpItem>
        </tem:SwapStockLookUpVer2>
      </x:Body>
    </x:Envelope>
  `;

  const response = await fetch(
    "https://91756214-c8b7-4f77-9a62-1d35945632fe.mock.pstmn.io/API/Internal_API.svc/soap",
    {
      method: "POST",
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        SOAPAction: "http://tempuri.org/IInternal_API/SwapStockLookUpVer2",
      },
      body: soapBody,
    }
  );

  const xml = await response.text();
  const parser = new XMLParser({ ignoreAttributes: false });
  const json = parser.parse(xml);

  // Navigate the JSON to get the available colors and status
  try {
    const result =
      json["s:Envelope"]["s:Body"]["SwapStockLookUpVer2Response"][
        "SwapStockLookUpVer2Result"
      ];
    const status = result.status === "true";
    const availableItems =
      result.AvailableItems?.["WS_API_.SwapStockAvailableItemV2"];
    // availableItems can be an array or a single object
    const colors = Array.isArray(availableItems)
      ? availableItems.map((item) => item.Color)
      : availableItems
      ? [availableItems.Color]
      : [];
    return { status, colors };
  } catch (e) {
    throw new Error("Failed to parse SOAP response");
  }
}
