import { Case } from "@/app/lib/case/types";

type PageProps = {
  caseData: Case;
};

export default function Payment({ caseData }: PageProps) {
  console.log({ caseData });

  return <div>Payment Page</div>;
}
