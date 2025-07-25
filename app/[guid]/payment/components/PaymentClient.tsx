"use client";

import { useCaseState } from "@/app/hooks/useCaseState";
import { Case } from "@/app/lib/case/types";
import { getServiceOptionLabel } from "@/app/lib/utils/serviceOptions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  RadioPicker,
  Section,
} from "@/app/ui";
import { useState } from "react";
import { PAYMENT_METHODS, PaymentMethodKey } from "../types";
import BankPayment from "./BankPayment";
import SwishPayment from "./SwishPayment";

type PaymentClientProps = {
  guid: string;
  serviceCase: Case;
};

export default function PaymentClient({
  guid,
  serviceCase,
}: PaymentClientProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodKey>(
    PaymentMethodKey.BANK_CARD
  );
  const { serviceTypeId } = useCaseState(guid, serviceCase);
  const { manufacturer, productData } = serviceCase;
  const serviceOptionLabel = getServiceOptionLabel(serviceTypeId);

  return (
    <>
      <Section direction="row">
        <Card>
          <CardHeader>
            <CardTitle>Service details</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <b>
                {manufacturer.name} {productData.model}
              </b>
            </p>
            <p>IMEI: {serviceCase.productData.imei}</p>
            <p>Service: {serviceOptionLabel}</p>
          </CardContent>
        </Card>
      </Section>
      <Card>
        <CardHeader>
          <CardTitle>Payment</CardTitle>
          <p>
            Please select the payment method and enter the required information.
          </p>
        </CardHeader>
        <CardContent>
          <RadioPicker
            name="payment-method"
            options={PAYMENT_METHODS}
            value={paymentMethod}
            onChange={(newPaymentMethod) =>
              setPaymentMethod(newPaymentMethod as PaymentMethodKey)
            }
            inline
          />

          {paymentMethod === PaymentMethodKey.BANK_CARD ? (
            <BankPayment
              onPay={() => {
                console.log("Paying with bank card");
              }}
            />
          ) : (
            <SwishPayment />
          )}
        </CardContent>
      </Card>
    </>
  );
}
