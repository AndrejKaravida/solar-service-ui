import { Col, Row } from "react-bootstrap";
import StepOne from "../images/step-1.png";
import { Card, Typography } from "@mui/material";
import StepTwo from "../images/step-2.png";
import StepThree from "../images/step-3.png";

export const Steps = () => {
  const steps = [
    {
      image: StepOne,
      headline: "Search for your home.",
      description:
        "Use the search bar to find your home. We will do the rest to create " +
        "a personalized solar plan.",
    },
    {
      image: StepTwo,
      headline: "Personalize your solar analysis.",
      description:
        "Adjust your electric bill to fine-tune your savings estimate and the\n" +
        " recommended number of solar panels for your home.",
    },
    {
      image: StepThree,
      headline: "See your options.",
      description:
        "Get complete report about your potential investment and savings.",
    },
  ];

  return (
    <Row style={{ textAlign: "center" }}>
      {steps.map((step, index) => (
        <Col key={index}>
          <Card
            sx={{ backgroundColor: "white", padding: "10px", height: "265px" }}
          >
            <img
              src={step.image}
              alt={"step " + index}
              style={{ height: "100px" }}
            />
            <Typography sx={{ my: "20px" }} variant={"h5"}>
              {index + 1}. {step.headline}
            </Typography>
            <Typography>{step.description}</Typography>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
