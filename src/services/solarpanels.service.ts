import { SolarAppAxios } from "../axios/solar-app-axios";
import { AxiosResponse } from "axios";
import { ISolarPanel } from "../Models/ISolarPanel";

export const getAllPanels = async (): Promise<AxiosResponse<ISolarPanel[]>> => {
  return await SolarAppAxios.get("solarpanels");
};

export const addNewPanel = async (solarPanel: ISolarPanel) => {
  return await SolarAppAxios.post("solarpanels", solarPanel);
};
