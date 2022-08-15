import { ISolarPanel } from "./ISolarPanel";
import { IEnvironmentalImpact } from "./IEnvironmentalImpact";

export interface IInvestment {
  _id?: string;
  userId?: string;
  city: string;
  date: Date;
  roofSize: number;
  solarPanel: ISolarPanel;
  environmentalImpact: IEnvironmentalImpact;
  monthlyBillPrice: number;
}
