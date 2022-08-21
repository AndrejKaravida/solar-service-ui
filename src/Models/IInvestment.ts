import { ISolarPanel } from "./ISolarPanel";
import { IEnvironmentalImpact } from "./IEnvironmentalImpact";
import { ICity } from "./ICity";
import { IUser } from "./IUser";

export interface IInvestment {
  _id?: string;
  user: IUser;
  city: ICity;
  date: Date;
  numberOfPanels: number;
  power: number;
  cost: number;
  moneySaved: number;
  solarPanel: ISolarPanel;
  environmentalImpact: IEnvironmentalImpact;
  monthlyBillPrice: number;
}
