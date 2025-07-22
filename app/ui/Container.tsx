type Props = {
  children: React.ReactNode;
};

export default function Container({ children }: Props) {
  return <div className="p-8 w-full h-full">{children}</div>;
}
