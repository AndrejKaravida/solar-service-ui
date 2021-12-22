import { SolarAppAxios } from "./solar-app-axios";

export const fetchCurrentProduction = async (city: string) => {
  return await SolarAppAxios.get("solar/current/" + city);
};

export const fetchProductionHistory = async (city: string) => {
  return await SolarAppAxios.get("solar/history/" + city);
};
