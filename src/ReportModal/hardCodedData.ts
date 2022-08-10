import { IEnvironmentalImpact } from "../Models/IEnvironmentalImpact";
import { IInvestment } from "../Models/IInvestment";

export const environmentalImpact1: IEnvironmentalImpact = {
  carbonDioxide: "2.5",
  passengerCars: "1",
  treeSeedlings: "18",
};

export const environmentalImpact2: IEnvironmentalImpact = {
  carbonDioxide: "3.5",
  passengerCars: "2",
  treeSeedlings: "58",
};

export const investments: IInvestment[] = [
  {
    userId: "1",
    address: "Bulevar Oslobodjenja 53, Novi Sad",
    price: 10000,
    date: new Date(),
    moneySaved: 566,
    kwhGenerated: 145,
    currentProduction: 18,
    environmentalImpact: environmentalImpact1,
    roofSize: 50,
    monthlyBillPrice: 30,
    productionHistory: [
      {
        date: new Date(),
        min: 28,
        max: 92,
        average: 50,
      },
      {
        date: new Date(),
        min: 26,
        max: 89,
        average: 48,
      },
    ],
  },
  {
    userId: "1",
    address: "Ustanicka 18, Belgrade",
    price: 18000,
    date: new Date(),
    moneySaved: 1566,
    kwhGenerated: 1445,
    environmentalImpact: environmentalImpact2,
    currentProduction: 18,
    roofSize: 70,
    monthlyBillPrice: 50,
    productionHistory: [
      {
        date: new Date(),
        min: 28,
        max: 92,
        average: 50,
      },
      {
        date: new Date(),
        min: 26,
        max: 89,
        average: 48,
      },
    ],
  },
];
