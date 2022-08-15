import { useEffect, useState } from "react";
import { IInvestment } from "../Models/IInvestment";
import { getAllInvestments } from "../services/investment.service";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

export const AdminInvestments = () => {
  const [investments, setInvestments] = useState<IInvestment[]>([]);

  useEffect(() => {
    const getInvestments = async () => {
      const result = await getAllInvestments();
      if (result?.data) {
        setInvestments(result.data);
        console.log(result.data);
      }
    };
    getInvestments().then(() => {});
  }, []);

  const columns: GridColDef[] = [
    { field: "number", headerName: "No.", width: 70, headerAlign: "center" },
    {
      field: "city",
      headerName: "Location City",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "date",
      headerName: "Date Created",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "solarPanelName",
      headerName: "Solar Panel Name",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "solarPanelPower",
      headerName: "Solar Panel Power",
      width: 140,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "cost",
      headerName: "Investment Cost",
      width: 140,
      headerAlign: "center",
      align: "center",
    },
  ];

  const rows = investments.map((investment, index) => ({
    id: index,
    number: index + 1,
    cost: investment.roofSize * investment.solarPanel.price + " $",
    installationPower:
      (investment.roofSize * investment.solarPanel.power) / 1000 + "kW",
    solarPanelName: investment.solarPanel.name,
    date: new Date(investment.date).toLocaleDateString(),
    city: investment.city,
  }));

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography
        sx={{
          mx: "20px",
          textAlign: "center",
          fontSize: "18px",
          fontWeight: 500,
        }}
      >
        All investments registered in the system:
      </Typography>
      <div
        style={{
          height: 400,
          width: "1000px",
          marginTop: "30px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </Box>
  );
};
