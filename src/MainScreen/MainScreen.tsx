import { MapChart } from "../MapChart/MapChart";
import styles from "./MainScreen.module.css";
import { IMarker } from "../Models/IMarker";
import { Row, Col, Container } from "react-bootstrap";
import { Load } from "../Load/Load";
import { History } from "../History/History";
import {
  fetchCurrentProduction,
  fetchProductionHistory,
} from "../services/production";
import { Header } from "../Header/Header";
import { useState } from "react";
import { IMeasurementHistory } from "../Models/IMeasurementHistory";

const cities: IMarker[] = [
  { markerOffset: 45, name: "Novi Sad", coordinates: [19.833549, 46.267136] },
  { markerOffset: 45, name: "London", coordinates: [-3.018092, 53.509865] },
  { markerOffset: 45, name: "Paris", coordinates: [2.394014, 48.864716] },
  { markerOffset: 45, name: "Berlin", coordinates: [13.404954, 52.520008] },
  { markerOffset: 45, name: "Milano", coordinates: [9.18854, 45.464664] },
];

export const MainScreen = () => {
  const [chosenCity, setChosenCity] = useState("");
  const [currentProduction, setCurrentProduction] = useState(0);
  const [productionHistory, setProductionHistory] = useState<
    IMeasurementHistory[]
  >([]);

  const getCurrentProduction = async (city: string) => {
    setChosenCity(city);
    const response = await fetchCurrentProduction(city);
    setCurrentProduction(response.data.production);
  };

  const getProductionHistory = async (city: string) => {
    const response = await fetchProductionHistory(city);
    setProductionHistory(response.data);
  };

  const onChooseCity = async (city: string) => {
    getCurrentProduction(city);
    getProductionHistory(city);
  };

  return (
    <>
      <Header />
      <Container>
        <Row className={styles.mapWrapper}>
          <MapChart onChooseCity={onChooseCity} markers={cities} />
        </Row>
        <Row className="pt-3">
          <Col xs={4}>
            <Load city={chosenCity} currentProduction={currentProduction} />
          </Col>
          <Col xs={8}>
            <History productionHistory={productionHistory} />
          </Col>
        </Row>
      </Container>
    </>
  );
};
