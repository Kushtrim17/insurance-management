import { fetchCaseByGuid } from "@/app/lib/case/data";
import { notFound } from "next/navigation";
import { SERVICE_TYPES } from "../lib/utils/serviceOptions";
import ServiceOptions from "./service-options/page";
import Payment from "./payment/page";

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

    return <ServiceOptions caseData={caseData.data} />;
  } catch (error) {
    console.error("Failed to fetch case:", error);
    notFound();
  }
}
