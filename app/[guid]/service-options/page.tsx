import { Caption, Container, Title, Section } from "@/app/ui";
import { swapStockLookup } from "@/app/lib/stock/stockLookup";
import { notFound } from "next/navigation";
import DeviceInformation from "@/app/[guid]/components/DeviceInformation";
import CustomerInformation from "@/app/[guid]/components/CustomerInformation";
import ProblemDescription from "@/app/[guid]/components/ProblemDescription";
import { Case } from "@/app/lib/case/types";
import ServiceOptionsClient from "../components/ServiceOptionsClient";

type PageProps = {
  caseData: Case;
};

export default async function ServiceOptions({ caseData }: PageProps) {
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

        <ServiceOptionsClient stockLookup={stockLookup} caseData={caseData} />
      </Container>
    );
  } catch (error) {
    console.error("Failed to fetch case:", error);
    notFound();
  }
}
