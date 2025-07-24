import { Caption, Container, Title, Section } from "@/app/ui";
import { swapStockLookup } from "@/app/lib/stock/stockLookup";
import { notFound } from "next/navigation";
import DeviceInformation from "@/app/[guid]/components/DeviceInformation";
import CustomerInformation from "@/app/[guid]/components/CustomerInformation";
import ProblemDescription from "@/app/[guid]/components/ProblemDescription";
import ServiceOptionsClient from "@/app/[guid]/components/ServiceOptionsClient";
import { Case } from "@/app/lib/case/types";

type PageProps = {
  caseData: Case;
  guid: string;
};

export default async function ServiceOptions({ caseData, guid }: PageProps) {
  try {
    const stockLookup = await swapStockLookup({
      brand: caseData.manufacturer.name,
      model: caseData.productData.model,
    });

    return (
      <Container>
        <Title>Insurance Case Portal</Title>
        <Caption>Case #{caseData.caseNumber}</Caption>
        <br />

        <Section direction="inline">
          <DeviceInformation
            manufacturer={caseData.manufacturer.name}
            productData={caseData.productData}
          />
          <CustomerInformation consumer={caseData.consumer} />
        </Section>

        <Section direction="row">
          <ProblemDescription problemText={caseData.productData.problemText} />
        </Section>

        <ServiceOptionsClient
          stockLookup={stockLookup}
          caseData={caseData}
          guid={guid}
        />
      </Container>
    );
  } catch (error) {
    console.error("Failed to fetch case:", error);
    notFound();
  }
}
