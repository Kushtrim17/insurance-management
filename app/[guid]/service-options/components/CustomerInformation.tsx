import { Consumer } from "@/app/lib/case/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/ui/Card";

type CustomerInformationProps = {
  consumer: Consumer;
};

export default function CustomerInformation({
  consumer,
}: CustomerInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <b>{consumer.name}</b>
        </p>
        <p>{consumer.email}</p>
      </CardContent>
    </Card>
  );
}
