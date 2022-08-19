import { Box, Card, Divider, TextField, Typography } from "@mui/material";

interface IProps {
  kwhUsage: string;
  setKwhUsage: (bill: string) => void;
}

export const KwHUsage = (props: IProps) => {
  return (
    <Card style={{ padding: "15px", height: "100%" }}>
      <Typography sx={{ textAlign: "center" }}>
        AVERAGE MONTHLY USAGE
      </Typography>
      <Divider />
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <TextField
          sx={{ my: "15px" }}
          label={"kWh"}
          value={props.kwhUsage}
          onChange={(e) => props.setKwhUsage(e.target.value)}
        ></TextField>
        <Typography sx={{ fontSize: "24px", marginLeft: "15px" }}>
          kWh
        </Typography>
      </Box>
      <Typography sx={{ textAlign: "center" }}>
        We use your kwH usage to make more precise saving estimations.
      </Typography>
    </Card>
  );
};
