import { IInvestment } from "../Models/IInvestment";
import { Card, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getCurrentProduction } from "../services/production.service";
import { Col, ProgressBar, Row } from "react-bootstrap";
import { calculateGeneratedMoney, calculatePayOff } from "../utils/usageUtils";
import { getProductionHistory } from "../services/history.service";

interface IProps {
  investment: IInvestment;
}

export const InvestmentDetails = ({ investment }: IProps) => {
  const [currentProduction, setCurrentProduction] = useState(0);
  const [totalPayOff, setTotalPayoff] = useState(0);
  const [moneyGenerated, setMoneyGenerated] = useState("0");

  useEffect(() => {
    const getProduction = async () => {
      if (!investment._id) {
        return;
      }

      try {
        const result = await getCurrentProduction(investment._id);

        const production = result.data;

        if (production) {
          setCurrentProduction(production.power);
        }
      } catch (e) {
        console.log(e);
      }
    };

    const getMoneyGenerated = async () => {
      try {
        const response = await getProductionHistory(
          investment._id!,
          new Date(investment.date),
          new Date()
        );

        const averageProduction = response.data.map(
          (history) => history.average
        );

        const totalPowerGenerated = averageProduction.reduce(
          (a, b) => a + b,
          0
        );

        const generatedMoney = calculateGeneratedMoney(totalPowerGenerated);

        const payOff = calculatePayOff(generatedMoney, investment.cost);

        setTotalPayoff(payOff);
        setMoneyGenerated(generatedMoney.toFixed(2));
      } catch (e) {
        console.log(e);
      }
    };

    getProduction().then(() => {});
    getMoneyGenerated().then(() => {});
  }, [investment._id, investment.cost, investment.date]);

  return (
    <Card sx={{ p: "15px", height: "100%" }}>
      <Typography sx={{ textAlign: "center" }}>INVESTMENT DETAILS:</Typography>
      <Divider />
      <Typography sx={{ mt: "15px", fontSize: "18px" }}>
        Built date: <b>{new Date(investment.date).toLocaleDateString()}</b>
      </Typography>{" "}
      <Typography sx={{ mt: "15px", fontSize: "18px" }}>
        Current production: <b> {currentProduction} kW/h</b>
      </Typography>
      <Typography sx={{ mt: "15px", fontSize: "18px" }}>
        Investment cost:{" "}
        <b>
          {investment.cost} {" $"}
        </b>
      </Typography>
      <Typography sx={{ mt: "15px", fontSize: "18px" }}>
        Generated money: <b>{moneyGenerated} $</b>
      </Typography>
      <Typography sx={{ mt: "15px", fontSize: "18px" }}>Payoff:</Typography>
      <Row style={{ alignItems: "center" }}>
        <Col xs={9}>
          <ProgressBar now={totalPayOff} />
        </Col>
        <Col xs={3}>
          <Typography>
            <b>{`${totalPayOff} %`}</b>
          </Typography>
        </Col>
      </Row>
    </Card>
  );
};
