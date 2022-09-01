import { SolarAppAxios } from "../axios/solar-app-axios";
import { IHistory } from "../Models/IHistory";

export const getProductionHistory = async (
  investmentId: string,
  startDate: Date,
  endDate: Date
) => {
  return await SolarAppAxios.post<IHistory[]>(`/history`, {
    investmentId,
    startDate,
    endDate,
  });
};
