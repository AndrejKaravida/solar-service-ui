import { Box, Card, Divider, TextField, Typography } from "@mui/material";
import { getElectricBillFromKwhUsage } from "../utils/usageUtils";
import { Dispatch, useState } from "react";

interface IProps {
  kwhUsage: number;
  setKwhUsage: (bill: number) => void;
}

export const KwHUsage = (props: IProps) => {
  const [kwhUsageError, setKwhUsageError] = useState("");

  const changeKWHUsageHandler = (newKWHUsage: number) => {
    if (newKWHUsage < 0) {
      setErrorWithTimeOut(setKwhUsageError, "Usage must be greater than 0");

      return;
    } else {
      props.setKwhUsage(newKWHUsage);
    }
  };

  const setErrorWithTimeOut = (callback: Dispatch<string>, message: string) => {
    callback(message);
    setTimeout(() => {
      callback("");
    }, 3000);
  };

  return (
    <Card style={{ padding: "15px", height: "100%" }}>
      <Typography sx={{ textAlign: "center" }}>
        AVERAGE MONTHLY USAGE
      </Typography>
      <Divider />
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <TextField
          sx={{ my: "15px", width: "150px" }}
          label={"kWh"}
          type={"number"}
          value={props.kwhUsage}
          onChange={(e) => changeKWHUsageHandler(+e.target.value)}
        ></TextField>
        <Typography sx={{ fontSize: "20px", marginLeft: "15px" }}>
          kWh
        </Typography>
      </Box>
      <Typography sx={{ textAlign: "center", mb: "60px" }}>
        Your average monthly bill:{" "}
        <b>{getElectricBillFromKwhUsage(+props.kwhUsage)}$</b>{" "}
      </Typography>
      {kwhUsageError && (
        <Typography sx={{ color: "red", textAlign: "center" }}>
          {kwhUsageError}
        </Typography>
      )}
      <Typography sx={{ textAlign: "center", mt: "auto !important" }}>
        We use your kwH usage to make more precise saving estimations.
      </Typography>
    </Card>
  );
};
