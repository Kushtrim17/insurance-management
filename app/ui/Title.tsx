type Props = {
  children: React.ReactNode;
};

export default function Title({ children }: Props) {
  return (
    <h1 className="text-2xl font-semibold leading-none tracking-tight">
      {children}
    </h1>
  );
}
