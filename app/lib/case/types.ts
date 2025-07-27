export interface Address {
  id: number;
  name: string;
  firstName: string | null;
  lastName: string | null;
  organizationName: string | null;
  organizationNumber: string | null;
  addName: string | null;
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  phone: string;
  mobile: string;
  email: string;
  floor: string | null;
  entrance: string | null;
  doorCode: string | null;
  createdAt: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface ProductData {
  imei: string;
  model: string;
  problemText: string;
  insuranceNumber: string;
  insuranceCompany: string;
}

export interface PartnerSpecific {
  insuranceLtd: {
    deductible: number;
    deposit?: number;
    redirectUrl: string;
    serviceOption: string;
  };
}

export interface OrderData {
  refNo: string;
  consents: string[];
  hasLabel: boolean;
  bookingType: string;
  activityNumber: string;
  originatorType: string;
  partnerSpecific: PartnerSpecific;
  clientPostalCode: string;
  pickupDestination: string;
  returnDestination: string;
  integrationsFinished: boolean;
  serviceProviderExportStatus: boolean;
}

export interface ServiceTypeProperties {
  requireFiles: boolean;
  requirePurchaseDate: boolean;
  requireInsuranceNumber: boolean;
}

export interface ProductTypeProperties {
  requireImei: boolean;
  allowPassword: boolean;
}

export interface ServiceType {
  id: number;
  name: string;
  properties: ServiceTypeProperties;
  externalData: unknown | null;
}

export interface ProductType {
  id: number;
  name: string;
  properties: ProductTypeProperties;
  externalData: unknown | null;
}

export interface Manufacturer {
  id: number;
  name: string;
  externalData: unknown | null;
}

export interface ServiceLocation {
  id: number;
  name: string;
  externalData: unknown | null;
}

export interface ServiceProvider {
  id: number;
  name: string;
}

export interface ServicePartner {
  id: number;
  name: string;
}

export interface ServiceProviderDepartment {
  id: number;
  name: string;
}

export interface CaseStatus {
  id: number;
  key: string;
  servicePartnerKey: string;
  caseId: number;
  declaredAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface SparePart {
  [key: string]: unknown;
}

export enum ServiceTypeId {
  THEFT_LOST = 1,
  DROP_OFF = 2,
  SWAP = 3,
}

export interface Customer {
  id: number;
  name: string;
  firstName: string | null;
  lastName: string | null;
  organizationName: string;
  organizationNumber: string;
  addName: string | null;
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  phone: string;
  mobile: string;
  email: string;
  floor: string | null;
  entrance: string | null;
  doorCode: string | null;
  createdAt: string;
}

export interface Consumer {
  id: number;
  name: string;
  firstName: string | null;
  lastName: string | null;
  organizationName: string | null;
  organizationNumber: string | null;
  addName: string | null;
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  phone: string;
  mobile: string;
  email: string;
  floor: string | null;
  entrance: string | null;
  doorCode: string | null;
  createdAt: string;
}

export interface Case {
  id: number;
  country: string | null;
  caseNumber: string;
  guid: string;
  partnerId: number;
  serviceProviderId: number;
  serviceProviderDepartmentId: number;
  manufacturerId: number;
  currentStatus: string;
  productData: ProductData;
  orderData: OrderData;
  serviceTypeId: ServiceTypeId;
  serviceLocationId: number;
  productTypeId: number;
  createdAt: string;
  tags: Tag[];
  sender: Address;
  receiver: Address;
  customer: Consumer;
  consumer: Address;
  pickupDst: unknown | null;
  returnDst: unknown | null;
  serviceType: ServiceType;
  productType: ProductType;
  manufacturer: Manufacturer;
  serviceLocation: ServiceLocation;
  serviceProvider: ServiceProvider;
  servicePartner: ServicePartner;
  serviceProviderDepartment: ServiceProviderDepartment;
  logisticHub: unknown | null;
  caseStatuses: CaseStatus[];
  spareParts: SparePart[];
}

export interface CaseResponse {
  data: Case;
}

export type CaseStatusKey = "rec" | "istarted" | string;
export type BookingType = "companyToPrivate" | string;
export type OriginatorType = "helpdesk" | string;
