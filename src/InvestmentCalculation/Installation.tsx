import { Box, Card, Divider, TextField, Typography } from "@mui/material";
import { Dispatch, useState } from "react";
import {
  calculateInvestmentPowerInKw,
  calculateInvestmentPowerInKwH,
} from "../utils/usageUtils";

interface IProps {
  numberOfPanels: number;
  hoursOfSunlight: number;
  solarPanelPower: number;
  setHoursOfSunlight: (hours: number) => void;
}

export const Installation = (props: IProps) => {
  const [hoursOfSunlightError, setHoursOfSunlightError] = useState("");

  const setErrorWithTimeOut = (callback: Dispatch<string>, message: string) => {
    callback(message);
    setTimeout(() => {
      callback("");
    }, 3000);
  };

  const hoursOfSunlightChangeHandler = (newHoursOfSunlight: number) => {
    if (newHoursOfSunlight < 0) {
      setErrorWithTimeOut(
        setHoursOfSunlightError,
        "Number of sunlight hours must be greater than 0"
      );
      return;
    }
    if (newHoursOfSunlight > 24) {
      setErrorWithTimeOut(
        setHoursOfSunlightError,
        "Number of sunlight hours must be lower than 24"
      );
      return;
    }

    props.setHoursOfSunlight(newHoursOfSunlight);
  };

  const installationSize = calculateInvestmentPowerInKw(
    props.numberOfPanels,
    props.solarPanelPower
  );

  const installationPower = calculateInvestmentPowerInKwH(
    props.numberOfPanels,
    props.hoursOfSunlight,
    props.solarPanelPower
  );

  return (
    <Card style={{ padding: "15px", height: "100%" }}>
      <Typography sx={{ textAlign: "center" }}>3. INSTALLATION</Typography>
      <Divider />

      <Box sx={{ display: "flex", alignItems: "center", ml: "20px" }}>
        <TextField
          sx={{ my: "15px", width: "120px" }}
          label={"Sunlight hours"}
          value={props.hoursOfSunlight}
          onChange={(e) => hoursOfSunlightChangeHandler(+e.target.value)}
        ></TextField>
        <Typography sx={{ fontSize: "20px", marginLeft: "15px" }}>
          hours per day
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: "40px",
            fontWeight: "300",
            color: "#757575",
            textAlign: "center",
          }}
        >
          {installationSize} kW / {installationPower} kWh
        </Typography>{" "}
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "300",
            color: "#757575",
            textAlign: "center",
          }}
        >
          {props.numberOfPanels} panels
        </Typography>
      </Box>
      <Typography sx={{ textAlign: "center" }}>
        We use your roof size to make appropriate installation size.
      </Typography>

      {hoursOfSunlightError && (
        <Typography sx={{ color: "red", textAlign: "center" }}>
          {hoursOfSunlightError}
        </Typography>
      )}
    </Card>
  );
};
