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
        Investment cost: <b>{investment.price}$</b>
      </Typography>
      <Typography sx={{ mt: "15px", fontSize: "18px" }}>
        Current production: <b> {investment.currentProduction} kW/h</b>
      </Typography>
      <Typography sx={{ mt: "15px", fontSize: "18px" }}>
        Built date: <b>{investment.date.toLocaleDateString()}</b>
      </Typography>
      <Typography sx={{ mt: "15px", fontSize: "18px" }}>
        Total money saved: <b>{investment.moneySaved}$</b>
      </Typography>
    </Card>
  );
};
