import { SolarAppAxios } from "../axios/solar-app-axios";

export const getProductionHistory = async (
  investmentId: string,
  startDate: string,
  endDate: string
) => {
  return await SolarAppAxios.get(
    `/history/${investmentId}/${startDate}/${endDate}`
  );
};
