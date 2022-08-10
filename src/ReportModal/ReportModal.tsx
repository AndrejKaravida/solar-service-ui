import { Box, Button, Typography } from "@mui/material";
import { Col, Modal, Row } from "react-bootstrap";
import { EnvironmentalImpact } from "./EnvironmentalImpact";
import { useState } from "react";
import { ElectricBill } from "./ElectricBill";
import { RoofSize } from "./RoofSize";
import { toast } from "react-toastify";
import { environmentalImpact1, investments } from "./hardCodedData";
import { makeNewInvestment } from "../services/investment.service";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal = (props: IProps) => {
  const [electricBill, setElectricBill] = useState("50");
  const [roofSize, setRoofSize] = useState("20");

  const solarPanelPrice = 160;

  const makeInvestment = async () => {
    await makeNewInvestment(investments[0]);

    props.onClose();
    toast.success(
      "Congratulations! You can view your investment under My Investments."
    );
  };

  return (
    <Modal show={props.isOpen} onHide={props.onClose} size={"lg"}>
      <Modal.Header closeButton>
        <Modal.Title style={{ marginLeft: "auto" }}>
          Saving estimations for Novi Sad
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
        </Row>
        <Row>
          <Typography
            sx={{
              fontSize: "18px",
              textAlign: "center",
              fontWeight: "500",
              mt: "20px",
            }}
          >
            Total Investment Price: {+roofSize * solarPanelPrice}$
          </Typography>
        </Row>
        <Row>
          <Typography
            sx={{
              fontSize: "24px",
              textAlign: "center",
              fontWeight: "600",
              mt: "20px",
            }}
          >
            {20 * 12 * +electricBill - +roofSize * solarPanelPrice}$ savings
          </Typography>
          <Typography
            sx={{ fontSize: "14px", textAlign: "center", marginBottom: "30px" }}
          >
            Estimated net savings for your roof over 20 years
          </Typography>
        </Row>
        <EnvironmentalImpact environmentalImpact={environmentalImpact1} />
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
