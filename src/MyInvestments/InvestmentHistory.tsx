import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import {
  DateRangePicker,
  defaultInputRanges,
  defaultStaticRanges,
  RangeKeyDict,
} from "react-date-range";
import { Button, Card, Divider, Typography } from "@mui/material";
import { HistoryChart } from "./HistoryChart";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { getProductionHistory } from "../services/history.service";
import { IHistory } from "../Models/IHistory"; // theme css file

interface IProps {
  investmentId: string;
  minDate: Date;
}

export const InvestmentHistory = ({ investmentId, minDate }: IProps) => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [history, setHistory] = useState<IHistory[]>([]);

  const getHistory = async () => {
    try {
      const response = await getProductionHistory(
        investmentId,
        value.startDate,
        value.endDate
      );
      setHistory(response.data);
      console.log(response.data);
      setIsHistoryModalOpen(true);
    } catch (e) {
      console.log(e);
    }
  };

  const isHistoryBtnDisabled = () => {
    return value.startDate === new Date() && value.endDate === new Date();
  };

  const getPreviousDay = () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);

    return previous;
  };

  const handleDateChange = (ranges: RangeKeyDict) => {
    const { startDate, endDate, key } = ranges.selection;
    if (!startDate || !endDate || !key) {
      return;
    }
    setValue({
      startDate,
      endDate,
      key,
    });
  };

  const inputRanges = defaultInputRanges[0];
  const staticRanges = [
    defaultStaticRanges[1],
    defaultStaticRanges[2],
    defaultStaticRanges[3],
    defaultStaticRanges[4],
    defaultStaticRanges[5],
  ];

  return (
    <Card sx={{ mb: "20px", p: "15px", height: "100%" }}>
      <Typography sx={{ textAlign: "center" }}>PRODUCTION HISTORY:</Typography>
      <Divider />

      <Box sx={{ mt: "30px", textAlign: "center" }}>
        <DateRangePicker
          ranges={[value]}
          onChange={handleDateChange}
          minDate={minDate}
          maxDate={getPreviousDay()}
          inputRanges={[inputRanges]}
          staticRanges={staticRanges}
        />
      </Box>

      <Button
        disabled={isHistoryBtnDisabled()}
        sx={{ display: "block", ml: "auto", mr: "auto", mt: "30px" }}
        variant="contained"
        onClick={getHistory}
      >
        See History
      </Button>

      {isHistoryModalOpen && (
        <HistoryChart
          showModal={isHistoryModalOpen}
          onHide={() => setIsHistoryModalOpen(false)}
          history={history}
        />
      )}
    </Card>
  );
};
