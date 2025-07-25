import { Card, CardContent, CardHeader, CardTitle } from "@/app/ui/Card";

type ProblemDescriptionProps = {
  problemText: string;
};

export default function ProblemDescription({
  problemText,
}: ProblemDescriptionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Problem</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{problemText}</p>
      </CardContent>
    </Card>
  );
}
