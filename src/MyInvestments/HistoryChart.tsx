import Chart from "react-apexcharts";
import { Modal } from "react-bootstrap";
import { Button, Card } from "@mui/material";
import { IHistory } from "../Models/IHistory";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";

interface IProps {
  history: IHistory[];
  showModal: boolean;
  onHide: () => void;
}

export const HistoryChart = (props: IProps) => {
  const [series, setSeries] = useState<ApexAxisChartSeries>([]);
  const [sortedHistory, setSortedHistory] = useState<IHistory[]>([]);

  useEffect(() => {
    const sortedHistory = props.history
      .map((x) => ({ ...x, date: new Date(x.date) }))
      .sort((a, b) => Number(a.date) - Number(b.date));
    setSortedHistory(sortedHistory);
    setSeries([
      {
        name: "Minimum",
        data: sortedHistory.map((x) => +x.min.toFixed(2)),
      },
      {
        name: "Maximum",
        data: sortedHistory.map((x) => +x.max.toFixed(2)),
      },
      {
        name: "Average",
        data: sortedHistory.map((x) => +x.average.toFixed(2)),
      },
    ]);
  }, [props.history]);

  const getTitle = () => {
    const firstDate = sortedHistory[0]?.date;
    const secondDate = sortedHistory[sortedHistory.length - 1]?.date;

    if (!firstDate || !secondDate) {
      return "";
    }

    return (
      "Production history: " +
      firstDate.toLocaleDateString() +
      " - " +
      secondDate.toLocaleDateString()
    );
  };

  const options: ApexOptions = {
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#008FFB", "#00E396", "#CED4DC"],
    title: {
      text: getTitle(),
      align: "left",
    },
    yaxis: {
      title: {
        text: "kW / h",
      },
    },
  };

  return (
    <Modal show={props.showModal} onHide={props.onHide}>
      <Card sx={{ p: "20px" }}>
        <Chart options={options} series={series} type={"area"} height={350} />
        <Button
          sx={{ display: "flex", ml: "auto", mr: "auto" }}
          variant={"contained"}
          onClick={props.onHide}
        >
          Close
        </Button>
      </Card>
    </Modal>
  );
};
