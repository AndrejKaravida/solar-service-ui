import { SolarAppAxios } from "../axios/solar-app-axios";

export const getProductionHistory = async (investmentId: string) => {
  return await SolarAppAxios.get("production/history/" + investmentId);
};
