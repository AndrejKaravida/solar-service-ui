import CarbonDioxideImg from "../images/carbon-dioxide.png";
import PassengerCarImg from "../images/passenger-car.png";
import TreeSeedlingImg from "../images/tree-seedling.png";
import { IEnvironmentalImpact } from "../Models/IEnvironmentalImpact";

export const environmentalImpacts = [
  {
    headlight: "Carbon dioxide",
    image: CarbonDioxideImg,
    description: "metric tons",
  },
  {
    headlight: "Passenger cars",
    image: PassengerCarImg,
    description: "taken off the road for 1 yr",
  },
  {
    headlight: "Tree seedlings",
    image: TreeSeedlingImg,
    description: "grown for 10 yrs",
  },
];

export const getMetric = (impactName: string, investmentPower: number) => {
  switch (impactName) {
    case "Carbon dioxide": {
      return investmentPower * 0.8;
    }
    case "Passenger cars": {
      return investmentPower * 0.2;
    }
    case "Tree seedlings": {
      return investmentPower * 20.3;
    }
  }
};

export const getMetricByEnv = (
  impactName: string,
  environmentalImpact: IEnvironmentalImpact
) => {
  switch (impactName) {
    case "Carbon dioxide": {
      return environmentalImpact.carbonDioxide;
    }
    case "Passenger cars": {
      return environmentalImpact.passengerCars;
    }
    case "Tree seedlings": {
      return environmentalImpact.treeSeedlings;
    }
  }
};
