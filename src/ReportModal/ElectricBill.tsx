import { Box, Card, Divider, TextField, Typography } from "@mui/material";

interface IProps {
  electricBill: string;
  setElectricBill: (bill: string) => void;
}

export const ElectricBill = (props: IProps) => {
  return (
    <Card style={{ padding: "15px" }}>
      <Typography sx={{ textAlign: "center" }}>
        AVERAGE MONTHLY ELECTRIC BILL
      </Typography>
      <Divider />
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <TextField
          sx={{ my: "15px" }}
          label={"Price"}
          value={props.electricBill}
          onChange={(e) => props.setElectricBill(e.target.value)}
        ></TextField>
        <Typography sx={{ fontSize: "24px", marginLeft: "15px" }}>$</Typography>
      </Box>
      <Typography sx={{ textAlign: "center" }}>
        We use your bill to make more precise estimations for your savings.
      </Typography>
    </Card>
  );
};
