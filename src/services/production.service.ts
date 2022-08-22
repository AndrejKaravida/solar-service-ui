import { SolarAppAxios } from "../axios/solar-app-axios";
import { IProduction } from "../Models/IProduction";
import { AxiosResponse } from "axios";

export const getCurrentProduction = async (
  investmentId: string
): Promise<AxiosResponse<IProduction>> => {
  return await SolarAppAxios.get("production/current/" + investmentId);
};
