export const greenZonePrice = 6.4; //rsd per kWh
export const blueZonePrice = 9.1; //rsd per kWh
export const redZonePrice = 19.2; //rsd per kWh

export const fixedPrice = 140; //rsd

export const greenZoneMargin = 350; // 0 - 350 kWh
export const blueZoneMargin = 1600; // 351 - 1600 kWh

const dollarCurrency = 118; //1 dollar = 118 rsd

export const getElectricBillFromKwhUsage = (kwHUsage: number) => {
  const energySpentInGreenZone =
    greenZoneMargin > kwHUsage ? kwHUsage : greenZoneMargin;

  const energySpentInBlueZone =
    kwHUsage > blueZoneMargin
      ? blueZoneMargin - greenZoneMargin
      : kwHUsage > greenZoneMargin
      ? kwHUsage - greenZoneMargin
      : 0;

  const energySpentInRedZone =
    kwHUsage > blueZoneMargin
      ? kwHUsage - energySpentInBlueZone - energySpentInGreenZone
      : 0;

  const priceInRsD =
    energySpentInGreenZone * greenZonePrice +
    energySpentInBlueZone * blueZonePrice +
    energySpentInRedZone * redZonePrice +
    fixedPrice;

  return priceInRsD / dollarCurrency;
};
