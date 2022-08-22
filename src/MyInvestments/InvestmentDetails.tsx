import { IInvestment } from "../Models/IInvestment";
import { Card, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getCurrentProduction } from "../services/production.service";

interface IProps {
  investment: IInvestment;
}

export const InvestmentDetails = ({ investment }: IProps) => {
  const [currentProduction, setCurrentProduction] = useState(0);

  useEffect(() => {
    const getProduction = async () => {
      if (!investment._id) {
        return;
      }

      try {
        const result = await getCurrentProduction(investment._id);

        const production = result.data;

        if (production) {
          console.log(production);
          // setCurrentProduction(production);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getProduction().then(() => {});
  }, [investment._id]);
  return (
    <Card sx={{ p: "15px", height: "100%" }}>
      <Typography sx={{ textAlign: "center" }}>INVESTMENT DETAILS:</Typography>
      <Divider />
      <Typography sx={{ mt: "15px", fontSize: "18px" }}>
        Investment cost:{" "}
        <b>
          {investment.cost} {" $"}
        </b>
      </Typography>
      <Typography sx={{ mt: "15px", fontSize: "18px" }}>
        Current production: <b> {currentProduction}</b>
      </Typography>
      <Typography sx={{ mt: "15px", fontSize: "18px" }}>
        Built date: <b>{new Date(investment.date).toLocaleDateString()}</b>
      </Typography>
      <Typography sx={{ mt: "15px", fontSize: "18px" }}>
        Total money saved:{" "}
        <b>
          {investment.moneySaved} {" $"}
        </b>
      </Typography>
    </Card>
  );
};
