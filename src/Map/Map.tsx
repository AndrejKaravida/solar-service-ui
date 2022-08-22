import { Col, Row } from "react-bootstrap";
import { LeafletMap } from "./LeafletMap";
import { useEffect, useState } from "react";
import { IInvestment } from "../Models/IInvestment";
import { getAllInvestments } from "../services/investment.service";
import { Box, Card, Typography } from "@mui/material";
import { InvestmentCard } from "./InvestmentCard";

export const Map = () => {
  const [investments, setInvestments] = useState<IInvestment[]>([]);
  const [investmentSelected, setInvestmentSelected] = useState<string | null>(
    null
  );

  useEffect(() => {
    const getInvestments = async () => {
      const result = await getAllInvestments();
      if (result?.data) {
        setInvestments(result.data);
      }
    };
    getInvestments().then(() => {});
  }, []);

  return (
    <>
      <Row style={{ padding: "25px" }}>
        <Col xs={8}>
          <Card sx={{ padding: "15px" }}>
            <LeafletMap
              investments={investments}
              investmentSelected={investmentSelected}
            />
          </Card>
        </Col>
        <Col xs={4}>
          <Card
            sx={{
              padding: "15px",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "400",
                mb: "20px",
              }}
            >
              Investments:
            </Typography>
            <Box
              sx={{
                height: "calc(100vh - 195px)",
                padding: "10px",
                overflowY: "scroll",
              }}
            >
              {investments.map((investment, index) => (
                <InvestmentCard
                  key={index}
                  investment={investment}
                  onInvestmentSelected={setInvestmentSelected}
                />
              ))}
            </Box>
          </Card>
        </Col>
      </Row>
    </>
  );
};
