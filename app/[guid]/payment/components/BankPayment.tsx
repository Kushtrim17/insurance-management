import { useEffect, useState } from "react";
import { Button, Input, Section } from "@/app/ui";
import { BankValues, BankErrors } from "@/app/[guid]/payment/types";
import ErrorMessage from "./ErrorMessage";

type BankPaymentProps = {
  onPay: () => void;
};

export default function BankPayment({ onPay }: BankPaymentProps) {
  const [areBankValuesValid, setAreBankValuesValid] = useState(false);

  const [values, setValues] = useState<BankValues>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<BankErrors>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    const someValuesAreEmpty = Object.values(values).some(
      (value) => value === ""
    );

    if (someValuesAreEmpty) {
      setAreBankValuesValid(false);
      return;
    }

    const hasErrors = Object.values(errors).some((error) => error !== "");
    setAreBankValuesValid(!hasErrors);
  }, [values, errors]);

  return (
    <Section direction="row" className="mt-4">
      <div className="mt-4 space-y-4 max-w-xs">
        <div>
          <Input
            value={values.cardNumber}
            onChange={(value: string, error?: string) => {
              setErrors({ ...errors, cardNumber: error || "" });
              setValues({ ...values, cardNumber: value });
            }}
            placeholder="Card number"
            minLength={16}
            maxLength={16}
            inputMode="numeric"
            pattern="[0-9]*"
            onlyNumbers
          />
          {errors.cardNumber && <ErrorMessage error={errors.cardNumber} />}
        </div>
        <div className="flex gap-4">
          <div>
            <Input
              value={values.expiryDate}
              onChange={(value: string, error?: string) => {
                setErrors({ ...errors, expiryDate: error || "" });
                setValues({ ...values, expiryDate: value });
              }}
              placeholder="Expiry date"
              minLength={7}
              maxLength={7}
              inputMode="numeric"
              pattern="[0-9]*"
              type="month"
            />
            {errors.expiryDate && <ErrorMessage error={errors.expiryDate} />}
          </div>
          <div>
            <Input
              value={values.cvv}
              onChange={(value: string, error?: string) => {
                setErrors({ ...errors, cvv: error || "" });
                setValues({ ...values, cvv: value });
              }}
              placeholder="CVV"
              minLength={3}
              maxLength={3}
              inputMode="numeric"
              pattern="[0-9]*"
              onlyNumbers
            />
            {errors.cvv && <ErrorMessage error={errors.cvv} />}
          </div>
        </div>
        <Button disabled={!areBankValuesValid} onClick={onPay}>
          Pay
        </Button>
      </div>
    </Section>
  );
}
