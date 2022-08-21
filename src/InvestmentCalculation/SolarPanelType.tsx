import {
  Box,
  Card,
  Divider,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { ISolarPanel } from "../Models/ISolarPanel";

interface IProps {
  allSolarPanels: ISolarPanel[];
  selectedSolarPanel: string;
  setSelectedSolarPanel: (solarPanel: string) => void;
}

export const SolarPanelType = (props: IProps) => {
  const getMenuItems = () => {
    return props.allSolarPanels.map((solarPanelType, index) => (
      <MenuItem key={index} value={solarPanelType.name}>
        {solarPanelType.name}
      </MenuItem>
    ));
  };

  const getSolarPanelPowerAndPrice = (): { power: number; price: number } => {
    const selectedPanel = props.allSolarPanels.find(
      (panel) => panel.name === props.selectedSolarPanel
    );

    if (!selectedPanel) {
      return {
        power: 0,
        price: 0,
      };
    }

    return {
      power: selectedPanel.power,
      price: selectedPanel.price,
    };
  };

  return (
    <Card
      style={{
        padding: "15px",
        height: "100%",
      }}
    >
      <Typography sx={{ textAlign: "center" }}>SOLAR PANELS</Typography>
      <Divider />
      <Box
        sx={{
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <Typography>Type:</Typography>
        <Select
          value={props.selectedSolarPanel}
          sx={{ width: "100%", mt: "10px", borderTop: "1px solid grey" }}
          onChange={(e) =>
            props.setSelectedSolarPanel(e.target.value as string)
          }
        >
          {getMenuItems()}
        </Select>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: "20px",
        }}
      >
        <Typography sx={{ mr: "10px" }}>
          {" "}
          Power: <b>{getSolarPanelPowerAndPrice().power}W</b>{" "}
        </Typography>
        <Typography>
          {" "}
          Price: <b>{getSolarPanelPowerAndPrice().price}$</b>{" "}
        </Typography>
      </Box>
      <Typography sx={{ textAlign: "center", marginTop: "10px" }}>
        Choose the specific solar panel type regarding of power and price.
      </Typography>
    </Card>
  );
};
