import { useEffect, useState } from "react";
import { ISolarPanel } from "../Models/ISolarPanel";
import { getAllPanels } from "../services/solarpanels.service";
import { getElectricBillFromKwhUsage } from "../utils/usageUtils";
import { IInvestment } from "../Models/IInvestment";
import { makeNewInvestment } from "../services/investment.service";
import { toast } from "react-toastify";
import { Col, Container, Row } from "react-bootstrap";
import { Box, Button, Typography } from "@mui/material";
import { KwHUsage } from "./KwHUsage";
import { RoofSize } from "./RoofSize";
import { SolarPanelType } from "./SolarPanelType";
import { InvestmentEnvironmentalImpact } from "../MyInvestments/InvestmentEnvironmentalImpact";
import { TotalCalculation } from "./TotalCalculation";
import { useNavigate, useParams } from "react-router-dom";
import { verifyCity } from "../utils/verifyCity";

export const InvestmentCalculation = () => {
  const [kWhUsage, setKWhUsage] = useState("200");
  const [roofSize, setRoofSize] = useState("20");
  const [allSolarPanels, setAllSolarPanels] = useState<ISolarPanel[]>([]);
  const [solarPanelType, setSolarPanelType] = useState<ISolarPanel | null>(
    null
  );

  const navigate = useNavigate();
  const { city } = useParams();

  useEffect(() => {
    const cityVerifier = async () => {
      if (city) {
        const verifiedCity = verifyCity(city);
        if (!verifiedCity) {
          navigate("/mainScreen");
        }
      } else {
        navigate("/mainScreen");
      }
    };

    cityVerifier().then(() => {});
  }, [city, navigate]);

  useEffect(() => {
    const getSolarPanelTypes = async () => {
      const result = await getAllPanels();
      if (result.data) {
        setAllSolarPanels(result.data);
        if (result.data.length > 0) {
          setSolarPanelType(result.data[0]);
        }
      }
    };
    getSolarPanelTypes().then(() => {});
  }, []);

  const makeInvestment = async () => {
    if (!solarPanelType) {
      return;
    }
    const electricBill = getElectricBillFromKwhUsage(+kWhUsage);
    const investmentPower = getInvestmentPower();
    const newInvestment: IInvestment = {
      monthlyBillPrice: electricBill,
      roofSize: +roofSize,
      environmentalImpact: {
        carbonDioxide: (investmentPower * 0.8).toString(),
        passengerCars: (investmentPower * 0.2).toString(),
        treeSeedlings: (investmentPower * 20.3).toString(),
      },
      date: new Date(),
      solarPanel: solarPanelType,
      city: city ?? "",
    };

    await makeNewInvestment(newInvestment);

    toast.success(
      "Congratulations! You can view your investment under My Investments."
    );
    navigate("myInvestment");
  };

  const getInvestmentPower = (): number => {
    if (!solarPanelType) {
      return 0;
    }

    return (solarPanelType.power * +roofSize) / 1000;
  };

  return (
    <Container>
      <Typography>Saving estimations for {city} </Typography>
      <Box sx={{ p: "30px" }}>
        <Row>
          <Col>
            <KwHUsage kwhUsage={kWhUsage} setKwhUsage={setKWhUsage} />
          </Col>
          <Col>
            <RoofSize roofSize={roofSize} setRoofSize={setRoofSize} />
          </Col>
          <Col>
            <SolarPanelType
              allSolarPanels={allSolarPanels}
              solarPanelType={solarPanelType}
              setSolarPanelType={setSolarPanelType}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "25px" }}>
          <Col xs={4}>
            <InvestmentEnvironmentalImpact
              investmentPower={getInvestmentPower()}
            />
          </Col>
          <Col xs={8}>
            <TotalCalculation
              kWhUsage={kWhUsage}
              solarPanelPower={solarPanelType?.power ?? 0}
              solarPanelPrice={solarPanelType?.price ?? 0}
              roofSize={roofSize}
            />
          </Col>
        </Row>

        <Row style={{ marginBottom: "30px", marginTop: "30px" }}>
          <Col style={{ textAlign: "center" }}>
            <Button
              variant={"outlined"}
              sx={{ width: "200px", height: "40px" }}
              onClick={() => navigate("Main Screen")}
            >
              Back to Main Screen
            </Button>
          </Col>
          <Col style={{ textAlign: "center" }}>
            <Button
              onClick={makeInvestment}
              sx={{ width: "200px", height: "40px" }}
              variant={"contained"}
            >
              Make investment
            </Button>
          </Col>
        </Row>
      </Box>
    </Container>
  );
};
