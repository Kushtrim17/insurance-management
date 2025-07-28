"use client";

import { useCaseState } from "@/app/hooks/useCaseState";
import { Case, ServiceTypeId } from "@/app/lib/case/types";
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
import Money from "@/app/ui/Money";
import { deleteStateForGUID } from "@/app/lib/localStorage";
import { redirect } from "next/navigation";

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
  const { serviceTypeId, selectedColor } = useCaseState(guid, serviceCase);
  const { manufacturer, productData, orderData } = serviceCase;
  const { deductible, deposit, redirectUrl } =
    orderData.partnerSpecific.insuranceLtd;
  const serviceOptionLabel = getServiceOptionLabel(serviceTypeId);
  const [showPaymentSuccessMessage, setShowPaymentSuccessMessage] =
    useState(false);
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);

  const getPriceDescription = () => {
    if (serviceTypeId === ServiceTypeId.SWAP) {
      return "Deductible + Deposit";
    }

    return "Deductible";
  };

  const getTotalPrice = () => {
    if (serviceTypeId === ServiceTypeId.SWAP) {
      return deductible + (deposit ?? 0);
    }
    return deductible;
  };

  const getPaymentSuccessTitle = () => {
    if (paymentMethod === PaymentMethodKey.SWISH) {
      return "Payment failed";
    }

    return "Payment successful";
  };

  const getPaymentSuccessMessage = () => {
    if (paymentMethod === PaymentMethodKey.SWISH) {
      return "Swish payment failed. Please try again later.";
    }

    switch (serviceTypeId) {
      case ServiceTypeId.SWAP:
        return `Swap handling is completed successfully. The replacement unit will be sent to ${serviceCase.customer.address}`;
      case ServiceTypeId.THEFT_LOST:
        return "Theft-lost handling is completed successfully.";
      case ServiceTypeId.DROP_OFF:
        return "Drop-off handling is completed successfully.";
      default:
        return "Payment successful";
    }
  };

  const handlePay = (paymentMethod: PaymentMethodKey) => {
    setShowPaymentSuccessMessage(true);

    if (paymentMethod === PaymentMethodKey.BANK_CARD) {
      deleteStateForGUID(guid);
      setShowRedirectMessage(true);
      setTimeout(() => {
        // a few seconds so that the user can see the success message
        redirect(redirectUrl);
      }, 4000);
    }
  };

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
            {selectedColor && <p>Color: {selectedColor}</p>}
          </CardContent>
        </Card>
      </Section>
      <Section direction="row">
        <Card>
          <CardHeader>
            <CardTitle>Price</CardTitle>
            <p>{getPriceDescription()}</p>
          </CardHeader>
          <CardContent>
            <Money amount={getTotalPrice()} />
          </CardContent>
        </Card>
      </Section>
      {!showPaymentSuccessMessage && (
        <Card>
          <CardHeader>
            <CardTitle>Payment</CardTitle>
            <p>
              Please select the payment method and enter the required
              information.
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
                onPay={() => handlePay(PaymentMethodKey.BANK_CARD)}
              />
            ) : (
              <SwishPayment onPay={() => handlePay(PaymentMethodKey.SWISH)} />
            )}
          </CardContent>
        </Card>
      )}
      {showPaymentSuccessMessage && (
        <Card>
          <CardHeader>
            <CardTitle>{getPaymentSuccessTitle()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{getPaymentSuccessMessage()}</p>
            <br />
            {showRedirectMessage && <b>Redirecting....</b>}
          </CardContent>
        </Card>
      )}
    </>
  );
}
