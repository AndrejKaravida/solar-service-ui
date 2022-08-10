import Chart from "react-apexcharts";
import { Card, Divider, Typography } from "@mui/material";

export const HistoryChart = () => {
  const series = [
    {
      name: "Minimum",
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: "Maximum",
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
    {
      name: "Average",
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
  ];

  const options = {
    chart: {
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },
    yaxis: {
      title: {
        text: "kWh",
      },
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <Card sx={{ mb: "20px", p: "15px", height: "100%" }}>
      <Typography sx={{ textAlign: "center" }}>PRODUCTION HISTORY:</Typography>
      <Divider />
      <Chart options={options} series={series} type="bar" height={350} />
    </Card>
  );
};
