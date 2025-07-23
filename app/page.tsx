import Link from "next/link";
import { Button, Section, Title } from "@/app/ui";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Section direction="row" alignContents="center">
          <Title>Go to a sample case</Title>
          <Link href="/1">
            <Button>Sample Case</Button>
          </Link>
        </Section>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <h1>Elcare assignment</h1>
      </footer>
    </div>
  );
}
