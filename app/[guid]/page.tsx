import { Caption, Container, Title, Section, Button } from "@/app/ui";
import { fetchCaseByGuid } from "@/app/lib/case/data";
import DeviceInformation from "./components/DeviceInformation";
import CustomerInformation from "./components/CustomerInformation";
import ProblemDescription from "./components/ProblemDescription";
import ServicePicker from "./components/ServicePicker";

const serviceOptions = [
  {
    value: "theft-lost",
    label: "Theft/Lost",
    description: "Report a stolen or lost device",
  },
  {
    value: "drop-off",
    label: "Drop-Off",
    description: "Drop off your device at a service center",
  },
  {
    value: "swap",
    label: "Swap",
    description: "Exchange your device for a replacement",
  },
];

type PageProps = {
  params: {
    guid: string;
  };
};
export default async function Page({ params }: PageProps) {
  const { guid } = params;
  const caseData = await fetchCaseByGuid(guid);

  return (
    <Container>
      <Title>Insurance Case Portal</Title>
      <Caption>Case #{caseData.data.caseNumber}</Caption>
      <br />

      <Section direction="inline">
        <DeviceInformation
          manufacturer={caseData.data.manufacturer.name}
          productData={caseData.data.productData}
        />
        <CustomerInformation consumer={caseData.data.consumer} />
      </Section>
      <br />

      <Section direction="row">
        <ProblemDescription
          problemText={caseData.data.productData.problemText}
        />
      </Section>
      <br />

      <Section direction="row">
        <ServicePicker options={serviceOptions} />
      </Section>

      <br />
      <Section direction="row" alignContents="center">
        <Button>Proceed to payment</Button>
      </Section>
    </Container>
  );
}
