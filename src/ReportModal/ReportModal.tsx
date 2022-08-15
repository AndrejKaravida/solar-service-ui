import { Box, Button } from "@mui/material";
import { Col, Modal, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ElectricBill } from "./ElectricBill";
import { RoofSize } from "./RoofSize";
import { toast } from "react-toastify";
import { makeNewInvestment } from "../services/investment.service";
import { IInvestment } from "../Models/IInvestment";
import { SolarPanelType } from "./SolarPanelType";
import { ISolarPanel } from "../Models/ISolarPanel";
import { TotalCalculation } from "./TotalCalculation";
import { getAllPanels } from "../services/solarpanels.service";
import { EnvironmentalImpact } from "./EnvironmentalImpact";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  city: string;
}

export const ReportModal = (props: IProps) => {
  const [electricBill, setElectricBill] = useState("50");
  const [roofSize, setRoofSize] = useState("20");
  const [allSolarPanels, setAllSolarPanels] = useState<ISolarPanel[]>([]);
  const [solarPanelType, setSolarPanelType] = useState<ISolarPanel | null>(
    null
  );

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
    const investmentPower = getInvestmentPower();
    const newInvestment: IInvestment = {
      monthlyBillPrice: +electricBill,
      roofSize: +roofSize,
      environmentalImpact: {
        carbonDioxide: (investmentPower * 0.8).toString(),
        passengerCars: (investmentPower * 0.2).toString(),
        treeSeedlings: (investmentPower * 20.3).toString(),
      },
      date: new Date(),
      solarPanel: solarPanelType,
      city: props.city,
    };

    await makeNewInvestment(newInvestment);

    props.onClose();
    toast.success(
      "Congratulations! You can view your investment under My Investments."
    );
  };

  const getInvestmentPower = (): number => {
    if (!solarPanelType) {
      return 0;
    }

    return (solarPanelType.power * +roofSize) / 1000;
  };

  return (
    <Modal show={props.isOpen} onHide={props.onClose} size={"xl"}>
      <Modal.Header closeButton>
        <Modal.Title style={{ marginLeft: "auto" }}>
          Saving estimations for {props.city}
        </Modal.Title>
      </Modal.Header>
      <Box sx={{ p: "30px" }}>
        <Row>
          <Col>
            <ElectricBill
              electricBill={electricBill}
              setElectricBill={setElectricBill}
            />
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
        <Row>
          <Col xs={7}>
            <EnvironmentalImpact investmentPower={getInvestmentPower()} />
          </Col>
          <Col xs={5}>
            <TotalCalculation
              electricBill={electricBill}
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
              onClick={props.onClose}
            >
              Close
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
    </Modal>
  );
};
