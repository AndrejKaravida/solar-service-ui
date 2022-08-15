import Card from "@mui/material/Card";
import styles from "./AddNewSolarPanel.module.css";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import { ISolarPanel } from "../Models/ISolarPanel";
import { addNewPanel } from "../services/solarpanels.service";

export const AddNewSolarPanel = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [power, setPower] = useState("");

  const onAddPanelHandler = async () => {
    if (!name || !price || !power) {
      return;
    }
    const newSolarPanel: ISolarPanel = {
      name,
      price: +price,
      power: +power,
    };
    await addNewPanel(newSolarPanel);
    toast.success("Solar panel added successfully");
    setName("");
    setPrice("");
    setPower("");
  };

  return (
    <div style={{ paddingTop: "200px" }}>
      <Card variant={"outlined"} className={styles.wrapper}>
        <h2 className={styles.headline}>Add new Solar Panel</h2>
        <div className={styles.inputElement}>
          <Input
            type="text"
            placeholder={"Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputElement}>
          <Input
            type="text"
            placeholder={"Price"}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          $
        </div>
        <div className={styles.inputElement}>
          <Input
            type="text"
            placeholder={"Power"}
            value={power}
            onChange={(e) => setPower(e.target.value)}
          />{" "}
          W
        </div>
        <Button
          variant={"contained"}
          className={styles.addButton}
          onClick={onAddPanelHandler}
        >
          Add Panel
        </Button>
      </Card>
    </div>
  );
};
