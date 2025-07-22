type Props = {
  children: React.ReactNode;
};

export default function Caption({ children }: Props) {
  return <p className="text-muted-foreground opacity-70">{children}</p>;
}
