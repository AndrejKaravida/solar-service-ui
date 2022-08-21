import { Divider, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import {
  calculateElectricalUsageFor10Years,
  calculateInstallationPrice,
  calculateInvestmentPowerInKw,
  calculateInvestmentPowerInKwH,
  getElectricBillFromKwhUsage,
} from "../utils/usageUtils";
import { Col, Row } from "react-bootstrap";
import styles from "./TotalCalculation.module.css";

interface IProps {
  solarPanelPower: number;
  solarPanelPrice: number;
  kWhUsage: number;
  numberOfPanels: number;
  hoursOfSunlight: number;
}

export const TotalCalculation = (props: IProps) => {
  const electricBill = getElectricBillFromKwhUsage(props.kWhUsage);
  const investmentPowerInKwH = calculateInvestmentPowerInKwH(
    props.numberOfPanels,
    props.hoursOfSunlight,
    props.solarPanelPower
  );

  const investmentPowerInKW = calculateInvestmentPowerInKw(
    props.numberOfPanels,
    props.solarPanelPower
  );

  return (
    <Card
      style={{ padding: "35px", backgroundColor: "#90EE90", height: "100%" }}
    >
      <Row style={{ marginBottom: "30px" }}>
        <Col>
          <Typography className={styles.estimateCost}>
            Up-front cost of installation
          </Typography>
          <Typography className={styles.estimateDescription}>
            Based on {investmentPowerInKW} kW installation.{" "}
          </Typography>
        </Col>
        <Col>
          <Typography className={styles.estimatePrice}>
            ${" "}
            {calculateInstallationPrice(
              props.numberOfPanels,
              props.solarPanelPrice
            )}
          </Typography>
        </Col>
      </Row>
      <Row style={{ marginBottom: "30px" }}>
        <Col>
          <Typography className={styles.estimateCost}>
            Total payments over 10 years
          </Typography>
          <Typography className={styles.estimateDescription}>
            Modern solar arrays use micro-inverters and should require no
            maintenance during their first 10 years.
          </Typography>
        </Col>
        <Col>
          <Typography className={styles.estimatePrice}>${" 0"}</Typography>
        </Col>
      </Row>
      <Divider></Divider>
      <Row style={{ marginBottom: "30px" }}>
        <Col>
          <Typography className={styles.estimateCost}>
            Total 10-year cost with solar
          </Typography>
          <Typography className={styles.estimateDescription}>
            Includes above costs.
          </Typography>
        </Col>
        <Col>
          <Typography className={styles.estimatePrice}>
            ${" "}
            {calculateInstallationPrice(
              props.numberOfPanels,
              props.solarPanelPrice
            )}
          </Typography>
        </Col>
      </Row>{" "}
      <Row style={{ marginBottom: "30px" }}>
        <Col>
          <Typography className={styles.estimateCost}>
            Total 10-year cost without solar
          </Typography>
          <Typography className={styles.estimateDescription}>
            Assumes only electrical prices.
          </Typography>
        </Col>
        <Col>
          <Typography className={styles.estimatePrice}>
            $ {calculateElectricalUsageFor10Years(electricBill)}
          </Typography>
        </Col>
      </Row>
      <Divider></Divider>
      <Row style={{ marginBottom: "30px" }}>
        <Col>
          <Typography className={styles.estimateCost}>
            Total 10-year savings:
          </Typography>
          <Typography className={styles.estimateDescription}>
            Net value.
          </Typography>
        </Col>
        <Col>
          <Typography className={styles.estimatePrice}>
            ${" "}
            {+calculateElectricalUsageFor10Years(electricBill) -
              +calculateInstallationPrice(
                props.numberOfPanels,
                props.solarPanelPrice
              )}
          </Typography>
        </Col>
      </Row>
    </Card>
  );
};
