type MoneyProps = {
  amount: number;
  currency?: string;
  className?: string;
};

export default function Money({
  amount,
  currency = "SEK",
  className = "",
}: MoneyProps) {
  const formatMoney = (value: number, currencyCode: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <h2
      className={`text-4xl font-bold text-gray-900 dark:text-gray-100 ${className}`}
    >
      {formatMoney(amount, currency)}
    </h2>
  );
}
