// import { IMeasurement } from "../Models/IMeasurement";
import { SolarAppAxios } from "./solar-app-axios";

// export const fetchCurrentProduction = async (city: string) => {
//   return await SolarAppAxios.get<IMeasurement>("solar/current/" + city);
// };

export const fetchProductionHistory = async (city: string) => {
  return await SolarAppAxios.get("solar/history/" + city);
};
