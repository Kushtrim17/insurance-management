import { Caption, Container, Title, Section, Button } from "@/app/ui";
import { swapStockLookup } from "@/app/lib/stock/stockLookup";
import { notFound } from "next/navigation";
import {
  getServiceOptions,
  SERVICE_TYPES,
} from "@/app/lib/utils/serviceOptions";
import DeviceInformation from "@/app/[guid]/components/DeviceInformation";
import CustomerInformation from "@/app/[guid]/components/CustomerInformation";
import ProblemDescription from "@/app/[guid]/components/ProblemDescription";
import ServiceAndColorPicker from "@/app/[guid]/components/ServicePicker";
import { Case } from "@/app/lib/case/types";

type PageProps = {
  caseData: Case;
};

export default async function ServiceOptions({ caseData }: PageProps) {
  try {
    const stockLookup = await swapStockLookup({
      brand: caseData.manufacturer.name,
      model: caseData.productData.model,
    });

    const hasColorOptions = stockLookup.colors.length > 0;

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

        <Section direction="row">
          <ServiceAndColorPicker
            options={getServiceOptions(
              hasColorOptions ? [] : [SERVICE_TYPES.SWAP]
            )}
            initialSelectedService={caseData.serviceTypeId}
            availableColors={stockLookup.colors}
          />
        </Section>

        <Section direction="row" alignContents="center">
          <Button>Proceed to payment</Button>
        </Section>
      </Container>
    );
  } catch (error) {
    console.error("Failed to fetch case:", error);
    notFound();
  }
}
