import { Button, Input, Section } from "@/app/ui";
import { useEffect, useState } from "react";
import { SwishErrors, SwishValues } from "../types";
import ErrorMessage from "./ErrorMessage";

type SwishPaymentProps = {
  onPay: () => void;
};

export default function SwishPayment({ onPay }: SwishPaymentProps) {
  const [values, setValues] = useState<SwishValues>({
    phoneNumber: "",
  });

  const [errors, setErrors] = useState<SwishErrors>({
    phoneNumber: "",
  });

  const [areSwishValuesValid, setAreSwishValuesValid] = useState(false);

  useEffect(() => {
    const phoneNumberIsEmpty = values.phoneNumber === "";

    if (phoneNumberIsEmpty) {
      setAreSwishValuesValid(false);
      return;
    }

    const hasErrors = Object.values(errors).some((error) => error !== "");
    setAreSwishValuesValid(!hasErrors);
  }, [values, errors]);

  return (
    <Section direction="row" className="mt-4">
      <div className="mt-4 space-y-4 max-w-xs">
        <div>
          <Input
            value={values.phoneNumber}
            onChange={(value: string, error?: string) => {
              setErrors({ ...errors, phoneNumber: error || "" });
              setValues({ ...values, phoneNumber: value });
            }}
            placeholder="Phone number"
            maxLength={13}
            inputMode="numeric"
            pattern="[0-9]*"
            onlyNumbers
          />
          {errors.phoneNumber && <ErrorMessage error={errors.phoneNumber} />}
        </div>
        <Button disabled={!areSwishValuesValid} onClick={onPay}>
          Pay
        </Button>
      </div>
    </Section>
  );
}
