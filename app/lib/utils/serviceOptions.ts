export const SERVICE_TYPES = {
  THEFT_LOST: 1,
  DROP_OFF: 2,
  SWAP: 3,
} as const;

const SERVICE_OPTIONS = [
  {
    value: SERVICE_TYPES.THEFT_LOST,
    label: "Theft/Lost",
    isDisabled: false,
    description: "Report a stolen or lost device",
  },
  {
    value: SERVICE_TYPES.DROP_OFF,
    label: "Drop-Off",
    isDisabled: false,
    description: "Drop off your device at a service center",
  },
  {
    value: SERVICE_TYPES.SWAP,
    label: "Swap",
    isDisabled: false,
    description: "Exchange your device for a replacement",
  },
];

export const getServiceOptions = (disabledOptions: number[]) => {
  return SERVICE_OPTIONS.map((option) => ({
    ...option,
    isDisabled: disabledOptions.includes(option.value),
  }));
};
