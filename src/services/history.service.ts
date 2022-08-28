import { SolarAppAxios } from "../axios/solar-app-axios";

export const getProductionHistory = async (
  investmentId: string,
  startDate: Date,
  endDate: Date
) => {
  return await SolarAppAxios.post(`/history`, {
    investmentId,
    startDate,
    endDate,
  });
};
