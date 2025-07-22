# Test Task for the Programmer

## 1. Overview

We have insurance cases accessible via our API. Each case has a `GUID`, and users can manage their case at the URL:

```
/{guid}
```

### Objective

Build a **full-stack** application that enables end-users to:

- View and manage their insurance repair case
- Choose a service option
- Complete a payment
- Resume where they left off after closing the app

---

## 2. Technical Environment & Constraints

**Framework & Runtime:**

- **Backend:** Node.js or Next.js
- **Frontend:** Next.js
- **UI/UX:** Tailwind CSS or Ant Design
- **Styling:** Any approach compatible with the chosen UI framework
- **API Communication:** Must support multiple third-party service calls (mock APIs provided)

---

## 3. Core User Flow & Screen Routing

### Entry Point

User opens:

```
/{guid}
```

### Fetch Case Data

**Endpoint:**

```
GET https://91756214-c8b7-4f77-9a62-1d35945632fe.mock.pstmn.io/api/v3/case?accessToken=testToken&guid={guid}
```

- **On success:** Case is loaded
- **On failure:** Show "Case not found" error

### Initial Routing Logic

Based on `case.data.serviceTypeId`:

| Service Type | ID  | Initial Screen        |
| ------------ | --- | --------------------- |
| THEFT_LOST   | 1   | Payment Screen        |
| DROP_OFF     | 2   | Service Option Screen |
| SWAP         | 3   | Service Option Screen |

Routing is also influenced by `partnerId`.

---

## 4. Screens

### Service Option Screen

Shown **only** for `DROP_OFF` and `SWAP` cases.

#### UI

Let the user pick from:

- Theft/Lost
- Drop-off
- Swap

#### Selection Logic

- Initial option is pre-selected from the case
- User can change the option

#### Special Logic for **Swap**

- Trigger **SOAP API call** to check availability
- Use `productData.model` from case object

**SOAP Request Details:** (See [Appendix B](#appendix-b-stock-lookup-soap-api))

- If no items available: Disable "Swap" option and show error
- If items available: Show color selector

🟢 **Proceed to Payment** becomes active after a valid selection.

---

### Payment Screen

#### Price Calculation (in SEK)

| Service Type | Price Formula          |
| ------------ | ---------------------- |
| THEFT_LOST   | `deductible`           |
| DROP_OFF     | `deductible`           |
| SWAP         | `deductible + deposit` |

#### Payment Methods

- **Bank Card**
- **Swish**

#### Mock Payment Forms

**Bank Card Form:**

- Card Number
- Expiry Date
- CVV

**Swish Form:**

- Phone Number

🟢 Bank card submissions **always succeed**

🔴 Swish submissions **always fail**

---

### Post-Payment / Final Screen

If payment is **successful**:

- Check for `redirectUrl` in case object
- If present → Redirect user
- Else → Show success message:

| Service Type | Success Message                                                                                       |
| ------------ | ----------------------------------------------------------------------------------------------------- |
| THEFT_LOST   | _"Theft-lost handling is completed successfully."_                                                    |
| DROP_OFF     | _"Drop-off handling is completed successfully."_                                                      |
| SWAP         | _"Swap handling is completed successfully. The replacement unit will be sent to [Customer Address]."_ |

If payment **fails** (Swish):

- Show error and return to Payment screen

---

## 5. State Persistence & Restoration

- Use `localStorage` or similar to persist state
- Persist:
  - Selected service option
  - Selected color (for Swap)
- Persisted state is:
  - **Browser-specific**
  - **No expiration required**
- Clear state on successful payment

---

## 6. Internationalization

- **Language:** English
- **Bonus:** Setup for i18n is encouraged but optional

---

## 7. Deliverables & Evaluation

- Submit via **public GitHub repository**
- **Deadline:** Flexible, can be discussed

---

## Appendix

### Appendix A: Sample Case JSON

```json
{
  "data": {
    "id": 2943749,
    "guid": "ea1d5e29-9e0d-4ff5-ae4c-197920a7def9",
    "partnerId": 1010,
    "productData": {
      "model": "iPhone 11 128GB"
    },
    "orderData": {
      "partnerSpecific": {
        "insuranceLtd": {
          "deductible": "3000",
          "deposit": "500",
          "redirectUrl": "https://www.google.com/"
        }
      }
    },
    "serviceTypeId": 2,
    "receiver": {
      "name": "Peter Testsen",
      "address": "Testvegen 36",
      "postalCode": "2840",
      "city": "Reinsvoll"
    },
    "manufacturer": {
      "name": "Apple"
    }
  }
}
```

---

### Appendix B: Stock Lookup SOAP API

**Endpoint:**

```
POST https://91756214-c8b7-4f77-9a62-1d35945632fe.mock.pstmn.io/API/Internal_API.svc/soap
```

**Headers:**

```http
Content-Type: text/xml; charset=utf-8
SOAPAction: http://tempuri.org/IInternal_API/SwapStockLookUpVer2
```

**Sample Request:**

```xml
<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/"
            xmlns:tem="http://tempuri.org/"
            xmlns:icp="http://schemas.datacontract.org/2004/07/ICPE_Internal_API_DLL">
  <x:Header/>
  <x:Body>
    <tem:SwapStockLookUpVer2>
      <tem:Credentials>
        <icp:Password>Test</icp:Password>
        <icp:SesamDb>Sesam31</icp:SesamDb>
        <icp:UserName>CloudUser</icp:UserName>
      </tem:Credentials>
      <tem:LookUpItem>
        <icp:Brand>Apple</icp:Brand>
        <icp:Color></icp:Color>
        <icp:Model>iPhone 11</icp:Model>
        <icp:StockName>GjensidigeSE</icp:StockName>
        <icp:Storage>128GB</icp:Storage>
      </tem:LookUpItem>
    </tem:SwapStockLookUpVer2>
  </x:Body>
</x:Envelope>
```

**Sample Success Response:**

```xml
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
  <s:Body>
    <SwapStockLookUpVer2Response xmlns="http://tempuri.org/">
      <SwapStockLookUpVer2Result xmlns:a="http://schemas.datacontract.org/2004/07/API_WebServer"
                                 xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
        <AvailableItems xmlns="http://schemas.datacontract.org/2004/07/ICPE_Internal_API_DLL">
          <WS_API_.SwapStockAvailableItemV2>
            <Color>White</Color>
          </WS_API_.SwapStockAvailableItemV2>
          <WS_API_.SwapStockAvailableItemV2>
            <Color>Red</Color>
          </WS_API_.SwapStockAvailableItemV2>
        </AvailableItems>
        <status>true</status>
      </SwapStockLookUpVer2Result>
    </SwapStockLookUpVer2Response>
  </s:Body>
</s:Envelope>
```

---

### Appendix C: Postman Collection

🧪 [Mock APIs & Postman Workspace](https://elcare.postman.co/workspace/Elcare-Nordic~d8fe81a0-04b6-41a4-857e-5cad0794420a/collection/385264-e7cc6313-7665-4f6d-8386-111491d52d1e?action=share&creator=385264&active-environment=385264-0e685e4a-4f09-4577-b87c-b19ab4ca44d7)
