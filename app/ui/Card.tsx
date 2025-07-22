import * as React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white text-gray-900 dark:border-gray-600 dark:bg-[#1c1c1e] dark:text-gray-100">
      {children}
    </div>
  );
};

const CardHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col space-y-1.5 p-6">{children}</div>;
};

const CardTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h3 className="text-2xl font-semibold leading-none tracking-tight">
      {children}
    </h3>
  );
};

const CardDescription = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-sm text-gray-600 dark:text-gray-400">{children}</p>;
};

const CardContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-6 pt-0">{children}</div>;
};

const CardFooter = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center p-6 pt-0">{children}</div>;
};

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
