import { useEffect, useState } from "react";
import { ISolarPanel } from "../Models/ISolarPanel";
import { getAllPanels } from "../services/solarpanels.service";
import {
  calculateElectricalUsageFor10Years,
  calculateInstallationPrice,
  calculateInvestmentPowerInKw,
  calculateNumberOfPanelsNeeded,
  getElectricBillFromKwhUsage,
} from "../utils/usageUtils";
import { IInvestment } from "../Models/IInvestment";
import { makeNewInvestment } from "../services/investment.service";
import { toast } from "react-toastify";
import { Col, Container, Row } from "react-bootstrap";
import { Box, Button, Typography } from "@mui/material";
import { KwHUsage } from "./KwHUsage";
import { Installation } from "./Installation";
import { SolarPanelType } from "./SolarPanelType";
import { InvestmentEnvironmentalImpact } from "../MyInvestments/InvestmentEnvironmentalImpact";
import { TotalCalculation } from "./TotalCalculation";
import { useNavigate, useParams } from "react-router-dom";
import { verifyCity } from "../utils/verifyCity";
import { useAuth } from "../Authentication/useAuth";
import { ICity } from "../Models/ICity";
import { FinalCalculation } from "./FinalCalculation";
import { getMetric } from "../utils/impactUtils";

export const InvestmentCalculation = () => {
  const [city, setCity] = useState<ICity | null>(null);
  const [kWhUsage, setKWhUsage] = useState(200);
  const [numberOfPanels, setNumberOfPanels] = useState(7);
  const [hoursOfSunlight, setHoursOfSunlight] = useState(5);
  const [allSolarPanels, setAllSolarPanels] = useState<ISolarPanel[]>([]);
  const [selectedSolarPanel, setSelectedSolarPanel] = useState<string>("");

  const { user } = useAuth();

  const navigate = useNavigate();
  const params = useParams();

  const cityName = params.city;

  useEffect(() => {
    const cityVerifier = async () => {
      if (cityName) {
        const verifiedCity = await verifyCity(cityName);
        if (!verifiedCity) {
          navigate("/mainScreen");
        }
        setCity(verifiedCity);
      } else {
        navigate("/mainScreen");
      }
    };

    cityVerifier().then(() => {});
  }, [cityName, navigate]);

  useEffect(() => {
    const getSolarPanelTypes = async () => {
      try {
        const result = await getAllPanels();
        if (result.data) {
          setAllSolarPanels(result.data);
          if (result.data.length > 0) {
            setSelectedSolarPanel(result.data[0].name);
          }
        }
      } catch (e) {}
    };
    getSolarPanelTypes().then(() => {});
  }, []);

  useEffect(() => {
    recalculateNumberOfPanels();
  }, [kWhUsage, hoursOfSunlight, selectedSolarPanel]);

  const getSelectedSolarPanel = () => {
    return allSolarPanels.find((panel) => panel.name === selectedSolarPanel);
  };

  const makeInvestment = async () => {
    const solarPanel = getSelectedSolarPanel();
    if (!solarPanel || !city || !user) {
      return;
    }
    const electricBill = getElectricBillFromKwhUsage(+kWhUsage);
    const investmentPower = getInvestmentPower();
    const savings =
      +calculateElectricalUsageFor10Years(electricBill) -
      +calculateInstallationPrice(numberOfPanels, solarPanel.price);
    const cost = +calculateInstallationPrice(numberOfPanels, solarPanel.price);
    const newInvestment: IInvestment = {
      monthlyBillPrice: electricBill,
      environmentalImpact: {
        carbonDioxide: getMetric("Carbon dioxide", investmentPower).toString(),
        passengerCars: getMetric("Passenger cars", investmentPower).toString(),
        treeSeedlings: getMetric("Tree seedlings", investmentPower).toString(),
      },
      date: new Date(),
      moneySaved: savings,
      power: investmentPower,
      user: user,
      cost: cost,
      solarPanel: solarPanel,
      numberOfPanels: numberOfPanels,
      city: city,
    };

    await makeNewInvestment(newInvestment);

    toast.success(
      "Congratulations! You can view your investment under My Investments."
    );
    navigate("/myInvestments");
  };

  const getInvestmentPower = (): number => {
    const solarPanel = getSelectedSolarPanel();
    if (!solarPanel) {
      return 0;
    }

    return calculateInvestmentPowerInKw(numberOfPanels, solarPanel.power);
  };

  const recalculateNumberOfPanels = () => {
    const solarPanel = getSelectedSolarPanel();

    if (!solarPanel) {
      return;
    }

    const numberOfPanels = calculateNumberOfPanelsNeeded(
      solarPanel.power,
      kWhUsage,
      hoursOfSunlight
    );

    setNumberOfPanels(numberOfPanels);
  };

  return (
    <Container>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "500",
          pt: "20px",
        }}
      >
        Saving estimations for {cityName}{" "}
      </Typography>
      <Box sx={{ p: "30px" }}>
        <Row>
          <Col>
            <KwHUsage kwhUsage={kWhUsage} setKwhUsage={setKWhUsage} />
          </Col>
          <Col>
            <SolarPanelType
              allSolarPanels={allSolarPanels}
              selectedSolarPanel={selectedSolarPanel}
              setSelectedSolarPanel={setSelectedSolarPanel}
            />
          </Col>
          <Col>
            <Installation
              numberOfPanels={numberOfPanels}
              hoursOfSunlight={hoursOfSunlight}
              solarPanelPower={getSelectedSolarPanel()?.power ?? 0}
              setHoursOfSunlight={setHoursOfSunlight}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <FinalCalculation
              numberOfPanels={numberOfPanels}
              solarPanelPrice={getSelectedSolarPanel()?.price ?? 0}
              kWhUsage={kWhUsage}
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
              solarPanelPower={getSelectedSolarPanel()?.power ?? 0}
              solarPanelPrice={getSelectedSolarPanel()?.price ?? 0}
              hoursOfSunlight={hoursOfSunlight}
              numberOfPanels={numberOfPanels}
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
              disabled={!user}
              sx={{ width: "200px", height: "40px" }}
              variant={"contained"}
            >
              Make investment
            </Button>
            {!user && (
              <Typography sx={{ color: "red" }}>
                You need to be logged in to make an investment.
              </Typography>
            )}
          </Col>
        </Row>
      </Box>
    </Container>
  );
};
