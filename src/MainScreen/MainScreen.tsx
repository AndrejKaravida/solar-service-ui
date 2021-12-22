import { useEffect } from "react";
import { getForecastPrivate } from "../services/forecast";
import { MapChart } from "../MapChart/MapChart";
import styles from "./MainScreen.module.css";
import { IMarker } from "../Models/IMarker";
import { Row, Col, Container } from "react-bootstrap";
import { Load } from "../Load/Load";
import { History } from "../History/History";

export const cities: IMarker[] = [
  { markerOffset: 0, name: "Belgrade", coordinates: [44.787197, 20.457273] },
  { markerOffset: 0, name: "Novi Sad", coordinates: [45.267136, 19.833549] },
  { markerOffset: 0, name: "London", coordinates: [51.509865, -0.118092] },
  { markerOffset: 0, name: "Paris", coordinates: [48.864716, 2.349014] },
  { markerOffset: 0, name: "Berlin", coordinates: [52.520008, 13.404954] },
];

export const MainScreen = () => {
  useEffect(() => {
    async function getProtectedData() {
      const response = await getForecastPrivate();
      console.log(response);
    }

    // getProtectedData();
  }, []);
  return (
    <Container>
      <Row className={styles.mapWrapper}>
        <MapChart markers={cities} />
      </Row>
      <Row className="pt-3">
        <Col xs={4} className={"text-center"}>
          <h4 className="mb-3">Available solar panels:</h4>
          {cities.map((marker, index) => {
            return (
              <p key={index}>
                {marker.name} - [{marker.coordinates[0]},{" "}
                {marker.coordinates[1]}]
              </p>
            );
          })}
        </Col>
        <Col xs={4}>
          <Load city="London" />
        </Col>
        <Col xs={4}>
          <History />
        </Col>
      </Row>
    </Container>
  );
};
