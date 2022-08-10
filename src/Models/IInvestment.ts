import { IProductionHistory } from "./IProductionHistory";
import { IEnvironmentalImpact } from "./IEnvironmentalImpact";

export interface IInvestment {
  userId: string;
  address: string;
  price: number;
  date: Date;
  moneySaved: number;
  kwhGenerated: number;
  currentProduction: number;
  productionHistory: IProductionHistory[];
  roofSize: number;
  monthlyBillPrice: number;
  environmentalImpact: IEnvironmentalImpact;
}
