import {
  Accordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  styled,
  Typography,
} from "@mui/material";
import { IInvestment } from "../Models/IInvestment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Col, Row } from "react-bootstrap";
import { HistoryChart } from "./HistoryChart";
import { InvestmentEnvironmentalImpact } from "./InvestmentEnvironmentalImpact";
import { InvestmentDetails } from "./InvestmentDetails";
import { SyntheticEvent } from "react";

interface IProps {
  investment: IInvestment;
  isOpen: boolean;
  number: number;
  onChange: (event: SyntheticEvent, expanded: boolean) => void;
}

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  backgroundColor: "rgba(210, 229, 243, 0.80)",
}));

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  backgroundColor: "rgba(94, 163, 212, 0.6)",
}));

export const Investment = (props: IProps) => {
  return (
    <Accordion expanded={props.isOpen} onChange={props.onChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ ml: "auto", mr: "auto", fontSize: "18px" }}>
          Investment No. {props.number} in <b>{props.investment.address}</b>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Row style={{ marginTop: "20px" }}>
          <Col xs={3}>
            <InvestmentDetails investment={props.investment} />
          </Col>

          <Col xs={6}>
            <HistoryChart />
          </Col>

          <Col xs={3}>
            <InvestmentEnvironmentalImpact
              environmentalImpact={props.investment.environmentalImpact}
            />
          </Col>
        </Row>
      </AccordionDetails>
    </Accordion>
  );
};
