import { ProductData } from "@/app/lib/case/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/ui/Card";

type DeviceInformationProps = {
  manufacturer: string;
  productData: ProductData;
};

export default function DeviceInformation({
  manufacturer,
  productData,
}: DeviceInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Device</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <b>
            {manufacturer} {productData.model}
          </b>
        </p>
        <p>IMEI: {productData.imei}</p>
      </CardContent>
    </Card>
  );
}
