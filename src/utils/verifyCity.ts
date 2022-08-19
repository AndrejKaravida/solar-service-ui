import axios from "axios";
import { toast } from "react-toastify";
import _upperFirst from "lodash/upperFirst";

export const verifyCity = async (city: string) => {
  const key = process.env.REACT_APP_WEATHER_API_KEY;
  const apiLink = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`;
  try {
    const response = await axios.get(apiLink);
    const cityExists = response.status === 200;
    if (cityExists) {
      if (response.data.location.country !== "Serbia") {
        toast.warning("Only cities in Serbia are supported.");
        return;
      }
      return _upperFirst(city);
    } else {
      toast.warning("Please enter valid city.");
      return "";
    }
  } catch (e) {
    toast.warning("Please enter valid city.");
    return "";
  }
};
