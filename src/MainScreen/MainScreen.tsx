import { Container, Row } from "react-bootstrap";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Steps } from "./Steps";
import { ReportModal } from "../ReportModal/ReportModal";
import axios from "axios";
import { toast } from "react-toastify";
import _upperFirst from "lodash/upperFirst";

export const MainScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [city, setCity] = useState("");

  const checkRoof = async () => {
    if (city.length > 0) {
      const key = process.env.REACT_APP_WEATHER_API_KEY;
      const apiLink = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`;
      try {
        const response = await axios.get(apiLink);
        const cityExists = response.status === 200;
        if (cityExists) {
          await setCity(_upperFirst(city));
          setIsModalOpen(true);
        } else {
          toast.warning("Please enter valid city");
        }
      } catch (e) {
        toast.warning("Please enter valid city");
      }
    }
  };

  return (
    <Container>
      <Row>
        <Typography
          variant={"h3"}
          sx={{
            textAlign: "center",
            paddingTop: "70px",
            paddingBottom: "60px",
          }}
        >
          Invest in Solar. Save money.
        </Typography>
      </Row>
      <Row>
        <Box sx={{ textAlign: "center" }}>
          <TextField
            label={"Enter your city"}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            sx={{ display: "flex", ml: "auto", mr: "auto", width: "400px" }}
          ></TextField>
          <Button
            onClick={checkRoof}
            variant="contained"
            sx={{ width: "150px", mt: "20px", mb: "20px" }}
          >
            CHECK MY ROOF
          </Button>
        </Box>
      </Row>
      <Row>
        <Typography
          variant={"h5"}
          sx={{ textAlign: "center", fontSize: "20px", mb: "70px" }}
        >
          Search your roof now. Discover your saving potential.
        </Typography>
      </Row>
      <Steps />
      {city.length > 0 && (
        <ReportModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          city={city}
        />
      )}
    </Container>
  );
};
