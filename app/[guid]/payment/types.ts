export enum PaymentMethodKey {
  BANK_CARD = "bank-card",
  SWISH = "swish",
}

export type PaymentMethod = {
  value: PaymentMethodKey;
  label: string;
};

export const PAYMENT_METHODS: PaymentMethod[] = [
  { value: PaymentMethodKey.BANK_CARD, label: "Bank Card" },
  { value: PaymentMethodKey.SWISH, label: "Swish" },
];

export type BankValues = {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

export type BankErrors = {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};
