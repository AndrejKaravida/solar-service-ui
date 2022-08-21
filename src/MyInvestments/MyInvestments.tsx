import { Container } from "react-bootstrap";
import { Investment } from "./Investment";
import { Box, Button, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { IInvestment } from "../Models/IInvestment";
import { getAllUserInvestments } from "../services/investment.service";
import { useNavigate } from "react-router-dom";

export const MyInvestments = () => {
  const [accordionOpen, setAccordionOpen] = useState(0);
  const [userInvestments, setUserInvestments] = useState<IInvestment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInvestments = async () => {
      const result = await getAllUserInvestments();
      if (result?.data) {
        setUserInvestments(result.data);
      }
    };
    getUserInvestments().then(() => {});
  }, []);

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
      {userInvestments.length === 0 && (
        <>
          <Typography sx={{ fontSize: "18px", textAlign: "center" }}>
            You don't have any investments. Go to Main Screen and make on!
          </Typography>
          <Button
            sx={{ mx: "auto", display: "flex", mt: "15px" }}
            variant={"contained"}
            onClick={() => navigate("/mainScreen")}
          >
            Back to Main Screen
          </Button>
        </>
      )}

      {userInvestments.map((investment, index) => (
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
