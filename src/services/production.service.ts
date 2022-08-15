import { SolarAppAxios } from "../axios/solar-app-axios";

export const getCurrentProduction = async (investmentId: string) => {
  return await SolarAppAxios.get("production/current/" + investmentId);
};
