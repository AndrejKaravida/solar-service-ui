import { Box, Card, Divider, TextField, Typography } from "@mui/material";

interface IProps {
  roofSize: string;
  setRoofSize: (size: string) => void;
}

export const RoofSize = (props: IProps) => {
  return (
    <Card style={{ padding: "15px" }}>
      <Typography sx={{ textAlign: "center" }}>ROOF SIZE</Typography>
      <Divider />
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <TextField
          sx={{ my: "15px" }}
          label={"Size"}
          value={props.roofSize}
          onChange={(e) => props.setRoofSize(e.target.value)}
        ></TextField>
        <Typography sx={{ fontSize: "24px", marginLeft: "15px" }}>
          m<span>&#178;</span>
        </Typography>
      </Box>
      <Typography sx={{ textAlign: "center" }}>
        We use your roof size to make appropriate installation size.
      </Typography>
    </Card>
  );
};
