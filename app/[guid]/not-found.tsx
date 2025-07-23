import Link from "next/link";
import { Container, Title, Section, Button } from "@/app/ui";

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Title>Case Not Found</Title>
        <p className="text-gray-600 dark:text-gray-400 mt-4 mb-8 max-w-md">
          Sorry, we could not find the insurance case you are looking for. The
          case may have been removed or the link might be incorrect.
        </p>

        <Section direction="row" alignContents="center">
          <Link href="/">
            <Button variant="primary">Return to Home</Button>
          </Link>
        </Section>
      </div>
    </Container>
  );
}
