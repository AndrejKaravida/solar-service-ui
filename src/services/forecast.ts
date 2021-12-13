import { SolarAppAxios } from "./solar-app-axios";

export const getForecastPrivate = async () => {
  return await SolarAppAxios.get("/forecast");
};
