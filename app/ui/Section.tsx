import React from "react";

type SectionProps = {
  children: React.ReactNode;
  direction?: "inline" | "row";
  alignContents?: "start" | "center" | "end";
  className?: string;
};

const Section = ({
  children,
  direction = "row",
  alignContents = "start",
  className = "",
}: SectionProps) => {
  const directionClasses = {
    inline: "flex flex-row gap-4",
    row: "flex flex-col space-y-4",
  };

  const alignmentClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
  };

  return (
    <section
      className={`${directionClasses[direction]} ${alignmentClasses[alignContents]} mb-6 ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;
