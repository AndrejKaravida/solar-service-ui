import { IInvestment } from "../Models/IInvestment";
import { Card, Divider, Typography } from "@mui/material";

interface IProps {
  investment: IInvestment;
}

export const InvestmentDetails = ({ investment }: IProps) => {
  return (
    <Card sx={{ p: "15px", height: "100%" }}>
      <Typography sx={{ textAlign: "center" }}>INVESTMENT DETAILS:</Typography>
      <Divider />
      <Typography sx={{ mt: "15px", fontSize: "18px" }}>
        Investment cost: <b>{investment.roofSize * 150}$</b>
      </Typography>
      <Typography sx={{ mt: "15px", fontSize: "18px" }}>
        Current production: <b> 128 kW/h</b>
      </Typography>
      <Typography sx={{ mt: "15px", fontSize: "18px" }}>
        Built date: <b>{investment.date}</b>
      </Typography>
      <Typography sx={{ mt: "15px", fontSize: "18px" }}>
        Total money saved: <b>2600 $</b>
      </Typography>
    </Card>
  );
};
