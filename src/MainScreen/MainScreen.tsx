import { useEffect } from "react";
import { getForecastPrivate } from "../services/forecast";
import { MapChart } from "../MapChart/MapChart";
import styles from "./MainScreen.module.css";
import { IMarker } from "../Models/IMarker";
import { Row, Col, Container } from "react-bootstrap";
import { Forecast } from "../Forecast/Forecast";

export const MainScreen = () => {
  const markers: IMarker[] = [
    { markerOffset: 15, name: "La Paz", coordinates: [-68.1193, -16.4897] },
    { markerOffset: 15, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
    { markerOffset: 15, name: "Santiago", coordinates: [-70.6693, -33.4489] },
  ];

  useEffect(() => {
    async function getProtectedData() {
      const response = await getForecastPrivate();
      console.log(response);
    }

    // getProtectedData();
  }, []);
  return (
    <Container>
      <div className={styles.mapWrapper}>
        <MapChart markers={markers} />
      </div>
      <Row>
        <Col className={"text-center"}>
          <p>Available solar panels:</p>
          {markers.map((marker, index) => {
            return (
              <p key={index}>
                {marker.name} - [{marker.coordinates[0]},{" "}
                {marker.coordinates[1]}]
              </p>
            );
          })}
        </Col>
        <Col>
          <Forecast />
        </Col>
      </Row>
    </Container>
  );
};
