import { fetchCaseByGuid } from "@/app/lib/case/data";
import { notFound } from "next/navigation";
import { SERVICE_TYPES } from "@/app/lib/utils/serviceOptions";
import ServiceOptions from "@/app/[guid]/service-options/page";
import Payment from "@/app/[guid]/payment/page";

type PageProps = {
  params: {
    guid: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { guid } = await params;

  try {
    const caseData = await fetchCaseByGuid(guid);

    if (caseData.data.serviceTypeId === SERVICE_TYPES.THEFT_LOST) {
      return <Payment caseData={caseData.data} />;
    }

    return <ServiceOptions caseData={caseData.data} guid={guid} />;
  } catch (error) {
    console.error("Failed to fetch case:", error);
    notFound();
  }
}
