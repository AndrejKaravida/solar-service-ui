import React from "react";
import "./index.css";
import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
// @ts-ignore
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <>
    {" "}
    <App /> <ToastContainer />
  </>
);
