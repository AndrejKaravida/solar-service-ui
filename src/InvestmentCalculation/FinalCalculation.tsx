import { Col, Row } from "react-bootstrap";
import { Card, Typography } from "@mui/material";
import styles from "./FinalCalculation.module.css";
import {
  calculateElectricalUsageFor10Years,
  calculateInstallationPrice,
  getElectricBillFromKwhUsage,
} from "../utils/usageUtils";

interface IProps {
  numberOfPanels: number;
  solarPanelPrice: number;
  kWhUsage: number;
}

export const FinalCalculation = (props: IProps) => {
  const electricBill = getElectricBillFromKwhUsage(props.kWhUsage);

  const savings =
    +calculateElectricalUsageFor10Years(electricBill) -
    +calculateInstallationPrice(props.numberOfPanels, props.solarPanelPrice);

  const withoutSolar = calculateElectricalUsageFor10Years(electricBill);

  const cost = calculateInstallationPrice(
    props.numberOfPanels,
    props.solarPanelPrice
  );
  return (
    <Card sx={{ mt: "25px" }}>
      <Row>
        <Col>
          <Typography className={styles.upfrontCost}>$ {cost}</Typography>
          <Typography className={styles.costDescription}>
            Upfront cost
          </Typography>
        </Col>{" "}
        <Col>
          <Typography className={styles.costWithoutSolar}>
            $ {withoutSolar}
          </Typography>
          <Typography className={styles.costDescription}>
            10 years without solar
          </Typography>
        </Col>{" "}
        <Col>
          <Typography className={styles.costSavings}>$ {savings}</Typography>
          <Typography className={styles.costDescription}>
            Total 10-year savings
          </Typography>
        </Col>
      </Row>
    </Card>
  );
};
