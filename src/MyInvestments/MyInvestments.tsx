import { Container } from "react-bootstrap";
import { Investment } from "./Investment";
import { Box } from "@mui/material";
import { investments } from "../ReportModal/hardCodedData";
import { SyntheticEvent, useState } from "react";

export const MyInvestments = () => {
  const [accordionOpen, setAccordionOpen] = useState(0);

  const handleAccordionOpenClose = (
    event: SyntheticEvent,
    expanded: boolean,
    number: number
  ) => {
    if (!expanded) {
      setAccordionOpen(-1);
    } else {
      setAccordionOpen(number);
    }
  };

  return (
    <Container>
      <Box sx={{ py: "10px", px: "20px" }}></Box>
      {investments.map((investment, index) => (
        <Investment
          key={index}
          investment={investment}
          number={index + 1}
          isOpen={accordionOpen === index}
          onChange={(event, expanded) =>
            handleAccordionOpenClose(event, expanded, index)
          }
        />
      ))}
    </Container>
  );
};
