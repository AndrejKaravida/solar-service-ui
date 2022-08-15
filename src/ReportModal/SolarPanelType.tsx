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
  solarPanelType: ISolarPanel | null;
  setSolarPanelType: (solarPanel: ISolarPanel) => void;
}

export const SolarPanelType = (props: IProps) => {
  const getMenuItems = () => {
    return props.allSolarPanels.map((solarPanelType, index) => (
      <MenuItem value={solarPanelType.name}>{solarPanelType.name}</MenuItem>
    ));
  };

  const handleChange = (solarPanelName: string) => {
    const chosenPanel = props.allSolarPanels.find(
      (solarPanel) => solarPanel.name === solarPanelName
    );
    if (chosenPanel) {
      props.setSolarPanelType(chosenPanel);
    }
  };

  return (
    <Card
      style={{
        padding: "15px",
      }}
    >
      <Typography sx={{ textAlign: "center" }}>
        CHOOSE SOLAR PANEL TYPE
      </Typography>
      <Divider />
      <Box
        sx={{
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <Typography>Solar Panel Type:</Typography>
        <Select
          value={props.solarPanelType?.name}
          sx={{ width: "100%", mt: "10px", borderTop: "1px solid grey" }}
          onChange={(e) => handleChange(e.target.value as string)}
        >
          {getMenuItems()}
        </Select>
      </Box>
      <Typography sx={{ textAlign: "center", marginTop: "10px" }}>
        Choose the specific solar panel type regarding of power and price.
      </Typography>
    </Card>
  );
};
