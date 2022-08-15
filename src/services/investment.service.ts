import { SolarAppAxios } from "../axios/solar-app-axios";
import { IInvestment } from "../Models/IInvestment";
import { AxiosResponse } from "axios";

export const getAllInvestments = async (): Promise<
  AxiosResponse<IInvestment[]>
> => {
  return await SolarAppAxios.get("investment");
};

export const getAllUserInvestments = async (): Promise<
  AxiosResponse<IInvestment[]>
> => {
  return await SolarAppAxios.get("investment/user");
};

export const makeNewInvestment = async (investment: IInvestment) => {
  return await SolarAppAxios.post("investment", investment);
};
