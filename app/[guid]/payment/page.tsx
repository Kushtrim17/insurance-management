import { fetchCaseByGuid } from "@/app/lib/case/data";
import { Caption, Container, Title } from "@/app/ui";
import PaymentClient from "@/app/[guid]/payment/components/PaymentClient";
import { notFound } from "next/navigation";

type PaymentProps = {
  params: {
    guid: string;
  };
};

export default async function Payment({ params }: PaymentProps) {
  const { guid } = await params;

  try {
    const caseData = await fetchCaseByGuid(guid);

    return (
      <Container>
        <Title>Payment</Title>
        <Caption>Case #{caseData.data.caseNumber}</Caption>
        <br />

        <PaymentClient guid={guid} serviceCase={caseData.data} />
      </Container>
    );
  } catch (error) {
    console.error("Failed to fetch case:", error);
    notFound();
  }
}
