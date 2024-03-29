import electricityPrices from "./electricity-prices.json";

export const getElectricBillFromKwhUsage = (kwHUsage: number): number => {
  const energySpentInGreenZone =
    electricityPrices.greenZoneMargin > kwHUsage
      ? kwHUsage
      : electricityPrices.greenZoneMargin;

  const energySpentInBlueZone =
    kwHUsage > electricityPrices.blueZoneMargin
      ? electricityPrices.blueZoneMargin - electricityPrices.greenZoneMargin
      : kwHUsage > electricityPrices.greenZoneMargin
      ? kwHUsage - electricityPrices.greenZoneMargin
      : 0;

  const energySpentInRedZone =
    kwHUsage > electricityPrices.blueZoneMargin
      ? kwHUsage - energySpentInBlueZone - energySpentInGreenZone
      : 0;

  const priceInRsD =
    energySpentInGreenZone * electricityPrices.greenZonePrice +
    energySpentInBlueZone * electricityPrices.blueZonePrice +
    energySpentInRedZone * electricityPrices.redZonePrice +
    electricityPrices.fixedPrice;

  return +(priceInRsD / electricityPrices.dollarCurrency).toFixed(0);
};

export const calculateGeneratedMoney = (generatedPower: number) => {
  return (
    (generatedPower * electricityPrices.averagePriceByKwh) /
    electricityPrices.dollarCurrency
  );
};

export const calculateInvestmentPowerInKwH = (
  numberOfPanels: number,
  hoursOfSunlight: number,
  solarPanelPower: number
) => {
  if (numberOfPanels === 0 || hoursOfSunlight === 0) {
    return 0;
  }
  const dailyWattHours = numberOfPanels * hoursOfSunlight * solarPanelPower;

  const monthlyWattHours = dailyWattHours * 30;

  return monthlyWattHours / 1000;
};

export const calculateInvestmentPowerInKw = (
  numberOfPanels: number,
  solarPanelPower: number
) => {
  if (numberOfPanels === 0) {
    return 0;
  }
  const powerInW = numberOfPanels * solarPanelPower;

  return powerInW / 1000;
};

export const calculateInstallationPrice = (
  numberOfPanels: number,
  solarPanelPrice: number
) => {
  if (numberOfPanels === 0) {
    return 0;
  }
  return (numberOfPanels * solarPanelPrice).toFixed(0);
};

export const calculateElectricalUsageFor10Years = (electricalBill: number) => {
  return (electricalBill * 12 * 10).toFixed(0);
};

export const calculateNumberOfPanelsNeeded = (
  solarPanelPower: number,
  kwhUsage: number,
  hoursOfSunlight: number
) => {
  if (hoursOfSunlight === 0) {
    return 0;
  }
  const dailyPower = hoursOfSunlight * solarPanelPower;

  const monthlyWattHours = kwhUsage * 1000;

  return Math.ceil(monthlyWattHours / dailyPower / 30);
};

export const calculatePayOff = (
  generatedMoney: number,
  investmentCost: number
) => {
  return Math.round((100 * generatedMoney) / investmentCost);
};
