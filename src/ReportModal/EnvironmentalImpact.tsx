import { Card, Divider, Typography } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import { IEnvironmentalImpact } from "../Models/IEnvironmentalImpact";
import { environmentalImpacts, getMetric } from "./impactUtils";

interface IProps {
  environmentalImpact: IEnvironmentalImpact;
}

export const EnvironmentalImpact = (props: IProps) => {
  return (
    <Card style={{ padding: "15px" }}>
      <Typography sx={{ textAlign: "center" }}>
        POTENTIAL ENVIRONMENTAL IMPACT:
      </Typography>
      <Divider />

      <Row style={{ marginTop: "15px" }}>
        {environmentalImpacts.map((impact, index) => (
          <Col key={index}>
            <Row>
              <Col xs={4}>
                <img src={impact.image} alt={"impact" + index} />
              </Col>
              <Col xs={8}>
                <Typography sx={{ fontSize: "12px" }}>
                  {impact.headlight}
                </Typography>
                <Typography sx={{ fontSize: "32px" }}>
                  {getMetric(impact.headlight, props.environmentalImpact)}
                </Typography>
                <Typography sx={{ fontSize: "12px", color: "#757575" }}>
                  {impact.description}
                </Typography>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </Card>
  );
};
