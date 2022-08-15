import { Typography } from "@mui/material";
import Card from "@mui/material/Card";

interface IProps {
  solarPanelPower: number;
  solarPanelPrice: number;
  roofSize: string;
  electricBill: string;
}

export const TotalCalculation = ({
  roofSize,
  solarPanelPrice,
  solarPanelPower,
  electricBill,
}: IProps) => {
  const getInvestmentPower = (): number => {
    return (solarPanelPower * +roofSize) / 1000;
  };

  return (
    <Card
      style={{ padding: "15px", marginTop: "25px", backgroundColor: "#90EE90" }}
    >
      <Typography sx={{ textAlign: "center", mt: "10px" }}>
        Solar panel:{" "}
        <b>
          {solarPanelPower}W / {solarPanelPrice}$
        </b>{" "}
      </Typography>
      <Typography sx={{ textAlign: "center" }}>
        Number of panels: <b>{roofSize}</b>{" "}
      </Typography>{" "}
      <Typography sx={{ textAlign: "center" }}>
        Total investment power: <b>{getInvestmentPower()}kW</b>{" "}
      </Typography>
      <Typography
        sx={{
          fontSize: "18px",
          textAlign: "center",
          fontWeight: "500",
          mt: "20px",
        }}
      >
        Price: {roofSize} * {solarPanelPrice}$ = {+roofSize * solarPanelPrice}$
      </Typography>
      <Typography
        sx={{
          fontSize: "24px",
          textAlign: "center",
          fontWeight: "600",
          mt: "20px",
        }}
      >
        {20 * 12 * +electricBill - +roofSize * solarPanelPrice}$ savings
      </Typography>
      <Typography
        sx={{ fontSize: "14px", textAlign: "center", marginBottom: "30px" }}
      >
        Estimated net savings for your roof over 20 years
      </Typography>
    </Card>
  );
};
