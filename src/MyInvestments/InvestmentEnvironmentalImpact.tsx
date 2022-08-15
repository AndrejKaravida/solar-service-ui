import { IEnvironmentalImpact } from "../Models/IEnvironmentalImpact";
import { Box, Card, Divider, Typography } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import {
  environmentalImpacts,
  getMetricByEnv,
} from "../ReportModal/impactUtils";

interface IProps {
  environmentalImpact: IEnvironmentalImpact;
}

export const InvestmentEnvironmentalImpact = (props: IProps) => {
  return (
    <Card style={{ padding: "15px", height: "100%" }}>
      <Typography sx={{ textAlign: "center" }}>
        ENVIRONMENTAL IMPACT:
      </Typography>
      <Divider />

      <Box style={{ marginTop: "15px" }}>
        {environmentalImpacts.map((impact, index) => (
          <Row style={{ marginTop: "30px" }} key={index}>
            <Col xs={4}>
              <img src={impact.image} alt={"impact" + index} />
            </Col>
            <Col xs={8}>
              <Typography sx={{ fontSize: "12px" }}>
                {impact.headlight}
              </Typography>
              <Typography sx={{ fontSize: "32px" }}>
                {getMetricByEnv(impact.headlight, props.environmentalImpact)}
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#757575" }}>
                {impact.description}
              </Typography>
            </Col>
          </Row>
        ))}
      </Box>
    </Card>
  );
};
