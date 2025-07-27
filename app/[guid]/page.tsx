import { fetchCaseByGuid } from "@/app/lib/case/data";
import { notFound } from "next/navigation";
import ServiceOptions from "@/app/[guid]/service-options/page";

type PageProps = {
  params: {
    guid: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { guid } = await params;

  try {
    const caseData = await fetchCaseByGuid(guid);
    return <ServiceOptions caseData={caseData.data} guid={guid} />;
  } catch (error) {
    console.error("Failed to fetch case:", error);
    notFound();
  }
}
